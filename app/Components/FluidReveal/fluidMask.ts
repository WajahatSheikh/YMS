// ─────────────────────────────────────────────────────────────────────────────
// Fluid mask — a GPU Navier-Stokes solver used as an ALPHA CUT-OUT.
//
// The usual fluid demo draws the dye as colour. Here the canvas is painted in
// the page's own background colour and the dye is used as *transparency*:
//
//     alpha = 1 - smoothstep(edgeIn, edgeOut, dye)
//
// so wherever the cursor has been, the canvas turns transparent and whatever
// sits behind it (the orbiting tiles) shows through. That inversion is the
// whole effect — everything else is a standard solver:
//
//     advect → curl → vorticity → divergence → Jacobi pressure → subtract grad
//
// Framework-agnostic on purpose: no React in here, so it can be driven from a
// useEffect, a GSAP ticker, or nothing at all.
// ─────────────────────────────────────────────────────────────────────────────

export interface FluidMaskConfig {
    SIM_RESOLUTION: number;
    DYE_RESOLUTION: number;
    DENSITY_DISSIPATION: number;
    VELOCITY_DISSIPATION: number;
    PRESSURE: number;
    PRESSURE_ITERATIONS: number;
    CURL: number;
    SPLAT_RADIUS: number;
    SPLAT_FORCE: number;
    COVER: [number, number, number];
    EDGE_IN: number;
    EDGE_OUT: number;
}

export interface FluidMask {
    config: FluidMaskConfig;
    /** nx/ny in 0..1 with the origin at the BOTTOM-left; ndx/ndy are normalised deltas. */
    splatNormalized(nx: number, ny: number, ndx: number, ndy: number, strength?: number): void;
    /** Drive one frame yourself (e.g. from a GSAP/Lenis ticker) instead of the built-in loop. */
    tick(dt?: number): void;
    /** Stop the built-in loop, e.g. while the host is scrolled out of view. */
    pause(): void;
    resume(): void;
    destroy(): void;
}

interface FBO {
    texture: WebGLTexture;
    fbo: WebGLFramebuffer;
    width: number;
    height: number;
    texelSizeX: number;
    texelSizeY: number;
    attach(id: number): number;
}

interface DoubleFBO {
    width: number;
    height: number;
    texelSizeX: number;
    texelSizeY: number;
    read: FBO;
    write: FBO;
    swap(): void;
}

const DEFAULTS: FluidMaskConfig = {
    SIM_RESOLUTION: 128, // velocity grid — cheap, keep low
    DYE_RESOLUTION: 512, // mask grid — raise for a crisper cut-out edge
    DENSITY_DISSIPATION: 1.15, // how fast the hole heals shut
    VELOCITY_DISSIPATION: 2.2,
    PRESSURE: 0.8,
    PRESSURE_ITERATIONS: 20,
    CURL: 26, // swirl / turbulence
    SPLAT_RADIUS: 0.2, // size of the hole under the cursor
    SPLAT_FORCE: 6000,
    COVER: [0.008, 0.008, 0.008], // #020202 — must match --bg-canvas
    EDGE_IN: 0.05,
    EDGE_OUT: 0.3
};

/** "#e85002" | "#fff" | "rgb(2, 2, 2)" → [r, g, b] in 0..1. */
export function cssColorToRgb01(input: string): [number, number, number] | null {
    const value = input.trim();

    const hex = /^#?([a-f\d]{3}|[a-f\d]{6})$/i.exec(value);
    if (hex) {
        let h = hex[1];
        if (h.length === 3)
            h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
        return [
            parseInt(h.slice(0, 2), 16) / 255,
            parseInt(h.slice(2, 4), 16) / 255,
            parseInt(h.slice(4, 6), 16) / 255
        ];
    }

    const rgb = /^rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)/i.exec(value);
    if (rgb) return [Number(rgb[1]) / 255, Number(rgb[2]) / 255, Number(rgb[3]) / 255];

    return null;
}

const VERT = `
    precision highp float;
    attribute vec2 aPosition;
    varying vec2 vUv, vL, vR, vT, vB;
    uniform vec2 texelSize;
    void main(){
        vUv = aPosition * 0.5 + 0.5;
        vL = vUv - vec2(texelSize.x, 0.0);
        vR = vUv + vec2(texelSize.x, 0.0);
        vT = vUv + vec2(0.0, texelSize.y);
        vB = vUv - vec2(0.0, texelSize.y);
        gl_Position = vec4(aPosition, 0.0, 1.0);
    }`;

