"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { RelatedCaseStudy } from "@/app/data/caseStudies";

// "Next case study": the link every art-directed case study ends on.
//
// The page passes the related studies (shared tags, worked out on the server
// by relatedCaseStudies() in app/data/caseStudies.ts, so only these small
// cards reach the browser). The server renders the closest match, so the link
// is in the HTML for crawlers and without script; after mount a random related
// study is chosen, so returning readers don't always land on the same one. It
// sits at the very end of the page, so the swap is never seen.
//
// Markup only: each case study styles it in its own theme through `classes`.

export interface NextCaseStudyClasses {
    link: string;
    label: string;
    title: string;
    meta: string;
    tags: string;
    tag: string;
    thumb: string;
    icon: string;
}

const Arrow = () => (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export default function NextCaseStudy({
    related,
    classes,
    label = "Next case study",
    cta,
    sizes = "(max-width: 767px) 92vw, 34vw"
}: {
    related: readonly RelatedCaseStudy[];
    classes: NextCaseStudyClasses;
    label?: string;
    /** Visible button text beside the arrow (e.g. "View case study"). */
    cta?: string;
    /** next/image sizes for the thumbnail, matching how wide the page shows it. */
    sizes?: string;
}) {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (related.length > 1) setIndex(Math.floor(Math.random() * related.length));
        // Pick once per visit.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const pick = related[index] ?? related[0];
    if (!pick) return null;
    const { study, shared } = pick;

    return (
        <Link className={classes.link} href={study.path} data-transition data-transition-label={study.client}>
            <span className={classes.label}>{label}</span>
            <span className={classes.title}>{study.client}</span>
            <span className={classes.meta}>
                {study.category} · {study.year}
            </span>
            {shared.length > 0 && (
                <span className={classes.tags}>
                    <span className="sr-only">Also tagged: </span>
                    {shared.map((tag) => (
                        <span key={tag} className={classes.tag}>
                            {tag}
                        </span>
                    ))}
                </span>
            )}
            <span className={classes.thumb}>
                <Image src={study.image} alt={study.imageAlt} width={2000} height={1375} sizes={sizes} />
            </span>
            <span className={classes.icon} aria-hidden={cta ? undefined : true}>
                {cta && <span>{cta}</span>}
                <Arrow />
            </span>
        </Link>
    );
}
