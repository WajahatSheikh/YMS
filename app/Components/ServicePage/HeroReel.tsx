"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

// The service reel in the hero. The poster is the real image (priority, so it
// is fetched first and is what LCP measures on a laptop); the reel only plays
// on large screens, after the page has loaded, and never under reduced motion
// or Save-Data. On phones it stays a still: a looping video there cost the
// page's LCP 11.9 s on a throttled phone, because the video's first frame
// became the largest paint.
const HeroReel = ({ src, poster, alt }: { src: string; poster: string; alt: string }) => {
    const ref = useRef<HTMLVideoElement>(null);
    const [on, setOn] = useState(false);

    useEffect(() => {
        const video = ref.current;
        if (!video) return;
        const large = window.matchMedia("(min-width: 992px)").matches;
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
        if (!large || reduced || saveData) return;

        // Start as soon as the poster (the LCP image) has painted, not at the
        // window load event, which waits for every image and script on the page
        // and was what made the reel appear seconds late.
        const poster = video.previousElementSibling as HTMLImageElement | null;
        const start = () => {
            video.preload = "auto";
            video.src = src;
            video.muted = true;
            video.play().catch(() => {});
        };
        const waiting = !!poster && poster.tagName === "IMG" && !poster.complete;
        if (waiting) poster.addEventListener("load", start, { once: true });
        else start();

        // Only play while on screen.
        const observer = new IntersectionObserver(([entry]) => {
            if (!video.src) return;
            if (entry.isIntersecting) video.play().catch(() => {});
            else video.pause();
        });
        observer.observe(video);
        return () => {
            poster?.removeEventListener("load", start);
            observer.disconnect();
        };
    }, [src]);

    return (
        <>
            <Image src={poster} alt={alt} width={640} height={440} sizes="(max-width: 991px) 92vw, 40vw" priority />
            <video
                ref={ref}
                muted
                loop
                playsInline
                preload="none"
                aria-hidden="true"
                tabIndex={-1}
                onPlaying={() => setOn(true)}
                style={{ opacity: on ? 1 : 0 }}
            />
        </>
    );
};

export default HeroReel;
