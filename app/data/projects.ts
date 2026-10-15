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
        slug: "vibecart",
        title: "VibeCart",
        subtitle: "Social-first shopping app for Gen-Z that merges discovery with instant checkout",
        tags: ["Mobile App", "UI/UX"],
        thumbnail: "/assets/images/work/1.jpg",
        heroImage: "/assets/images/work/1.jpg",
        year: "2024",
        client: "VibeCart Inc.",
        role: "Lead Product Designer",
        tools: ["Figma", "Protopie", "React Native"],
        overview:
            "VibeCart reimagines mobile commerce for Gen-Z by blending short-form video discovery with a frictionless one-tap checkout. The challenge was designing an experience that felt like scrolling social media, not shopping — while still converting at scale.",
        problem: {
            headline: "Shopping apps feel like chores, not experiences",
            description:
                "Gen-Z users abandoned traditional e-commerce apps within 90 seconds. Existing platforms prioritized catalog browsing over discovery, resulting in high bounce rates and low session depth.",
            points: [
                {
                    title: "High abandonment rate",
                    description: "78% of users under 25 left shopping apps before reaching product detail pages."
                },
                {
                    title: "Discovery was broken",
                    description:
                        "Search-first UX doesn't match how Gen-Z discovers products — through creators and peer recommendations."
                },
                {
                    title: "Checkout friction",
                    description: "Average 7-step checkout funnel caused 64% cart abandonment at payment screens."
                }
            ]
        },
        research: {
            headline: "Deep-diving into Gen-Z buying behavior",
            description:
                "We ran three weeks of discovery research combining diary studies, in-app analytics analysis, and competitive teardowns.",
            methods: [
                {
                    number: "01",
                    title: "User Interviews",
                    description:
                        "24 in-depth sessions with users aged 18–26 to understand their social media-to-purchase journey.",
                    stat: "24 participants"
                },
                {
                    number: "02",
                    title: "Competitive Analysis",
                    description:
                        "Teardowns of TikTok Shop, Instagram Shopping, and SHEIN to identify UX patterns and gaps.",
                    stat: "6 platforms"
                },
                {
                    number: "03",
                    title: "Usability Testing",
                    description:
                        "Moderated prototype testing with 18 users across 3 design iterations using Maze and Protopie.",
                    stat: "18 test sessions"
                }
            ]
        },
        wireframeImages: [
            "/assets/images/slider/1.jpg",
            "/assets/images/slider/2.jpg",
            "/assets/images/slider/3.jpg"
        ],
        uiImages: [
            "/assets/images/services/mobile1.png",
            "/assets/images/services/web-1.png",
            "/assets/images/services/saas-1.png"
        ],
        designSystem: {
            colors: [
                { name: "Coral Punch", hex: "#FF4757" },
                { name: "Vibe Black", hex: "#0D0D0D" },
                { name: "Ghost White", hex: "#F8F8F8" },
                { name: "Neon Lime", hex: "#C3F53C" },
                { name: "Zinc 600", hex: "#52525B" }
            ],
            fonts: [
                { name: "Inter", sample: "Aa Bb Cc", usage: "Headlines & CTAs" },
                { name: "Hauora", sample: "Aa Bb Cc", usage: "Body & descriptions" }
            ]
        },
        finalScreens: [
            "/assets/images/services/mobile1.png",
            "/assets/images/services/mobile1.png",
            "/assets/images/services/mobile1.png"
        ],
        outcomes: [
            { value: "+340%", metric: "Session depth", description: "Average time in app per session" },
            { value: "4.8★", metric: "App Store rating", description: "Within 60 days of launch" },
            { value: "-68%", metric: "Cart abandonment", description: "Reduced via one-tap checkout" },
            { value: "2.1M", metric: "Downloads", description: "First 6 months post-launch" }
        ]
    },
    {
        slug: "fintrek-dashboard",
        title: "Fintrek",
        subtitle: "Real-time analytics dashboard for fintech startups managing multi-currency portfolios",
        tags: ["Web App", "SaaS"],
        thumbnail: "/assets/images/work/2.jpg",
        heroImage: "/assets/images/work/2.jpg",
        year: "2024",
        client: "Fintrek Labs",
        role: "UI/UX Designer + Framer Developer",
        tools: ["Figma", "Framer", "Storybook"],
        overview:
            "Fintrek needed a command-center dashboard for fintech operators juggling 10+ data streams. The product required dense information architecture without sacrificing usability — a delicate balance between data richness and cognitive load.",
        problem: {
            headline: "Data overload was killing decision-making speed",
            description:
                "Finance teams were context-switching between 5 different tools to get a single view of their portfolio. The result was 3-hour reporting cycles that should have taken minutes.",
            points: [
                {
                    title: "Fragmented data sources",
                    description: "Teams used 5+ tools daily with no unified view, causing critical reporting delays."
                },
                {
                    title: "Poor information hierarchy",
                    description:
                        "All metrics treated as equal priority, burying the signals that actually moved the needle."
                },
                {
                    title: "Zero mobile support",
                    description:
                        "C-suite executives needed mobile access for quick decisions but existing tools were desktop-only."
                }
            ]
        },
        research: {
            headline: "Understanding how finance teams actually work",
            description:
                "Embedded with 4 fintech ops teams over 2 weeks to map real workflows and identify where time was lost.",
            methods: [
                {
                    number: "01",
                    title: "Contextual Inquiry",
                    description:
                        "Shadowed 12 finance operators across 4 companies, documenting their daily workflows step-by-step.",
                    stat: "12 operators"
                },
                {
                    number: "02",
                    title: "Survey Research",
                    description:
                        "210-respondent survey targeting CFOs and financial analysts about their biggest pain points.",
                    stat: "210 responses"
                },
                {
                    number: "03",
                    title: "Card Sorting",
                    description:
                        "Open card sort with 20 participants to establish the mental model for information architecture.",
                    stat: "20 participants"
                }
            ]
        },
        wireframeImages: [
            "/assets/images/slider/4.jpg",
            "/assets/images/slider/5.jpg",
            "/assets/images/slider/6.jpg"
        ],
        uiImages: [
            "/assets/images/services/saas-1.png",
            "/assets/images/services/saas-2.png",
            "/assets/images/services/saas-3.png"
        ],
        designSystem: {
            colors: [
                { name: "Midnight Blue", hex: "#0F1729" },
                { name: "Sapphire", hex: "#2563EB" },
                { name: "Emerald", hex: "#10B981" },
                { name: "Ash Gray", hex: "#9CA3AF" },
                { name: "Snow", hex: "#F9FAFB" }
            ],
            fonts: [
                { name: "IBM Plex Mono", sample: "Aa Bb Cc", usage: "Data labels & metrics" },
                { name: "Inter", sample: "Aa Bb Cc", usage: "UI & navigation" }
            ]
        },
        finalScreens: [
            "/assets/images/services/saas-1.png",
            "/assets/images/services/saas-2.png",
            "/assets/images/services/saas-3.png"
        ],
        outcomes: [
            { value: "87%", metric: "Faster reporting", description: "Time-to-insight reduced dramatically" },
            { value: "+52%", metric: "User retention", description: "Monthly active users after redesign" },
            { value: "$2.4M", metric: "ARR growth", description: "Attributed to improved onboarding UX" },
            { value: "9.1", metric: "NPS Score", description: "Net promoter score post-launch" }
        ]
    },
    {
        slug: "novabuild",
        title: "NovaBuild",
        subtitle: "AI-powered no-code landing page builder that writes copy and generates layouts instantly",
        tags: ["SaaS", "AI Platform"],
        thumbnail: "/assets/images/work/3.jpg",
        heroImage: "/assets/images/work/3.jpg",
        year: "2025",
        client: "Nova Systems",
        role: "Product Designer",
        tools: ["Figma", "Spline", "Webflow"],
        overview:
            "NovaBuild lets non-technical founders ship landing pages in under 10 minutes using AI to generate copy, layouts, and assets. The design challenge was making a technically complex AI product feel effortlessly simple.",
        problem: {
            headline: "Founders waste weeks on pages that should take hours",
            description:
                "Non-technical founders were spending 2–4 weeks on landing pages — iterating with freelancers, waiting on feedback loops, and still launching with mediocre conversion rates.",
            points: [
                {
                    title: "Slow iteration cycles",
                    description:
                        "Average time from idea to live page was 18 days. Competitors were launching and validating faster."
                },
                {
                    title: "High outsourcing cost",
                    description: "Founders spent $2,000–$8,000 per landing page on design and copywriting agencies."
                },
                {
                    title: "Template fatigue",
                    description:
                        "Existing tools offered templates that all looked the same — impossible to stand out in crowded markets."
                }
            ]
        },
        research: {
            headline: "Mapping the founder's go-to-market struggle",
            description:
                "Interviewed 30 startup founders who had shipped at least one landing page in the past year, focusing on where the process broke down.",
            methods: [
                {
                    number: "01",
                    title: "Founder Interviews",
                    description:
                        "30 structured interviews with B2B and B2C founders to map the page-building journey end-to-end.",
                    stat: "30 founders"
                },
                {
                    number: "02",
                    title: "Jobs-to-be-Done",
                    description:
                        "JTBD framework applied to identify the core functional, emotional, and social jobs being hired for.",
                    stat: "8 core jobs"
                },
                {
                    number: "03",
                    title: "A/B Concept Testing",
                    description:
                        "Ran 3 concept prototypes with 45 target users to validate the AI-first interaction model.",
                    stat: "45 testers"
                }
            ]
        },
        wireframeImages: [
            "/assets/images/slider/7.jpg",
            "/assets/images/slider/8.jpg",
            "/assets/images/slider/1.jpg"
        ],
        uiImages: [
            "/assets/images/services/web-1.png",
            "/assets/images/services/web-2.png",
            "/assets/images/services/web-3.png"
        ],
        designSystem: {
            colors: [
                { name: "Deep Void", hex: "#08080C" },
                { name: "Electric Violet", hex: "#7C3AED" },
                { name: "Nova Cyan", hex: "#06B6D4" },
                { name: "Neutral 400", hex: "#A3A3A3" },
                { name: "Pure White", hex: "#FFFFFF" }
            ],
            fonts: [
                { name: "Inter Tight", sample: "Aa Bb Cc", usage: "Headlines & feature titles" },
                { name: "Open Sauce Sans", sample: "Aa Bb Cc", usage: "Body & UI copy" }
            ]
        },
        finalScreens: [
            "/assets/images/services/web-1.png",
            "/assets/images/services/web-2.png",
            "/assets/images/services/web-3.png"
        ],
        outcomes: [
            { value: "8 min", metric: "Time to page", description: "Average page creation time" },
            { value: "+41%", metric: "Conversion lift", description: "Avg. vs. hand-built pages" },
            { value: "12K", metric: "Beta signups", description: "In first 30 days post-launch" },
            { value: "4.9★", metric: "ProductHunt", description: "#1 Product of the Day" }
        ]
    },
    {
        slug: "pulsehealth",
        title: "PulseHealth",
        subtitle: "Holistic wellness tracking app combining wearable data with AI-driven habit coaching",
        tags: ["Mobile App", "Healthcare"],
        thumbnail: "/assets/images/work/4.jpg",
        heroImage: "/assets/images/work/4.jpg",
        year: "2024",
        client: "Pulse Wellness Co.",
        role: "Senior Product Designer",
        tools: ["Figma", "ProtoPie", "Swift UI"],
        overview:
            "PulseHealth bridges the gap between wearable data and actionable wellness habits. The product aggregates data from 8+ devices and surfaces personalized nudges — designed for busy professionals who want better health outcomes without health-app overwhelm.",
        problem: {
            headline: "Wellness apps collect data but don't change behavior",
            description:
                "Users had more health data than ever but didn't know what to do with it. 71% of wearable owners stopped checking their health apps within 3 months of purchase.",
            points: [
                {
                    title: "Data without meaning",
                    description:
                        "Apps showed raw metrics (steps, HRV, calories) but never translated them into clear actions."
                },
                {
                    title: "Notification fatigue",
                    description:
                        "Users received 30+ health notifications daily — all treated as equal priority, all ignored."
                },
                {
                    title: "One-size-fits-all",
                    description:
                        "Generic health recommendations didn't account for individual lifestyle, stress, or goals."
                }
            ]
        },
        research: {
            headline: "Understanding the wellness intention-action gap",
            description:
                "8 weeks of mixed-method research combining quantitative usage data with qualitative diary studies to understand why people quit.",
            methods: [
                {
                    number: "01",
                    title: "Diary Studies",
                    description:
                        "16 participants tracked their daily health app interactions over 3 weeks to reveal true behavior.",
                    stat: "16 participants"
                },
                {
                    number: "02",
                    title: "Behavioral Analytics",
                    description:
                        "Analyzed anonymized session data from 50,000 users of competing apps to identify drop-off patterns.",
                    stat: "50K sessions"
                },
                {
                    number: "03",
                    title: "Expert Interviews",
                    description:
                        "Conducted sessions with 8 health coaches and 4 behavioral scientists to inform the habit system.",
                    stat: "12 experts"
                }
            ]
        },
        wireframeImages: [
            "/assets/images/slider/2.jpg",
            "/assets/images/slider/4.jpg",
            "/assets/images/slider/6.jpg"
        ],
        uiImages: [
            "/assets/images/services/mobile1.png",
            "/assets/images/services/saas-2.png",
            "/assets/images/services/web-3.png"
        ],
        designSystem: {
            colors: [
                { name: "Forest Deep", hex: "#052E16" },
                { name: "Mint Green", hex: "#34D399" },
                { name: "Warm Sand", hex: "#FEF3C7" },
                { name: "Coral", hex: "#F97316" },
                { name: "Charcoal", hex: "#1C1C1E" }
            ],
            fonts: [
                { name: "Inter", sample: "Aa Bb Cc", usage: "UI & body text" },
                { name: "Hauora", sample: "Aa Bb Cc", usage: "Metrics & values" }
            ]
        },
        finalScreens: [
            "/assets/images/services/mobile1.png",
            "/assets/images/services/mobile1.png",
            "/assets/images/services/mobile1.png"
        ],
        outcomes: [
            { value: "73%", metric: "30-day retention", description: "Up from 29% industry average" },
            { value: "+2.4x", metric: "Goal completion", description: "Weekly habit completion rate" },
            { value: "150K", metric: "Active users", description: "Month 4 after soft launch" },
            { value: "4.7★", metric: "App Store", description: "Healthcare category, 8K+ reviews" }
        ]
    },
    {
        slug: "layerflow",
        title: "LayerFlow",
        subtitle: "Real-time design collaboration platform built for distributed product teams",
        tags: ["Web App", "Design Tool"],
        thumbnail: "/assets/images/work/5.jpg",
        heroImage: "/assets/images/work/5.jpg",
        year: "2025",
        client: "LayerFlow Inc.",
        role: "UX Lead & Design Systems",
        tools: ["Figma", "React", "Storybook", "Lottie"],
        overview:
            "LayerFlow is a Figma-adjacent tool purpose-built for design handoff and async feedback in remote-first companies. It bridges the communication gap between designers, PMs, and engineers without requiring everyone to be in a Figma file.",
        problem: {
            headline: "Design handoff is still broken for remote teams",
            description:
                "Despite tools like Figma and Zeplin, 68% of developers reported receiving incomplete or confusing design specs. The review-to-dev handoff cycle averaged 4 days per feature.",
            points: [
                {
                    title: "Lost context in handoff",
                    description: "Design decisions, rationale, and edge cases were lost between review and development."
                },
                {
                    title: "Version confusion",
                    description:
                        "Teams were building from outdated designs because there was no clear version source of truth."
                },
                {
                    title: "Feedback loops were slow",
                    description:
                        "Getting sign-off from stakeholders across timezones added days of latency to every sprint."
                }
            ]
        },
        research: {
            headline: "Mapping the design-dev handoff breakdown",
            description:
                "Surveyed 400+ product teams and ran 22 moderated research sessions to pinpoint exactly where the handoff process failed.",
            methods: [
                {
                    number: "01",
                    title: "Team Surveys",
                    description: "400+ responses from product designers, engineers, and PMs at remote-first companies.",
                    stat: "400+ responses"
                },
                {
                    number: "02",
                    title: "Process Mapping",
                    description:
                        "Facilitated 8 process-mapping workshops with cross-functional teams to visualize real workflows.",
                    stat: "8 workshops"
                },
                {
                    number: "03",
                    title: "Prototype Testing",
                    description:
                        "22 moderated sessions testing 4 interaction models for the async feedback and spec systems.",
                    stat: "22 sessions"
                }
            ]
        },
        wireframeImages: [
            "/assets/images/slider/3.jpg",
            "/assets/images/slider/5.jpg",
            "/assets/images/slider/7.jpg"
        ],
        uiImages: [
            "/assets/images/services/web-1.png",
            "/assets/images/services/saas-1.png",
            "/assets/images/services/saas-3.png"
        ],
        designSystem: {
            colors: [
                { name: "Canvas Dark", hex: "#111118" },
                { name: "Brand Purple", hex: "#6366F1" },
                { name: "Slate 300", hex: "#CBD5E1" },
                { name: "Amber", hex: "#F59E0B" },
                { name: "Surface", hex: "#1E1E2E" }
            ],
            fonts: [
                { name: "Inter", sample: "Aa Bb Cc", usage: "All UI text" },
                { name: "IBM Plex Mono", sample: "Aa Bb Cc", usage: "Code & specs" }
            ]
        },
        finalScreens: [
            "/assets/images/services/web-1.png",
            "/assets/images/services/web-2.png",
            "/assets/images/services/web-3.png"
        ],
        outcomes: [
            { value: "-62%", metric: "Handoff time", description: "Spec-to-dev cycle reduced" },
            { value: "3.2x", metric: "Review speed", description: "Async feedback loop improvement" },
            { value: "8K", metric: "Teams onboarded", description: "Within 90 days of launch" },
            { value: "96%", metric: "Satisfaction", description: "Designer + dev post-survey" }
        ]
    },
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
