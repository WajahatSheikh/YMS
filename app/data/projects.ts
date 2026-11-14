export interface ProjectColor {
    name: string;
    hex: string;
}

export interface ProjectFont {
    name: string;
    sample: string;
    usage: string;
}

export interface ProjectOutcome {
    value: string;
    metric: string;
    description: string;
}

export interface Project {
    slug: string;
    title: string;
    subtitle: string;
    tags: string[];
    thumbnail: string;
    heroImage: string;
    year: string;
    client: string;
    role: string;
    tools: string[];
    overview: string;
    problem: {
        headline: string;
        description: string;
        points: Array<{ title: string; description: string }>;
    };
    research: {
        headline: string;
        description: string;
        methods: Array<{ number: string; title: string; description: string; stat: string }>;
    };
    wireframeImages: string[];
    uiImages: string[];
    designSystem: {
        colors: ProjectColor[];
        fonts: ProjectFont[];
    };
    finalScreens: string[];
    outcomes: ProjectOutcome[];
}

// Placeholder case studies (served by app/portfolio/[slug]). All of them were
// removed until their real case studies are ready; the art-directed studies
// live in their own folders under app/portfolio/.
export const projects: Project[] = [];
