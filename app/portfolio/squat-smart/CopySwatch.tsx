"use client";

import { useRef, useState } from "react";
import s from "./ss.module.scss";

// A palette swatch that copies its hex on click and says so. The accessible
// name is the visible text (name, hex, role) plus a hidden "copy" hint.

export default function CopySwatch({ name, hex, use, dark }: { name: string; hex: string; use: string; dark: boolean }) {
    const [copied, setCopied] = useState(false);
    const timer = useRef(0);

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(hex);
            setCopied(true);
            window.clearTimeout(timer.current);
            timer.current = window.setTimeout(() => setCopied(false), 1400);
        } catch {
            // Clipboard blocked: the hex is visible on the swatch anyway.
        }
    };

    return (
        <button type="button" className={s.swatch} style={{ "--c": hex } as React.CSSProperties} data-dark={dark ? "" : undefined} onClick={copy}>
            <b>{name}</b>
            <span aria-live="polite">{copied ? "Copied" : hex}</span>
            <small>{use}</small>
            <span className={s.visuallyHidden}>, copy the hex code</span>
        </button>
    );
}
