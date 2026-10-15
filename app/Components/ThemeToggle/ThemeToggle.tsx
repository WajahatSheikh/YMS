"use client";

import { useEffect, useState } from "react";
import { THEME_COLOR, THEME_STORAGE_KEY, type Theme } from "@/app/lib/theme";
import style from "./index.module.scss";

// Dark/light switch for the nav. The theme is `data-theme` on <html>; the
// pre-paint script in app/layout.tsx sets it on load, this flips it, saves the
// choice and updates the browser-chrome colour. Where the View Transitions API
// exists the whole page cross-fades between themes; otherwise it switches
// instantly. A `themechange` event lets canvas effects (the hero mask) repaint.

const apply = (theme: Theme) => {
    const root = document.documentElement;
    root.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", THEME_COLOR[theme]);
    try {
        localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
        // Private mode or storage blocked: the switch still works for this visit.
    }
    window.dispatchEvent(new CustomEvent("themechange", { detail: theme }));
};

const SunIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
        <path
            d="M12 2.5v2M12 19.5v2M4.6 4.6l1.4 1.4M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4 6 18M18 6l1.4-1.4"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
        />
    </svg>
);

const MoonIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
            d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5a8.5 8.5 0 1 0 10.7 10.7Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
        />
    </svg>
);

const ThemeToggle = ({ className }: { className?: string }) => {
    // Server HTML can't know the visitor's theme, so render the dark state and
    // read the real one after mount (the attribute is already set pre-paint).
    const [theme, setTheme] = useState<Theme>("dark");

    useEffect(() => {
        const current: Theme = document.documentElement.dataset.theme === "light" ? "light" : "dark";
        setTheme(current);
        // Next may render the theme-color meta after the pre-paint script ran.
        document.querySelector('meta[name="theme-color"]')?.setAttribute("content", THEME_COLOR[current]);
    }, []);

    const next: Theme = theme === "dark" ? "light" : "dark";

    const toggle = () => {
        const run = () => {
            apply(next);
            setTheme(next);
        };
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const doc = document as Document & { startViewTransition?: (cb: () => void) => unknown };
        if (doc.startViewTransition && !reduced) doc.startViewTransition(run);
        else run();
    };

    return (
        <button
            type="button"
            className={`${style.toggle} ${className ?? ""}`}
            onClick={toggle}
            aria-label={`Switch to ${next} theme`}
            title={`Switch to ${next} theme`}
            data-theme-state={theme}
        >
            {/* Both icons stay mounted; CSS rotates one out and the other in. */}
            <span className={style.icon} data-icon="sun">
                <SunIcon />
            </span>
            <span className={style.icon} data-icon="moon">
                <MoonIcon />
            </span>
        </button>
    );
};

export default ThemeToggle;