const F_CLEAR = `
    precision mediump float; precision mediump sampler2D;
    varying highp vec2 vUv;
    uniform sampler2D uTexture; uniform float value;
    void main(){ gl_FragColor = value * texture2D(uTexture, vUv); }`;

const F_SPLAT = `
    precision highp float; precision highp sampler2D;
    varying vec2 vUv;
    uniform sampler2D uTarget; uniform float aspectRatio;
    uniform vec3 color; uniform vec2 point; uniform float radius;
    void main(){
        vec2 p = vUv - point.xy; p.x *= aspectRatio;
        vec3 splat = exp(-dot(p, p) / radius) * color;
        vec3 base = texture2D(uTarget, vUv).xyz;
        gl_FragColor = vec4(base + splat, 1.0);
    }`;

const F_ADVECT = `
    precision highp float; precision highp sampler2D;
    varying vec2 vUv;
    uniform sampler2D uVelocity; uniform sampler2D uSource;
    uniform vec2 texelSize, dyeTexelSize;
    uniform float dt, dissipation;
    vec4 bilerp(sampler2D sam, vec2 uv, vec2 tsize){
        vec2 st = uv / tsize - 0.5;
        vec2 iuv = floor(st); vec2 fuv = fract(st);
        vec4 a = texture2D(sam, (iuv + vec2(0.5, 0.5)) * tsize);
        vec4 b = texture2D(sam, (iuv + vec2(1.5, 0.5)) * tsize);
        vec4 c = texture2D(sam, (iuv + vec2(0.5, 1.5)) * tsize);
        vec4 d = texture2D(sam, (iuv + vec2(1.5, 1.5)) * tsize);
        return mix(mix(a, b, fuv.x), mix(c, d, fuv.x), fuv.y);
    }
    void main(){
    #ifdef MANUAL_FILTERING
        vec2 coord = vUv - dt * bilerp(uVelocity, vUv, texelSize).xy * texelSize;
        vec4 result = bilerp(uSource, coord, dyeTexelSize);
    #else
        vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;
        vec4 result = texture2D(uSource, coord);
    #endif
        float decay = 1.0 + dissipation * dt;
        gl_FragColor = result / decay;
    }`;

const F_DIVERGENCE = `
    precision mediump float; precision mediump sampler2D;
    varying highp vec2 vUv, vL, vR, vT, vB;
    uniform sampler2D uVelocity;
    void main(){
        float L = texture2D(uVelocity, vL).x;
        float R = texture2D(uVelocity, vR).x;
        float T = texture2D(uVelocity, vT).y;
        float B = texture2D(uVelocity, vB).y;
        vec2 C = texture2D(uVelocity, vUv).xy;
        if(vL.x < 0.0){ L = -C.x; }
        if(vR.x > 1.0){ R = -C.x; }
        if(vT.y > 1.0){ T = -C.y; }
        if(vB.y < 0.0){ B = -C.y; }
        gl_FragColor = vec4(0.5 * (R - L + T - B), 0.0, 0.0, 1.0);
    }`;

const F_CURL = `
    precision mediump float; precision mediump sampler2D;
    varying highp vec2 vUv, vL, vR, vT, vB;
    uniform sampler2D uVelocity;
    void main(){
        float L = texture2D(uVelocity, vL).y;
        float R = texture2D(uVelocity, vR).y;
        float T = texture2D(uVelocity, vT).x;
        float B = texture2D(uVelocity, vB).x;
        gl_FragColor = vec4(0.5 * (R - L - T + B), 0.0, 0.0, 1.0);
    }`;

const F_VORTICITY = `
    precision highp float; precision highp sampler2D;
    varying vec2 vUv, vL, vR, vT, vB;
    uniform sampler2D uVelocity, uCurl;
    uniform float curl, dt;
    void main(){
        float L = texture2D(uCurl, vL).x;
        float R = texture2D(uCurl, vR).x;
        float T = texture2D(uCurl, vT).x;
        float B = texture2D(uCurl, vB).x;
        float C = texture2D(uCurl, vUv).x;
        vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
        force /= length(force) + 0.0001;
        force *= curl * C;
        force.y *= -1.0;
        vec2 vel = texture2D(uVelocity, vUv).xy + force * dt;
        vel = min(max(vel, -1000.0), 1000.0);
        gl_FragColor = vec4(vel, 0.0, 1.0);
    }`;

