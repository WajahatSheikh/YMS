import type Lenis from "@studio-freight/lenis";

/** Height of the fixed header; in-page jumps stop this far above their target. */
export const NAVBAR_HEIGHT = 92; // Figma: 01 · Nav is 92px tall

// Smooth-scroll to a section by id, clearing the fixed header. Uses Lenis when
// it is running (desktop) and native smooth scrolling otherwise.
//
// Lower sections use content-visibility: auto (globals.scss), so until they
// have rendered their height is an estimate and a target position computed
// from it would be off. `render-all` lays every section out for a moment: the
// target is measured on real heights, and the browser remembers those heights
// (contain-intrinsic-size: auto) once the class comes off, so nothing shifts
// under the scroll.
export function scrollToSection(id: string, lenis: Lenis | null) {
    const el = document.getElementById(id);
    if (!el) return;

    const root = document.documentElement;
    root.classList.add("render-all");

    if (lenis) {
        lenis.scrollTo(el, { offset: -NAVBAR_HEIGHT });
    } else {
        window.scrollTo({
            top: el.getBoundingClientRect().top + window.scrollY - NAVBAR_HEIGHT,
            behavior: "smooth"
        });
    }

    // Two frames: one for layout, one for the remembered sizes to be recorded.
    requestAnimationFrame(() => requestAnimationFrame(() => root.classList.remove("render-all")));
}
