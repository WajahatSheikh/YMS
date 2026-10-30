"use client";

import { useEffect, useRef, useState } from "react";

// A muted reel for the inner pages. Like the home page's ServiceVideo it costs
// nothing until it nears the viewport (preload="none", poster attached late),
// plays only while on screen, and never for people who've asked for reduced
// motion — they get the poster.
const InViewVideo = ({ src, poster, className }: { src: string; poster: string; className?: string }) => {
    const ref = useRef<HTMLVideoElement>(null);
    const [near, setNear] = useState(false);

    useEffect(() => {
        const video = ref.current;
        if (!video) return;
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setNear(true);
                    if (reduced) return;
                    video.muted = true;
                    video.play().catch(() => {});
                } else {
                    video.pause();
                }
            },
            { rootMargin: "200px 0px" }
        );
        observer.observe(video);
        return () => observer.disconnect();
    }, []);

    return (
        <video
            ref={ref}
            className={className}
            src={src}
            poster={near ? poster : undefined}
            width={640}
            height={440}
            muted
            loop
            playsInline
            preload="none"
            aria-hidden="true"
            tabIndex={-1}
        />
    );
};

export default InViewVideo;
