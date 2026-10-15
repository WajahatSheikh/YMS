"use client";

import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <main
            id="main"
            style={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                background: "var(--bg-canvas)",
                color: "var(--text-primary)",
                gap: "var(--space-6)",
                padding: "var(--space-8) var(--gutter)",
                textAlign: "center"
            }}
        >
            <h1 className="display-s">Something went wrong</h1>
            <p className="body-l" style={{ color: "var(--text-tertiary)", maxWidth: "40ch" }}>
                An unexpected error occurred. Please try again.
            </p>
            <button
                type="button"
                onClick={reset}
                style={{
                    height: "var(--control-lg)",
                    padding: "0 var(--space-8)",
                    border: "none",
                    borderRadius: "var(--radius-full)",
                    background: "var(--gradient-brand)",
                    color: "var(--text-on-brand)",
                    fontFamily: "var(--font-sans)",
                    fontWeight: 500,
                    cursor: "pointer"
                }}
            >
                Try again
            </button>
        </main>
    );
}
