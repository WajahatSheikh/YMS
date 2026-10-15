"use client";

import { useEffect, useRef } from "react";
import style from "./index.module.scss";

// 10 · About — Figma node 144:1860 (1920×1109)
//
// Three stacked blocks inside a 1280 content band: the statement, the three
// discipline cards, and the three principle cards.
//
// Principle Card note (171:430): "How-we-work card, glass on dark. Hover: brand
// border, warm tint, lift + brand glow. Both variants are exactly the same
// height — a hover must never reflow the row." That last line is why the hover
// only moves colour and transform, never padding or size.

interface Discipline {
    title: string;
    remit: string;
    skills: string[];
    icon: React.ReactNode;
}

const SparklesIcon = (
    <path
        d="M8.28083 12.9167C8.20643 12.6283 8.05612 12.3651 7.84551 12.1545C7.63491 11.9439 7.37173 11.7936 7.08333 11.7192L1.97083 10.4008C1.88361 10.3761 1.80684 10.3235 1.75218 10.2512C1.69751 10.1789 1.66794 10.0907 1.66794 10C1.66794 9.90933 1.69751 9.82113 1.75218 9.7488C1.80684 9.67646 1.88361 9.62392 1.97083 9.59917L7.08333 8.28C7.37162 8.20567 7.63474 8.05548 7.84533 7.84503C8.05593 7.63459 8.2063 7.37157 8.28083 7.08333L9.59917 1.97083C9.62367 1.88327 9.67615 1.80612 9.7486 1.75116C9.82105 1.69621 9.90948 1.66646 10.0004 1.66646C10.0913 1.66646 10.1798 1.69621 10.2522 1.75116C10.3247 1.80612 10.3772 1.88327 10.4017 1.97083L11.7192 7.08333C11.7936 7.37173 11.9439 7.63491 12.1545 7.84552C12.3651 8.05612 12.6283 8.20644 12.9167 8.28083L18.0292 9.59833C18.1171 9.62258 18.1946 9.67501 18.2499 9.74756C18.3051 9.82012 18.335 9.9088 18.335 10C18.335 10.0912 18.3051 10.1799 18.2499 10.2524C18.1946 10.325 18.1171 10.3774 18.0292 10.4017L12.9167 11.7192C12.6283 11.7936 12.3651 11.9439 12.1545 12.1545C11.9439 12.3651 11.7936 12.6283 11.7192 12.9167L10.4008 18.0292C10.3763 18.1167 10.3238 18.1939 10.2514 18.2488C10.179 18.3038 10.0905 18.3335 9.99958 18.3335C9.90865 18.3335 9.82021 18.3038 9.74777 18.2488C9.67532 18.1939 9.62284 18.1167 9.59833 18.0292L8.28083 12.9167Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
    />
);

const CodeIcon = (
    <>
        <path
            d="M13.3333 15L18.3333 10L13.3333 5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M6.66667 5L1.66667 10L6.66667 15"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </>
);

const RocketIcon = (
    <>
        <path
            d="M3.75 13.75C2.5 14.8 2.08333 17.9167 2.08333 17.9167C2.08333 17.9167 5.2 17.5 6.25 16.25C6.84167 15.55 6.83333 14.475 6.175 13.825C5.84176 13.5263 5.41 13.3612 4.9625 13.3612C4.515 13.3612 4.08324 13.5263 3.75 13.825V13.75Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M10 12.5L7.5 10C7.94345 8.84952 8.50184 7.74672 9.16667 6.70833C10.1377 5.15582 11.4897 3.87754 13.0942 2.99508C14.6986 2.11261 16.5022 1.65531 18.3333 1.66667C18.3333 3.93333 17.6833 7.91667 13.3333 10.8333C12.2807 11.4989 11.164 12.0573 10 12.5Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M7.5 10H3.33333C3.33333 10 3.79167 7.475 5 6.66667C6.35 5.76667 9.16667 6.66667 9.16667 6.66667"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M10 12.5V16.6667C10 16.6667 12.525 16.2083 13.3333 15C14.2333 13.65 13.3333 10.8333 13.3333 10.8333"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </>
);

