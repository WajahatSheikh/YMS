// ─────────────────────────────────────────────────────────────────────────────
// Orbit tiles — the layer that sits BEHIND the fluid mask and gets revealed.
//
// Cards ride a straight track that itself rotates. Position along the track is
// x = R·sin(2πp), and "depth" is faked from the same angle rather than from a
// real 3D transform:
//
//     t          = ((1 - cos(2πp)) / 2) ^ 1.3      // 0 = far back, 1 = front
//     x          = R · sin(2πp)
//     scale      = 0.2   + 0.8 · t
//     blur       = 15.36 · (1 - t)  px
//     brightness = 0.3   + 0.7 · t
//     z-index    = round(1000 · t)
//
// Each card counter-rotates by -rotation so it always stays upright while the
// track swings underneath it.
//
// Progress is driven by how far the CURSOR has travelled, not by a timer — so
// the orbit holds still when the pointer does, and only drifts slowly on idle.
// ─────────────────────────────────────────────────────────────────────────────

export interface OrbitTilesConfig {
    /** Orbit radius in px. On the reference design this equals the card width. */
    radius: number;
    minScale: number;
    maxBlur: number;
    minBrightness: number;
    depthPow: number;
    /** px of cursor travel for one full loop. */
    distancePerCycle: number;
    /** how fast the track swings with the cursor. */
    degreesPerPx: number;
    /** slow creep (in cycles/second) while the cursor is still. */
    idleDrift: number;
    /** smoothing factor, 0..1. */
    ease: number;
}

export interface OrbitTiles {
    config: OrbitTilesConfig;
    /** Feed it how far the cursor moved this frame, in px. */
    advance(distancePx: number): void;
    tick(dt: number): void;
    layout(): void;
    /** Retarget the orbit radius, e.g. when the host section is resized. */
    setRadius(px: number): void;
    /** Front-most card scale at the track's extreme left/right, for span maths. */
    extremeScale(): number;
}

const DEFAULTS: OrbitTilesConfig = {
    radius: 384,
    minScale: 0.2,
    maxBlur: 15.36,
    minBrightness: 0.3,
    depthPow: 1.3,
    distancePerCycle: 5200,
    degreesPerPx: 0.06,
    idleDrift: 0.004,
    ease: 0.075
};

export function createOrbitTiles(
    track: HTMLElement,
    items: HTMLElement[],
    options: Partial<OrbitTilesConfig> = {}
): OrbitTiles | null {
    const config: OrbitTilesConfig = { ...DEFAULTS, ...options };
    const count = items.length;
    if (!count) return null;

    let progress = 0;
    let rotation = 0;
    let targetProgress = 0;
    let targetRotation = 0;

    function layout(): void {
        track.style.transform = `rotate(${rotation.toFixed(3)}deg)`;

        for (let i = 0; i < count; i++) {
            let p = (progress + i / count) % 1;
            if (p < 0) p += 1;

            const a = p * Math.PI * 2;
            const t = Math.pow((1 - Math.cos(a)) / 2, config.depthPow);
            const x = config.radius * Math.sin(a);
            const scale = config.minScale + (1 - config.minScale) * t;
            const blur = config.maxBlur * (1 - t);
            const brightness = config.minBrightness + (1 - config.minBrightness) * t;

            const el = items[i];
            el.style.transform =
                `translate(${x.toFixed(2)}px, 0px) ` +
                `rotate(${(-rotation).toFixed(3)}deg) ` +
                `scale(${scale.toFixed(4)})`;
            el.style.filter = `blur(${blur.toFixed(3)}px) brightness(${brightness.toFixed(3)})`;
            el.style.zIndex = String(Math.round(1000 * t));
            el.dataset.state = t > 0.98 ? "active" : "idle";
        }
    }

    return {
        config,
        setRadius(px: number) {
            config.radius = Math.max(0, px);
        },
        // A card sits at the track's far left/right when p = 0.25 or 0.75, i.e.
        // cos(2πp) = 0, so t = 0.5^depthPow. Needed to work out the real visual
        // span: the outermost card's own width pokes past the orbit radius.
        extremeScale() {
            const t = Math.pow(0.5, config.depthPow);
            return config.minScale + (1 - config.minScale) * t;
        },
        advance(distancePx: number) {
            targetProgress += distancePx / config.distancePerCycle;
            targetRotation -= distancePx * config.degreesPerPx;
        },
        tick(dt: number) {
            targetProgress += config.idleDrift * dt;
            progress += (targetProgress - progress) * config.ease;
            rotation += (targetRotation - rotation) * config.ease;
            layout();
        },
        layout
    };
}
