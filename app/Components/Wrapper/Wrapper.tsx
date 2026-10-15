"use client";

import Header from "../Header/Header";
import { scrollToSection } from "@/app/lib/scrollToSection";
import BookingModal from "../BookingModal/BookingModal";
import CtaGlow from "../CtaGlow/CtaGlow";
import { useRef, useEffect, useState } from "react";
import type Lenis from "@studio-freight/lenis";
import { LenisContext } from "@/app/contexts/LenisContext";
import { PageTransitionProvider } from "@/app/contexts/PageTransitionContext";
import PageTransition from "../PageTransition/PageTransition";

function WrapperInner({ children, footer }: Readonly<{ children: React.ReactNode; footer: React.ReactNode }>) {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);

    // Smooth scrolling is desktop-only, so Lenis and GSAP are fetched only there:
    // phones never download or run either for it. Until they arrive the page
    // scrolls natively, which is what every hook using useLenis() already
    // falls back to while the context is null.
    useEffect(() => {
        if (window.innerWidth < 991) return;

        let cancelled = false;
        let teardown: (() => void) | undefined;

        Promise.all([import("@studio-freight/lenis"), import("gsap"), import("gsap/ScrollTrigger")]).then(
            ([{ default: LenisCtor }, { default: gsap }, { ScrollTrigger }]) => {
                if (cancelled) return;
                gsap.registerPlugin(ScrollTrigger);

                const lenis = new LenisCtor({
                    duration: 1.0,
                    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                    smoothWheel: true
                });

                lenis.on("scroll", ScrollTrigger.update);

                const tickerFn = (time: number) => lenis.raf(time * 1000);
                gsap.ticker.add(tickerFn);
                gsap.ticker.lagSmoothing(500, 33);

                setLenisInstance(lenis);

                teardown = () => {
                    gsap.ticker.remove(tickerFn);
                    lenis.destroy();
                    setLenisInstance(null);
                };
            }
        );

        return () => {
            cancelled = true;
            teardown?.();
        };
    }, []);

    // In-page #links anywhere (footer columns, "See what's included", …) scroll
    // smoothly and stop clear of the fixed header, instead of the browser's
    // instant jump that lands the heading underneath it. Links that handle
    // their own click (the header nav) call preventDefault and are skipped;
    // the skip link keeps native behaviour, which also moves focus.
    const lenisRef = useRef<Lenis | null>(null);
    lenisRef.current = lenisInstance;
    useEffect(() => {
        const onClick = (e: MouseEvent) => {
            if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
            const link = e.target instanceof Element ? e.target.closest<HTMLAnchorElement>('a[href^="#"], a[href^="/#"]') : null;
            const id = link?.getAttribute("href")?.split("#")[1];
            if (!id || id === "main" || !document.getElementById(id)) return;
            e.preventDefault();
            scrollToSection(id, lenisRef.current);
        };
        document.addEventListener("click", onClick);
        return () => document.removeEventListener("click", onClick);
    }, []);

    return (
        <LenisContext.Provider value={lenisInstance}>
            <div ref={wrapperRef} className="App" id="lenis-wrapper">
                <div className="wrapper">
                    <Header />
                    {children}
                </div>
                {footer}
            </div>
            {/* Lives here so it persists across every route change. */}
            <PageTransition />
            <BookingModal />
            <CtaGlow />
        </LenisContext.Provider>
    );
}

// `footer` is a slot: the footer is a server component, rendered by the root
// layout and passed in, so it doesn't become client code by being imported here.
function Wrapper({ children, footer }: Readonly<{ children: React.ReactNode; footer: React.ReactNode }>) {
    return (
        <PageTransitionProvider>
            <WrapperInner footer={footer}>{children}</WrapperInner>
        </PageTransitionProvider>
    );
}

export default Wrapper;
