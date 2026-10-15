import type { Metadata } from "next";
import { projects } from "@/app/data/projects";
import { notFound } from "next/navigation";
import CaseStudyContent from "./CaseStudyContent";

export async function generateStaticParams() {
    return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const project = projects.find((p) => p.slug === slug);
    if (!project) return {};
    const path = `/portfolio/${project.slug}`;
    return {
        // The root layout's title template appends "| YourMomStudio".
        title: `${project.title} case study`,
        description: project.subtitle,
        alternates: { canonical: path },
        openGraph: { type: "article", url: path, title: project.title, description: project.subtitle },
        // These case studies are placeholder projects, so keep them out of the
        // index (and out of app/sitemap.ts) until real work replaces them.
        robots: { index: false, follow: true }
    };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const project = projects.find((p) => p.slug === slug);
    if (!project) notFound();

    return <CaseStudyContent project={project} allProjects={projects} />;
}
