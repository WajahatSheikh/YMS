"use client";

import { useEffect } from "react";

// The one pointer listener behind every `{...ctaGlow}` element (app/lib/ctaGlow.ts).
// Mounted once in Wrapper, so CTAs inside server components glow without
// shipping a handler each.
//
// The rect is read per move rather than cached on enter: Lenis can scroll the
// page while the cursor sits still on a button, and a cached viewport-relative
// rect would be stale the moment it did. One rect read on a small element, at
// the rate the browser coalesces pointermove to, is not worth the staleness.
const CtaGlow = () => {
    useEffect(() => {
        const onMove = (event: PointerEvent) => {
            const el = event.target instanceof Element ? event.target.closest<HTMLElement>("[data-glow]") : null;
            if (!el) return;
            const rect = el.getBoundingClientRect();
            if (!rect.width || !rect.height) return;
            el.style.setProperty("--mx", `${((event.clientX - rect.left) / rect.width) * 100}%`);
            el.style.setProperty("--my", `${((event.clientY - rect.top) / rect.height) * 100}%`);
        };

        document.addEventListener("pointermove", onMove, { passive: true });
        return () => document.removeEventListener("pointermove", onMove);
    }, []);

    return null;
};

export default CtaGlow;