const F_PRESSURE = `
    precision mediump float; precision mediump sampler2D;
    varying highp vec2 vUv, vL, vR, vT, vB;
    uniform sampler2D uPressure, uDivergence;
    void main(){
        float L = texture2D(uPressure, vL).x;
        float R = texture2D(uPressure, vR).x;
        float T = texture2D(uPressure, vT).x;
        float B = texture2D(uPressure, vB).x;
        float div = texture2D(uDivergence, vUv).x;
        gl_FragColor = vec4((L + R + B + T - div) * 0.25, 0.0, 0.0, 1.0);
    }`;

const F_GRADIENT = `
    precision mediump float; precision mediump sampler2D;
    varying highp vec2 vUv, vL, vR, vT, vB;
    uniform sampler2D uPressure, uVelocity;
    void main(){
        float L = texture2D(uPressure, vL).x;
        float R = texture2D(uPressure, vR).x;
        float T = texture2D(uPressure, vT).x;
        float B = texture2D(uPressure, vB).x;
        vec2 vel = texture2D(uVelocity, vUv).xy;
        vel -= vec2(R - L, T - B);
        gl_FragColor = vec4(vel, 0.0, 1.0);
    }`;

// The mask: dye density → alpha cut-out in the cover colour.
const F_MASK = `
    precision highp float; precision highp sampler2D;
    varying vec2 vUv;
    uniform sampler2D uTexture;
    uniform vec3 uCover;
    uniform float uEdgeIn, uEdgeOut;
    void main(){
        float d = texture2D(uTexture, vUv).r;
        float a = 1.0 - smoothstep(uEdgeIn, uEdgeOut, d);
        gl_FragColor = vec4(uCover, a);
    }`;

