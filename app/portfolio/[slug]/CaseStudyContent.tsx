"use client";

import Image from "next/image";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import RelatedProjects from "@/app/Components/CaseStudy/RelatedProjects/RelatedProjects";
import { Project } from "@/app/data/projects";
import style from "./index.module.scss";

gsap.registerPlugin(ScrollTrigger);

interface Props {
    project: Project;
    allProjects: Project[];
}

export default function CaseStudyContent({ project, allProjects }: Props) {
    const pageRef = useRef<HTMLElement>(null);
    const heroRef = useRef<HTMLDivElement>(null);

    // Hero entrance animation on mount
    useEffect(() => {
        if (!heroRef.current) return;
        const els = heroRef.current.querySelectorAll("[data-hero]");
        gsap.from(els, {
            opacity: 0,
            y: 32,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            delay: 0.25,
            clearProps: "all"
        });
    }, []);

    // Scroll-reveal for all content sections
    useGSAP(
        () => {
            const reveals = pageRef.current?.querySelectorAll("[data-reveal]") ?? [];
            reveals.forEach((el) => {
                gsap.from(el, {
                    opacity: 0,
                    y: 40,
                    duration: 0.75,
                    ease: "power3.out",
                    clearProps: "all",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 88%",
                        toggleActions: "play none none none"
                    }
                });
            });

            const staggerGroups = pageRef.current?.querySelectorAll("[data-stagger-group]") ?? [];
            staggerGroups.forEach((group) => {
                const children = group.querySelectorAll("[data-stagger-item]");
                gsap.from(children, {
                    opacity: 0,
                    y: 36,
                    duration: 0.7,
                    ease: "power3.out",
                    stagger: 0.12,
                    clearProps: "all",
                    scrollTrigger: {
                        trigger: group,
                        start: "top 85%",
                        toggleActions: "play none none none"
                    }
                });
            });
        },
        { scope: pageRef }
    );

    return (
        <main id="main" ref={pageRef} className={style.page}>
            {/* ══════════════════════════════ HERO ══════════════════════════════ */}
            <div className={style.hero} ref={heroRef}>
                <div className={style.container}>
                    <div className={style.heroGrid}>
                        {/* Left: content */}
                        <div className={style.heroLeft}>
                            <div className={style.heroTags} data-hero>
                                {project.tags.map((tag) => (
                                    <span key={tag} className={style.pill}>
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <h1 className={style.heroTitle} data-hero>
                                {project.title}
                            </h1>

                            <p className={style.heroSub} data-hero>
                                {project.subtitle}
                            </p>

                            <div className={style.heroMeta} data-hero>
                                <div className={style.metaItem}>
                                    <span className={style.metaLabel}>Client</span>
                                    <span className={style.metaValue}>{project.client}</span>
                                </div>
                                <div className={style.metaItem}>
                                    <span className={style.metaLabel}>Year</span>
                                    <span className={style.metaValue}>{project.year}</span>
                                </div>
                                <div className={style.metaItem}>
                                    <span className={style.metaLabel}>Role</span>
                                    <span className={style.metaValue}>{project.role}</span>
                                </div>
                                <div className={style.metaItem}>
                                    <span className={style.metaLabel}>Tools</span>
                                    <span className={style.metaValue}>{project.tools.join(" · ")}</span>
                                </div>
                            </div>
                        </div>

                        {/* Right: hero image */}
                        <div className={style.heroRight} data-hero>
                            <div className={style.heroImageWrap}>
                                <Image
                                    src={project.heroImage}
                                    alt={project.title}
                                    width={820}
                                    height={560}
                                    className={style.heroImg}
                                    priority
                                />
                                <div className={style.heroImgOverlay} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ══════════════════════════════ OVERVIEW ══════════════════════════════ */}
            <div className={style.section}>
                <div className={style.container}>
                    <div className={style.overviewGrid}>
                        <div className={style.overviewText}>
                            <span className={style.sectionLabel} data-reveal>
                                Project Overview
                            </span>
                            <h2 className={style.sectionTitle} data-reveal>
                                What we set out to build
                            </h2>
                            <p className={style.body} data-reveal>
                                {project.overview}
                            </p>
                        </div>
                        <div className={style.overviewStats} data-stagger-group>
                            {[
                                { label: "Client", value: project.client },
                                { label: "Year", value: project.year },
                                { label: "Role", value: project.role },
                                { label: "Stack", value: project.tools.slice(0, 2).join(", ") }
                            ].map((item) => (
                                <div key={item.label} className={style.statCard} data-stagger-item>
                                    <span className={style.statLabel}>{item.label}</span>
                                    <span className={style.statValue}>{item.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* ══════════════════════════════ PROBLEM ══════════════════════════════ */}
            <div className={`${style.section} ${style.sectionAlt}`}>
                <div className={style.container}>
                    <div className={style.problemHead}>
                        <span className={style.sectionLabel} data-reveal>
                            Problem Statement
                        </span>
                        <h2 className={`${style.sectionTitle} ${style.sectionTitleLg}`} data-reveal>
                            {project.problem.headline}
                        </h2>
                        <p className={`${style.body} ${style.bodyWide}`} data-reveal>
                            {project.problem.description}
                        </p>
                    </div>
                    <div className={style.problemGrid} data-stagger-group>
                        {project.problem.points.map((point, i) => (
                            <div key={i} className={style.problemCard} data-stagger-item>
                                <span className={style.problemNum}>0{i + 1}</span>
                                <h4 className={style.problemTitle}>{point.title}</h4>
                                <p className={style.problemDesc}>{point.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ══════════════════════════════ RESEARCH ══════════════════════════════ */}
            <div className={style.section}>
                <div className={style.container}>
                    <div className={style.researchHead}>
                        <span className={style.sectionLabel} data-reveal>
                            Research Process
                        </span>
                        <h2 className={style.sectionTitle} data-reveal>
                            {project.research.headline}
                        </h2>
                        <p className={`${style.body} ${style.bodyWide}`} data-reveal>
                            {project.research.description}
                        </p>
                    </div>
                    <div className={style.researchGrid} data-stagger-group>
                        {project.research.methods.map((method) => (
                            <div key={method.number} className={style.researchCard} data-stagger-item>
                                <span className={style.researchNum}>{method.number}</span>
                                <h4 className={style.researchTitle}>{method.title}</h4>
                                <p className={style.researchDesc}>{method.description}</p>
                                <span className={style.researchStat}>{method.stat}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ══════════════════════════════ WIREFRAMES ══════════════════════════════ */}
            <div className={`${style.section} ${style.sectionAlt}`}>
                <div className={style.container}>
                    <span className={style.sectionLabel} data-reveal>
                        Wireframes
                    </span>
                    <h2 className={style.sectionTitle} data-reveal>
                        From sketches to structure
                    </h2>
                    <div className={style.wireGrid} data-stagger-group>
                        {project.wireframeImages.map((src, i) => (
                            <div key={i} className={style.wireCard} data-stagger-item>
                                <Image
                                    src={src}
                                    alt={`Wireframe ${i + 1}`}
                                    width={480}
                                    height={320}
                                    className={style.wireImg}
                                />
                                <span className={style.wireLabel}>Frame {String(i + 1).padStart(2, "0")}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ══════════════════════════════ UI SHOWCASE ══════════════════════════════ */}
            <div className={style.section}>
                <div className={style.container}>
                    <span className={style.sectionLabel} data-reveal>
                        UI Design
                    </span>
                    <h2 className={style.sectionTitle} data-reveal>
                        High-fidelity screens
                    </h2>
                    <div className={style.uiGrid} data-stagger-group>
                        {project.uiImages.map((src, i) => (
                            <div key={i} className={style.uiCard} data-stagger-item>
                                <Image
                                    src={src}
                                    alt={`UI Screen ${i + 1}`}
                                    width={520}
                                    height={400}
                                    className={style.uiImg}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ══════════════════════════════ DESIGN SYSTEM ══════════════════════════════ */}
            <div className={`${style.section} ${style.sectionAlt}`}>
                <div className={style.container}>
                    <span className={style.sectionLabel} data-reveal>
                        Design System
                    </span>
                    <h2 className={style.sectionTitle} data-reveal>
                        Colours &amp; typography
                    </h2>

                    <div className={style.dsGrid}>
                        {/* Colors */}
                        <div data-reveal>
                            <p className={style.dsSubLabel}>Color palette</p>
                            <div className={style.colorRow}>
                                {project.designSystem.colors.map((c) => (
                                    <div key={c.hex} className={style.colorSwatch}>
                                        <div
                                            className={style.swatchCircle}
                                            style={{ background: c.hex }}
                                        />
                                        <span className={style.swatchName}>{c.name}</span>
                                        <span className={style.swatchHex}>{c.hex}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Fonts */}
                        <div data-reveal>
                            <p className={style.dsSubLabel}>Typography</p>
                            <div className={style.fontRow}>
                                {project.designSystem.fonts.map((f) => (
                                    <div key={f.name} className={style.fontCard}>
                                        <span className={style.fontSample}>{f.sample}</span>
                                        <span className={style.fontName}>{f.name}</span>
                                        <span className={style.fontUsage}>{f.usage}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ══════════════════════════════ FINAL SCREENS ══════════════════════════════ */}
            <div className={style.section}>
                <div className={style.container}>
                    <span className={style.sectionLabel} data-reveal>
                        Final Delivery
                    </span>
                    <h2 className={style.sectionTitle} data-reveal>
                        Production-ready screens
                    </h2>
                    <div className={style.screensGrid} data-stagger-group>
                        {project.finalScreens.map((src, i) => (
                            <div key={i} className={style.screenCard} data-stagger-item>
                                <Image
                                    src={src}
                                    alt={`Final Screen ${i + 1}`}
                                    width={400}
                                    height={520}
                                    className={style.screenImg}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ══════════════════════════════ OUTCOMES ══════════════════════════════ */}
            <div className={`${style.section} ${style.outcomesSection}`}>
                <div className={style.container}>
                    <span className={style.sectionLabel} data-reveal>
                        Results
                    </span>
                    <h2 className={style.sectionTitle} data-reveal>
                        Outcomes &amp; impact
                    </h2>
                    <div className={style.outcomesGrid} data-stagger-group>
                        {project.outcomes.map((o, i) => (
                            <div key={i} className={style.outcomeCard} data-stagger-item>
                                <span className={style.outcomeValue}>{o.value}</span>
                                <span className={style.outcomeMetric}>{o.metric}</span>
                                <p className={style.outcomeDesc}>{o.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ══════════════════════════════ RELATED ══════════════════════════════ */}
            <div className={style.container}>
                <RelatedProjects currentSlug={project.slug} allProjects={allProjects} />
            </div>
        </main>
    );
}