const DISCIPLINES: Discipline[] = [
    {
        title: "Design",
        remit: "From the first sketch to a system your developers can build from.",
        skills: [
            "Product design",
            "UX research",
            "Design systems",
            "Prototyping",
            "Brand identity",
            "Motion & Rive"
        ],
        icon: SparklesIcon
    },
    {
        title: "Engineering",
        remit: "Typed, tested and deployed — not a prototype held together with hope.",
        skills: ["React & Next.js", "TypeScript", "Node.js", "Supabase", "APIs & integrations", "CI/CD"],
        icon: CodeIcon
    },
    {
        title: "Delivery",
        remit: "Sprints, QA and releases that land on a Friday, not someday.",
        skills: ["Sprint planning", "QA & automation", "Release management", "Analytics", "Shared Slack"],
        icon: RocketIcon
    }
];

const PRINCIPLES = [
    {
        index: "01",
        title: "We ship weekly, not eventually.",
        body: "Every Friday there is something live to click. Visible progress beats a status report."
    },
    {
        index: "02",
        title: "One team, start to finish.",
        body: "The people who design it are the people who build it. Nothing gets lost in a handoff."
    },
    {
        index: "03",
        title: "You own all of it.",
        body: "Every file and every repository, from day one. No lock-in and nothing to buy out."
    }
];

const AboutSection = () => {
    const sectionRef = useRef<HTMLElement>(null);

    // Everything that animates carries data-reveal; one observer promotes each
    // element as it arrives. Per element rather than per section so the cascade
    // follows the scroll instead of firing the whole section at once.
    useEffect(() => {
        const root = sectionRef.current;
        if (!root) return;

        const items = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]"));

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            items.forEach((el) => el.setAttribute("data-reveal", "in"));
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.setAttribute("data-reveal", "in");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.2, rootMargin: "0px 0px -8% 0px" }
        );

        items.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    return (
        <section id="about" ref={sectionRef} className={style.section}>
            {/* Statement */}
            <div className={style.statement}>
                <p className={style.eyebrow} data-reveal="">
                    Who we are
                </p>
                <h2 className={style.heading} data-reveal="">
                    Founders bring us an idea. They leave with a product in production.
                </h2>
                <p className={style.lead} data-reveal="">
                    Yourmomstudio builds first versions — SaaS platforms, mobile apps, web products, ecommerce and
                    game interfaces. Design, engineering and QA in one subscription, from the first sketch to launch
                    day.
                </p>
            </div>

            {/* Capabilities */}
            <div className={style.capabilities}>
                <p className={style.eyebrow} data-reveal="">
                    What the team actually does
                </p>

                <ul className={style.cardRow}>
                    {DISCIPLINES.map((discipline, index) => (
                        <li
                            key={discipline.title}
                            className={style.discipline}
                            data-reveal=""
                            style={{ "--i": index } as React.CSSProperties}
                        >
                            <div className={style.head}>
                                <svg className={style.icon} viewBox="0 0 20 20" fill="none" aria-hidden="true">
                                    {discipline.icon}
                                </svg>
                                <h3 className={style.cardTitle}>{discipline.title}</h3>
                            </div>

                            <p className={style.remit}>{discipline.remit}</p>
                            <div className={style.divider} aria-hidden="true" />

                            <ul className={style.skills}>
                                {discipline.skills.map((skill, skillIndex) => (
                                    <li
                                        key={skill}
                                        className={style.skill}
                                        style={{ "--j": skillIndex } as React.CSSProperties}
                                    >
                                        {skill}
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Principles */}
            <ul className={style.cardRow}>
                {PRINCIPLES.map((principle, index) => (
                    <li
                        key={principle.index}
                        className={style.principle}
                        data-reveal=""
                        style={{ "--i": index } as React.CSSProperties}
                    >
                        <p className={style.principleIndex} aria-hidden="true">
                            {principle.index}
                        </p>
                        <h3 className={style.principleTitle}>{principle.title}</h3>
                        <p className={style.principleBody}>{principle.body}</p>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default AboutSection;