export function createFluidMask(
    canvas: HTMLCanvasElement,
    options: Partial<FluidMaskConfig> = {}
): FluidMask | null {
    const config: FluidMaskConfig = { ...DEFAULTS, ...options };

    const params: WebGLContextAttributes = {
        alpha: true,
        depth: false,
        stencil: false,
        antialias: false,
        preserveDrawingBuffer: false,
        premultipliedAlpha: false
    };

    let glRaw = canvas.getContext("webgl2", params) as WebGL2RenderingContext | null;
    const isGL2 = !!glRaw;
    if (!glRaw) {
        glRaw = (canvas.getContext("webgl", params) ||
            canvas.getContext("experimental-webgl", params)) as WebGL2RenderingContext | null;
    }
    if (!glRaw) return null;
    const gl = glRaw;

    let supportLinear: boolean;
    let texType: number;
    if (isGL2) {
        gl.getExtension("EXT_color_buffer_float");
        supportLinear = !!gl.getExtension("OES_texture_float_linear");
        texType = gl.HALF_FLOAT;
    } else {
        const hf = gl.getExtension("OES_texture_half_float") as { HALF_FLOAT_OES: number } | null;
        supportLinear = !!gl.getExtension("OES_texture_half_float_linear");
        texType = hf ? hf.HALF_FLOAT_OES : gl.UNSIGNED_BYTE;
    }

    function isRenderable(internalFormat: number, format: number, type: number): boolean {
        const tex = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, tex);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, 4, 4, 0, format, type, null);
        const fb = gl.createFramebuffer();
        gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
        const ok = gl.checkFramebufferStatus(gl.FRAMEBUFFER) === gl.FRAMEBUFFER_COMPLETE;
        gl.deleteFramebuffer(fb);
        gl.deleteTexture(tex);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        return ok;
    }

    function pickFormat(
        internalFormat: number,
        format: number,
        type: number
    ): { internalFormat: number; format: number } {
        if (isRenderable(internalFormat, format, type)) return { internalFormat, format };
        if (!isGL2) return { internalFormat: gl.RGBA, format: gl.RGBA };
        if (internalFormat === gl.R16F) return pickFormat(gl.RG16F, gl.RG, type);
        if (internalFormat === gl.RG16F) return pickFormat(gl.RGBA16F, gl.RGBA, type);
        return { internalFormat: gl.RGBA, format: gl.RGBA };
    }

    const fmtRGBA = pickFormat(isGL2 ? gl.RGBA16F : gl.RGBA, gl.RGBA, texType);
    const fmtRG = pickFormat(isGL2 ? gl.RG16F : gl.RGBA, isGL2 ? gl.RG : gl.RGBA, texType);
    const fmtR = pickFormat(isGL2 ? gl.R16F : gl.RGBA, isGL2 ? gl.RED : gl.RGBA, texType);

    function compile(type: number, src: string, defines = ""): WebGLShader {
        const sh = gl.createShader(type)!;
        gl.shaderSource(sh, defines + src);
        gl.compileShader(sh);
        if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
            console.warn("[fluidMask] shader:", gl.getShaderInfoLog(sh));
        }
        return sh;
    }

    const vertShader = compile(gl.VERTEX_SHADER, VERT);
    const programs: WebGLProgram[] = [];

    interface Prog {
        uniforms: Record<string, WebGLUniformLocation | null>;
        bind(): void;
    }

    function createProgram(fragSrc: string, defines = ""): Prog {
        const prog = gl.createProgram()!;
        gl.attachShader(prog, vertShader);
        gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, fragSrc, defines));
        // MUST happen before linking. Without it aPosition may not land on
        // location 0 and nothing draws at all — with zero GL errors.
        gl.bindAttribLocation(prog, 0, "aPosition");
        gl.linkProgram(prog);
        if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
            console.warn("[fluidMask] link:", gl.getProgramInfoLog(prog));
        }
        const uniforms: Record<string, WebGLUniformLocation | null> = {};
        const count = gl.getProgramParameter(prog, gl.ACTIVE_UNIFORMS) as number;
        for (let i = 0; i < count; i++) {
            const name = gl.getActiveUniform(prog, i)!.name;
            uniforms[name] = gl.getUniformLocation(prog, name);
        }
        programs.push(prog);
        return { uniforms, bind: () => gl.useProgram(prog) };
    }

    const progClear = createProgram(F_CLEAR);
    const progSplat = createProgram(F_SPLAT);
    const progAdvect = createProgram(F_ADVECT, supportLinear ? "" : "#define MANUAL_FILTERING 1\n");
    const progDivergence = createProgram(F_DIVERGENCE);
    const progCurl = createProgram(F_CURL);
    const progVorticity = createProgram(F_VORTICITY);
    const progPressure = createProgram(F_PRESSURE);
    const progGradient = createProgram(F_GRADIENT);
    const progMask = createProgram(F_MASK);

    // ── fullscreen quad ──────────────────────────────────────────────────────
    const quadBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), gl.STATIC_DRAW);
    const indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 0, 2, 3]), gl.STATIC_DRAW);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(0);

    function blit(target: FBO | null): void {
        if (target === null) {
            gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        } else {
            gl.viewport(0, 0, target.width, target.height);
            gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo);
        }
        gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
    }

    const allFBOs: FBO[] = [];

    function createFBO(w: number, h: number, internalFormat: number, format: number, filter: number): FBO {
        gl.activeTexture(gl.TEXTURE0);
        const texture = gl.createTexture()!;
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, filter);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, filter);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, w, h, 0, format, texType, null);

        const fbo = gl.createFramebuffer()!;
        gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
        gl.viewport(0, 0, w, h);
        gl.clear(gl.COLOR_BUFFER_BIT);

        const obj: FBO = {
            texture,
            fbo,
            width: w,
            height: h,
            texelSizeX: 1 / w,
            texelSizeY: 1 / h,
            attach(id: number) {
                gl.activeTexture(gl.TEXTURE0 + id);
                gl.bindTexture(gl.TEXTURE_2D, texture);
                return id;
            }
        };
        allFBOs.push(obj);
        return obj;
    }

    function createDoubleFBO(
        w: number,
        h: number,
        internalFormat: number,
        format: number,
        filter: number
    ): DoubleFBO {
        let a = createFBO(w, h, internalFormat, format, filter);
        let b = createFBO(w, h, internalFormat, format, filter);
        return {
            width: w,
            height: h,
            texelSizeX: 1 / w,
            texelSizeY: 1 / h,
            get read() {
                return a;
            },
            set read(v: FBO) {
                a = v;
            },
            get write() {
                return b;
            },
            set write(v: FBO) {
                b = v;
            },
            swap() {
                const tmp = a;
                a = b;
                b = tmp;
            }
        };
    }

    function disposeFBOs(): void {
        for (const f of allFBOs) {
            gl.deleteFramebuffer(f.fbo);
            gl.deleteTexture(f.texture);
        }
        allFBOs.length = 0;
    }

    const MAX_TEX = (gl.getParameter(gl.MAX_TEXTURE_SIZE) as number) || 4096;

    function resolution(res: number): { width: number; height: number } {
        const w = gl.drawingBufferWidth;
        const h = gl.drawingBufferHeight;
        if (!(w > 0) || !(h > 0)) return { width: 1, height: 1 };
        let aspect = w / h;
        if (aspect < 1) aspect = 1 / aspect;
        aspect = Math.min(aspect, 4); // sanity cap
        const min = Math.max(1, Math.min(Math.round(res), MAX_TEX));
        const max = Math.max(1, Math.min(Math.round(res * aspect), MAX_TEX));
        return w > h ? { width: max, height: min } : { width: min, height: max };
    }

    let dye: DoubleFBO;
    let velocity: DoubleFBO;
    let divergence: FBO;
    let curlFBO: FBO;
    let pressure: DoubleFBO;

    function initFramebuffers(): void {
        disposeFBOs();
        const sim = resolution(config.SIM_RESOLUTION);
        const dyeRes = resolution(config.DYE_RESOLUTION);
        const filter = supportLinear ? gl.LINEAR : gl.NEAREST;
        gl.disable(gl.BLEND);
        dye = createDoubleFBO(dyeRes.width, dyeRes.height, fmtRGBA.internalFormat, fmtRGBA.format, filter);
        velocity = createDoubleFBO(sim.width, sim.height, fmtRG.internalFormat, fmtRG.format, filter);
        divergence = createFBO(sim.width, sim.height, fmtR.internalFormat, fmtR.format, gl.NEAREST);
        curlFBO = createFBO(sim.width, sim.height, fmtR.internalFormat, fmtR.format, gl.NEAREST);
        pressure = createDoubleFBO(sim.width, sim.height, fmtR.internalFormat, fmtR.format, gl.NEAREST);
    }

    // Only build the framebuffers once the canvas has a real, laid-out size.
    // Sizing them from a pre-layout 0-height box makes the aspect explode and
    // texImage2D go out of range ("attachment has zero size"), and a plain
    // width-changed check would then never rebuild them — width already matches.
    let ready = false;

    function resize(): boolean {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const w = Math.round(canvas.clientWidth * dpr);
        const h = Math.round(canvas.clientHeight * dpr);
        if (w < 1 || h < 1) return false;
        if (!ready || canvas.width !== w || canvas.height !== h) {
            canvas.width = w;
            canvas.height = h;
            initFramebuffers();
            ready = true;
        }
        return true;
    }
    resize();

    // Drive sizing off real layout changes rather than only off the frame loop.
    // Measuring once at construction can catch a mid-layout box (a stretched,
    // wrongly-sized mask on the first paint), and a section that resizes while
    // the tab is backgrounded would otherwise stay stale until the next frame.
    const resizeObserver =
        typeof ResizeObserver !== "undefined"
            ? new ResizeObserver(() => {
                  if (resize()) render();
              })
            : null;
    resizeObserver?.observe(canvas);

    function step(dt: number): void {
        gl.disable(gl.BLEND);

        progCurl.bind();
        gl.uniform2f(progCurl.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
        gl.uniform1i(progCurl.uniforms.uVelocity, velocity.read.attach(0));
        blit(curlFBO);

        progVorticity.bind();
        gl.uniform2f(progVorticity.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
        gl.uniform1i(progVorticity.uniforms.uVelocity, velocity.read.attach(0));
        gl.uniform1i(progVorticity.uniforms.uCurl, curlFBO.attach(1));
        gl.uniform1f(progVorticity.uniforms.curl, config.CURL);
        gl.uniform1f(progVorticity.uniforms.dt, dt);
        blit(velocity.write);
        velocity.swap();

        progDivergence.bind();
        gl.uniform2f(progDivergence.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
        gl.uniform1i(progDivergence.uniforms.uVelocity, velocity.read.attach(0));
        blit(divergence);

        progClear.bind();
        gl.uniform1i(progClear.uniforms.uTexture, pressure.read.attach(0));
        gl.uniform1f(progClear.uniforms.value, config.PRESSURE);
        blit(pressure.write);
        pressure.swap();

        progPressure.bind();
        gl.uniform2f(progPressure.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
        gl.uniform1i(progPressure.uniforms.uDivergence, divergence.attach(0));
        for (let i = 0; i < config.PRESSURE_ITERATIONS; i++) {
            gl.uniform1i(progPressure.uniforms.uPressure, pressure.read.attach(1));
            blit(pressure.write);
            pressure.swap();
        }

        progGradient.bind();
        gl.uniform2f(progGradient.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
        gl.uniform1i(progGradient.uniforms.uPressure, pressure.read.attach(0));
        gl.uniform1i(progGradient.uniforms.uVelocity, velocity.read.attach(1));
        blit(velocity.write);
        velocity.swap();

        progAdvect.bind();
        gl.uniform2f(progAdvect.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
        if (!supportLinear) {
            gl.uniform2f(progAdvect.uniforms.dyeTexelSize, velocity.texelSizeX, velocity.texelSizeY);
        }
        gl.uniform1i(progAdvect.uniforms.uVelocity, velocity.read.attach(0));
        gl.uniform1i(progAdvect.uniforms.uSource, velocity.read.attach(0));
        gl.uniform1f(progAdvect.uniforms.dt, dt);
        gl.uniform1f(progAdvect.uniforms.dissipation, config.VELOCITY_DISSIPATION);
        blit(velocity.write);
        velocity.swap();

        if (!supportLinear) {
            gl.uniform2f(progAdvect.uniforms.dyeTexelSize, dye.texelSizeX, dye.texelSizeY);
        }
        gl.uniform1i(progAdvect.uniforms.uVelocity, velocity.read.attach(0));
        gl.uniform1i(progAdvect.uniforms.uSource, dye.read.attach(1));
        gl.uniform1f(progAdvect.uniforms.dissipation, config.DENSITY_DISSIPATION);
        blit(dye.write);
        dye.swap();
    }

    function render(): void {
        gl.disable(gl.BLEND);
        progMask.bind();
        gl.uniform1i(progMask.uniforms.uTexture, dye.read.attach(0));
        gl.uniform3f(progMask.uniforms.uCover, config.COVER[0], config.COVER[1], config.COVER[2]);
        gl.uniform1f(progMask.uniforms.uEdgeIn, config.EDGE_IN);
        gl.uniform1f(progMask.uniforms.uEdgeOut, config.EDGE_OUT);
        blit(null);
    }

    function correctRadius(r: number): number {
        const aspect = canvas.width / canvas.height;
        return aspect > 1 ? r * aspect : r;
    }

    function splat(x: number, y: number, dx: number, dy: number, strength: number): void {
        progSplat.bind();
        gl.uniform1i(progSplat.uniforms.uTarget, velocity.read.attach(0));
        gl.uniform1f(progSplat.uniforms.aspectRatio, canvas.width / canvas.height);
        gl.uniform2f(progSplat.uniforms.point, x, y);
        gl.uniform3f(progSplat.uniforms.color, dx, dy, 0);
        gl.uniform1f(progSplat.uniforms.radius, correctRadius(config.SPLAT_RADIUS / 100));
        blit(velocity.write);
        velocity.swap();

        gl.uniform1i(progSplat.uniforms.uTarget, dye.read.attach(0));
        gl.uniform3f(progSplat.uniforms.color, strength, strength, strength);
        blit(dye.write);
        dye.swap();
    }

    let running = true;
    let paused = false;
    let rafId = 0;
    let lastTime = performance.now();

    function frame(): void {
        if (!running || paused) return;
        const now = performance.now();
        const dt = Math.min((now - lastTime) / 1000, 1 / 30);
        lastTime = now;
        if (resize()) {
            step(dt);
            render();
        }
        rafId = requestAnimationFrame(frame);
    }
    rafId = requestAnimationFrame(frame);

    return {
        config,
        splatNormalized(nx, ny, ndx, ndy, strength = 1) {
            if (!ready || !running) return;
            splat(nx, ny, ndx * config.SPLAT_FORCE, ndy * config.SPLAT_FORCE, strength);
        },
        tick(dt = 1 / 60) {
            if (!running || !resize()) return;
            step(dt);
            render();
        },
        pause() {
            paused = true;
            cancelAnimationFrame(rafId);
        },
        resume() {
            if (!running || !paused) return;
            paused = false;
            lastTime = performance.now(); // no catch-up step for the time spent paused
            rafId = requestAnimationFrame(frame);
        },
        destroy() {
            running = false;
            cancelAnimationFrame(rafId);
            resizeObserver?.disconnect();
            disposeFBOs();
            for (const p of programs) gl.deleteProgram(p);
            gl.deleteShader(vertShader);
            gl.deleteBuffer(quadBuffer);
            gl.deleteBuffer(indexBuffer);
            // Free the GPU context outright — React 19 StrictMode mounts twice
            // in dev, and leaked contexts hit the browser's ~16-context cap fast.
            gl.getExtension("WEBGL_lose_context")?.loseContext();
        }
    };
}
