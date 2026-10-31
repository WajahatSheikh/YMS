"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import style from "./index.module.scss";

// A muted reel for the inner pages. The poster is a real, optimised <Image>
// that renders straight away (so it, not the video, is the page's largest
// paint), and the video sits on top of it: it costs nothing until it nears
// the viewport (preload="none"), plays only while on screen, and never for
// people who've asked for reduced motion — they keep the poster.
const InViewVideo = ({ src, poster }: { src: string; poster: string }) => {
    const ref = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const video = ref.current;
        if (!video) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
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
        <div className={style.reel}>
            <Image src={poster} alt="" width={640} height={440} sizes="(max-width: 991px) 100vw, 760px" />
            <video
                ref={ref}
                src={src}
                width={640}
                height={440}
                muted
                loop
                playsInline
                preload="none"
                aria-hidden="true"
                tabIndex={-1}
            />
        </div>
    );
};

export default InViewVideo;
