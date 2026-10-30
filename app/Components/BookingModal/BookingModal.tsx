"use client";

import { useEffect, useRef, useState } from "react";
import { useLenis } from "@/app/contexts/LenisContext";
import { SITE } from "@/app/data/site";
import style from "./index.module.scss";

// On-page Calendly booking.
//
// Every "Book a call" link carries `data-booking` (app/lib/booking.ts). One
// delegated click listener here turns those clicks into this modal, so no CTA
// needs its own handler and a new one only has to spread bookingLinkProps().
//
// Built on Calendly's plain iframe embed rather than its widget.js: no
// third-party script on the page, no extra stylesheet, nothing to load until
// someone shows intent. The iframe starts loading on hover/focus of a booking
// link, so the calendar is usually ready by the time the modal opens.
//
// Native <dialog> + showModal() gives the focus trap, Escape to close, inert
// page behind and top-layer stacking for free.

declare global {
    interface Window {
        dataLayer?: Record<string, unknown>[];
        gtag?: (command: "event", name: string, params: Record<string, unknown>) => void;
    }
}

const CALENDLY_ORIGIN = "https://calendly.com";

const isCalendly = (href: string) => {
    try {
        const { hostname } = new URL(href);
        return hostname === "calendly.com" || hostname.endsWith(".calendly.com");
    } catch {
        return false;
    }
};

// Calendly's documented embed parameters, matched to the site theme. The
// colours only take effect on a paid Calendly plan; on the free plan they are
// ignored and the calendar stays light, which reads fine in either theme.
const embedUrl = (href: string) => {
    const light = document.documentElement.dataset.theme === "light";
    const url = new URL(href);
    url.searchParams.set("embed_domain", window.location.hostname);
    url.searchParams.set("embed_type", "Inline");
    url.searchParams.set("hide_gdpr_banner", "1");
    url.searchParams.set("background_color", light ? "ffffff" : "141414");
    url.searchParams.set("text_color", light ? "0c0a09" : "ffffff");
    url.searchParams.set("primary_color", "e85002");
    return url.toString();
};

// GTM reads the dataLayer push; GA4 (gtag.js, app/Components/Seo/Analytics.tsx)
// only takes gtag() calls, so the event goes to both. gtag is absent off the
// live site, where nothing is sent.
const track = (event: string, cta: string) => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event, cta });
    window.gtag?.("event", event, { cta });
};

const BookingModal = () => {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const ctaRef = useRef("");
    const [src, setSrc] = useState<string | null>(null);
    const [loaded, setLoaded] = useState(false);
    const [open, setOpen] = useState(false);
    const lenis = useLenis();

    const bookingHref = isCalendly(SITE.bookingUrl) ? SITE.bookingUrl : null;

    // Delegated: open on click, warm the iframe up on hover or keyboard focus.
    useEffect(() => {
        if (!bookingHref) return;

        const linkFrom = (target: EventTarget | null) =>
            target instanceof Element ? target.closest<HTMLAnchorElement>("a[data-booking]") : null;

        const warm = (e: Event) => {
            if (linkFrom(e.target)) setSrc(embedUrl(bookingHref));
        };

        const onClick = (e: MouseEvent) => {
            if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
            const link = linkFrom(e.target);
            if (!link) return;
            e.preventDefault();
            ctaRef.current = link.dataset.cta ?? "";
            setSrc(embedUrl(bookingHref));
            dialogRef.current?.showModal();
            setOpen(true);
            track("book_call_open", ctaRef.current);
        };

        document.addEventListener("click", onClick);
        document.addEventListener("pointerover", warm, { passive: true });
        document.addEventListener("focusin", warm);
        return () => {
            document.removeEventListener("click", onClick);
            document.removeEventListener("pointerover", warm);
            document.removeEventListener("focusin", warm);
        };
    }, [bookingHref]);

    // Calendly posts its lifecycle to the parent window; a finished booking is
    // the conversion worth reporting for ads.
    useEffect(() => {
        const onMessage = (e: MessageEvent) => {
            if (e.origin !== CALENDLY_ORIGIN) return;
            const name = (e.data as { event?: unknown } | null)?.event;
            if (name === "calendly.event_scheduled") track("book_call_scheduled", ctaRef.current);
        };
        window.addEventListener("message", onMessage);
        return () => window.removeEventListener("message", onMessage);
    }, []);

    // While open: hold the page still (native scroll and Lenis alike).
    useEffect(() => {
        if (!open) return;
        const root = document.documentElement;
        const previous = root.style.overflow;
        root.style.overflow = "hidden";
        lenis?.stop();
        return () => {
            root.style.overflow = previous;
            lenis?.start();
        };
    }, [open, lenis]);

    // State is updated here rather than only from the dialog's `close` event,
    // which browsers fire asynchronously (and can hold back in a background
    // tab) — the scroll lock must never outlive the modal.
    const close = () => {
        dialogRef.current?.close();
        setOpen(false);
    };

    if (!bookingHref) return null;

    return (
        <dialog
            ref={dialogRef}
            className={style.dialog}
            aria-labelledby="booking-title"
            // Escape: close through the same path as the button.
            onCancel={(e) => {
                e.preventDefault();
                close();
            }}
            onClose={() => setOpen(false)}
            // A click that lands on the dialog itself, not the panel, is the backdrop.
            onClick={(e) => {
                if (e.target === e.currentTarget) close();
            }}
        >
            <div className={style.panel}>
                <div className={style.bar}>
                    <p id="booking-title" className={style.title}>
                        Book a call
                    </p>
                    <a className={style.external} href={bookingHref} target="_blank" rel="noopener">
                        Open in new tab
                    </a>
                    <button type="button" className={style.close} onClick={close} aria-label="Close">
                        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                        </svg>
                    </button>
                </div>

                <div className={style.body}>
                    {!loaded && (
                        <div className={style.loading} role="status">
                            <span className={style.spinner} aria-hidden="true" />
                            Loading calendar…
                        </div>
                    )}
                    {src && (
                        <iframe
                            className={style.frame}
                            src={src}
                            title="Schedule a call with YourMomStudio on Calendly"
                            onLoad={() => setLoaded(true)}
                        />
                    )}
                </div>
            </div>
        </dialog>
    );
};

export default BookingModal;
