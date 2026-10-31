import fs from "node:fs";
import nodePath from "node:path";
import type { Metadata } from "next";
import { projects, type Project } from "@/app/data/projects";
import { SITE } from "@/app/data/site";
import { notFound } from "next/navigation";
import CaseStudyContent from "./CaseStudyContent";

export async function generateStaticParams() {
    return projects.map((p) => ({ slug: p.slug }));
}

// Placeholder projects reference images that haven't been added to /public yet.
// Blank those paths at build time so the page renders a labelled placeholder
// (CaseImage) instead of a broken image and a failing /_next/image request.
const exists = (src: string) =>
    !!src && fs.existsSync(nodePath.join(process.cwd(), "public", decodeURIComponent(src)));

const withAvailableImages = (project: Project): Project => {
    const keep = (src: string) => (exists(src) ? src : "");
    return {
        ...project,
        thumbnail: keep(project.thumbnail),
        heroImage: keep(project.heroImage),
        wireframeImages: project.wireframeImages.map(keep),
        uiImages: project.uiImages.map(keep),
        finalScreens: project.finalScreens.map(keep)
    };
};

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
        openGraph: {
            type: "article",
            url: path,
            title: project.title,
            description: project.subtitle,
            // Setting openGraph here replaces the root one, so name the share image.
            images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: SITE.title }]
        },
        // These case studies are placeholder projects, so keep them out of the
        // index (and out of app/sitemap.ts) until real work replaces them.
        robots: { index: false, follow: true }
    };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const project = projects.find((p) => p.slug === slug);
    if (!project) notFound();

    return <CaseStudyContent project={withAvailableImages(project)} allProjects={projects.map(withAvailableImages)} />;
}
