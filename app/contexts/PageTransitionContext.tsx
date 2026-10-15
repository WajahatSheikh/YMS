"use client";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

// Page transitions between the home page and the case studies.
//
// A small state machine drives the overlay (app/Components/PageTransition):
//   idle   → nothing on screen
//   cover  → columns sweep up over the page
//   hold   → page covered; the route is pushed and the loader runs
//   reveal → the new page has rendered; columns lift away
// It is plain state + CSS — no animation library to load.

export type TransitionPhase = "idle" | "cover" | "hold" | "reveal";

interface PageTransitionContextType {
    navigateTo: (href: string, label?: string) => void;
    phase: TransitionPhase;
    /** What's being opened (e.g. the case study's title), shown in the loader. */
    label: string;
    href: string;
}

export const PageTransitionContext = createContext<PageTransitionContextType>({
    navigateTo: () => {},
    phase: "idle",
    label: "",
    href: ""
});

export const usePageTransition = () => useContext(PageTransitionContext);

const COVER_MS = 720; // columns finish covering (stagger included)
const MIN_VISIBLE_MS = 1150; // the loader stays long enough to read, even on a fast route
const REVEAL_MS = 950; // columns finish lifting
const SAFETY_MS = 8000; // if a route never changes, uncover anyway

export function PageTransitionProvider({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const [phase, setPhase] = useState<TransitionPhase>("idle");
    const [label, setLabel] = useState("");
    const [href, setHref] = useState("");
    const phaseRef = useRef<TransitionPhase>("idle");
    const startedAt = useRef(0);
    const timers = useRef<number[]>([]);
    const isFirstMount = useRef(true);

    const go = (next: TransitionPhase) => {
        phaseRef.current = next;
        setPhase(next);
    };

    const later = (fn: () => void, ms: number) => {
        timers.current.push(window.setTimeout(fn, ms));
    };

    const reveal = useCallback(() => {
        go("reveal");
        later(() => go("idle"), REVEAL_MS);
    }, []);

    const navigateTo = useCallback(
        (target: string, name?: string) => {
            if (phaseRef.current !== "idle") return;
            // Already here: nothing to transition to.
            if (target.split("#")[0] === pathname) {
                window.scrollTo({ top: 0, behavior: "smooth" });
                return;
            }
            const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            router.prefetch(target);
            setLabel(name ?? "");
            setHref(target);
            startedAt.current = performance.now();
            go("cover");
            later(() => {
                go("hold");
                router.push(target);
                later(() => {
                    if (phaseRef.current === "hold") reveal();
                }, SAFETY_MS);
            }, reduced ? 200 : COVER_MS);
        },
        [pathname, router, reveal]
    );

    // The new route has rendered: uncover once the loader has been up long
    // enough to read.
    useEffect(() => {
        if (isFirstMount.current) {
            isFirstMount.current = false;
            return;
        }
        if (phaseRef.current !== "hold" && phaseRef.current !== "cover") return;
        const elapsed = performance.now() - startedAt.current;
        later(reveal, Math.max(0, MIN_VISIBLE_MS - elapsed));
    }, [pathname, reveal]);

    useEffect(() => () => timers.current.forEach((t) => window.clearTimeout(t)), []);

    // Links marked `data-transition` (e.g. the Work rows, which are server
    // components and can't carry an onClick) go through the overlay too; an
    // optional `data-transition-label` names what's being opened.
    // Modifier-clicks keep their usual open-in-new-tab behaviour.
    useEffect(() => {
        const onClick = (e: MouseEvent) => {
            if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
            const link = e.target instanceof Element ? e.target.closest<HTMLAnchorElement>("a[data-transition]") : null;
            if (!link) return;
            e.preventDefault();
            navigateTo(link.getAttribute("href") ?? "/", link.dataset.transitionLabel);
        };
        document.addEventListener("click", onClick);
        return () => document.removeEventListener("click", onClick);
    }, [navigateTo]);

    return (
        <PageTransitionContext.Provider value={{ navigateTo, phase, label, href }}>
            {children}
        </PageTransitionContext.Provider>
    );
}
