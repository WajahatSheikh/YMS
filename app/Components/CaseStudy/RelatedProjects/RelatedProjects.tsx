"use client";
import Image from "next/image";
import { useMemo } from "react";
import { usePageTransition } from "@/app/contexts/PageTransitionContext";
import { Project } from "@/app/data/projects";
import style from "./index.module.scss";

interface RelatedProjectsProps {
    currentSlug: string;
    allProjects: Project[];
}

const RelatedProjects = ({ currentSlug, allProjects }: RelatedProjectsProps) => {
    const { navigateTo } = usePageTransition();

    const related = useMemo(() => {
        const others = allProjects.filter((p) => p.slug !== currentSlug);
        // Pick 2 random but deterministic entries based on current slug index
        const idx = allProjects.findIndex((p) => p.slug === currentSlug);
        const a = others[(idx) % others.length];
        const b = others[(idx + 2) % others.length];
        return [a, b].filter(Boolean);
    }, [currentSlug, allProjects]);

    return (
        <div className={style.related}>
            <div className={style.inner}>
                <div className={style.heading}>
                    <span className={style.label}>More Work</span>
                    <h2>Related Projects</h2>
                </div>

                <div className={style.grid}>
                    {related.map((project) => (
                        <div key={project.slug} className={style.card}>
                            <div className={style.thumb}>
                                <Image
                                    src={project.thumbnail}
                                    alt={project.title}
                                    width={680}
                                    height={460}
                                    className={style.img}
                                />
                                <div className={style.overlay} />
                            </div>
                            <div className={style.cardContent}>
                                <div className={style.tags}>
                                    {project.tags.map((tag) => (
                                        <span key={tag} className={style.tag}>
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <h3>{project.title}</h3>
                                <p>{project.subtitle}</p>
                                <button
                                    className={`${style.cta} button button--calypso`}
                                    onClick={() => navigateTo(`/portfolio/${project.slug}`, project.title)}
                                >
                                    <span>View Case Study</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RelatedProjects;
