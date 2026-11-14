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

export const projects: Project[] = [
    {
        slug: "shipstack",
        title: "ShipStack",
        subtitle: "The all-in-one MVP launch toolkit for technical founders shipping their first product",
        tags: ["SaaS", "Startup Tools"],
        thumbnail: "/assets/images/work/6.jpg",
        heroImage: "/assets/images/work/6.jpg",
        year: "2025",
        client: "ShipStack Labs",
        role: "Product Designer + Brand Designer",
        tools: ["Figma", "Next.js", "Tailwind", "Framer"],
        overview:
            "ShipStack bundles everything a solo founder needs to go from idea to paying customers: landing page builder, waitlist manager, early-user analytics, and launch checklist — all in one opinionated toolkit designed to ship fast and learn faster.",
        problem: {
            headline: "Technical founders build products, not businesses",
            description:
                "Solo technical founders were spending 80% of their time on infrastructure, tooling, and integrations — with only 20% left for the customer conversations and iteration that actually matter.",
            points: [
                {
                    title: "Tool sprawl",
                    description:
                        "Founders stitched together 8–12 tools before writing a single line of product code."
                },
                {
                    title: "Validation theater",
                    description:
                        "\"Build first\" culture led to teams building for months before talking to a single customer."
                },
                {
                    title: "Launch paralysis",
                    description: "No clear framework for \"ready to launch\" caused indefinite pre-launch loops."
                }
            ]
        },
        research: {
            headline: "The solo founder's pre-launch experience",
            description:
                "Interviewed 40 technical founders who had launched (or attempted to launch) a product in the past 18 months.",
            methods: [
                {
                    number: "01",
                    title: "Founder Interviews",
                    description:
                        "40 in-depth sessions with technical solo founders and small teams about their launch journeys.",
                    stat: "40 founders"
                },
                {
                    number: "02",
                    title: "Tool Audit",
                    description:
                        "Audited the tech stacks of 80 early-stage startups to identify tool overlap and redundancy.",
                    stat: "80 stacks"
                },
                {
                    number: "03",
                    title: "Concept Validation",
                    description:
                        "3-day design sprint producing a clickable prototype tested with 25 target users before any code.",
                    stat: "25 testers"
                }
            ]
        },
        wireframeImages: [
            "/assets/images/slider/1.jpg",
            "/assets/images/slider/4.jpg",
            "/assets/images/slider/8.jpg"
        ],
        uiImages: [
            "/assets/images/services/saas-1.png",
            "/assets/images/services/saas-2.png",
            "/assets/images/services/web-2.png"
        ],
        designSystem: {
            colors: [
                { name: "Ship Black", hex: "#09090B" },
                { name: "Launch Orange", hex: "#F97316" },
                { name: "Zinc 200", hex: "#E4E4E7" },
                { name: "Green", hex: "#22C55E" },
                { name: "Zinc 600", hex: "#52525B" }
            ],
            fonts: [
                { name: "Inter Tight", sample: "Aa Bb Cc", usage: "Headlines" },
                { name: "Hauora", sample: "Aa Bb Cc", usage: "Body & descriptions" }
            ]
        },
        finalScreens: [
            "/assets/images/services/saas-1.png",
            "/assets/images/services/saas-2.png",
            "/assets/images/services/saas-3.png"
        ],
        outcomes: [
            { value: "10 days", metric: "Avg. time to launch", description: "From signup to live product" },
            { value: "5K+", metric: "Active builders", description: "Monthly active teams" },
            { value: "+89%", metric: "Completion rate", description: "Vs. DIY setup approach" },
            { value: "$1.2M", metric: "MRR milestone", description: "Reached in month 8" }
        ]
    }
];
