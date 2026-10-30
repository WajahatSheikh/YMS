// Services content. Rendered by the Services accordion and the /services pages,
// and reused by the Service / OfferCatalog structured data and llms.txt.

export interface Service {
    title: string;
    /** URL segment of the service page: /services/<slug>. */
    slug: string;
    /** <title> (before "| YourMomStudio") and H1, plus the meta description (~155 chars), of the service page. */
    seo: { title: string; description: string };
    // Short category badge shown beside the title.
    label?: string;
    description: string;
    tags: string[];
    image?: string;
    // A looping reel shown instead of the still. Plays only while its card is open.
    video?: { src: string; poster: string };
}

// Product Design, Websites and Brand Identity carry client-supplied copy. The
// copy for the other four rows is written to match that voice and should be
// reviewed by whoever owns the content.
export const SERVICES: Service[] = [
    {
        title: "Product Design",
        slug: "product-design",
        seo: {
            title: "Product design agency for startups and MVPs",
            description:
                "Product design for funded startups: UI and UX, MVP and prototype design, design systems and usability testing, delivered dev-ready by one team."
        },
        description:
            "Most design agencies hand you files. We hand you products. We sit inside your workflow, work with your engineers, and ship interfaces that are dev-ready on delivery, not “almost there, just needs a few tweaks.” From early MVP through scaled product, what we ship is what your users see.",
        tags: [
            "UI & UX design",
            "MVP & prototype design",
            "Design systems & component libraries",
            "User flows & wireframing",
            "Mobile & responsive design",
            "Usability testing & iteration"
        ],
        video: {
            src: "/assets/videos/services/pd-reel.mp4",
            poster: "/assets/images/services/pd-reel-poster.webp"
        }
    },
    {
        title: "Websites",
        slug: "websites",
        seo: {
            title: "Website design and development for startups",
            description:
                "Marketing sites, landing pages and replatforms designed and built by one team, on Webflow, Framer or custom code, with SEO-ready structure."
        },
        description:
            "We’ve shipped 50+ sites, from first launches to full rebrands and replatforms. Designed and built by one team, no handoff, no waiting on dev, no round-tripping between Figma and Slack. The site goes live looking exactly like it looked in the comp.",
        tags: [
            "Marketing & company websites",
            "Landing pages & campaign sites",
            "Webflow & Framer development",
            "CMS setup & content architecture",
            "SEO-ready page structure",
            "Responsive & mobile-first design"
        ],
        video: {
            src: "/assets/videos/services/websites-reel.mp4",
            poster: "/assets/images/services/websites-reel-poster.webp"
        }
    },
    {
        title: "Mobile App",
        slug: "mobile-app",
        seo: {
            title: "Mobile app design and development (iOS and Android)",
            description:
                "iOS and Android apps designed and built by one team, from onboarding and user flows to cross-platform development and App Store launch."
        },
        label: "iOS & Android",
        description:
            "Great apps feel obvious to use, and that takes a lot of work behind the scenes. We design and build mobile apps around how people actually use their phones: one thumb, half a minute, zero patience. From first idea to App Store launch, you get one team that owns the whole thing, so what we design is exactly what ships.",
        tags: [
            "iOS & Android app design",
            "Cross-platform development (React Native / Flutter)",
            "Onboarding & user flow design",
            "App Store & Play Store launch support",
            "Push notifications, payments & third-party integrations",
            "Post-launch updates & performance tuning"
        ],
        video: {
            src: "/assets/videos/services/mobile-app-reel.mp4",
            poster: "/assets/images/services/mobile-app-reel-poster.webp"
        }
    },
    {
        title: "SaaS Products",
        slug: "saas-products",
        seo: {
            title: "SaaS product design and development",
            description:
                "SaaS product strategy, UX, dashboards and onboarding that turns trials into paying users, plus front-end development, from one product team."
        },
        label: "Web Platforms",
        description:
            "SaaS is hard to design because users come back every day, and every confusing screen costs you a subscriber. We design and build SaaS products that make complex features feel simple, from your first paying customers to a platform that scales. We’ve worked on dashboards, analytics tools, and B2B platforms, and we think like product partners, not just a design vendor.",
        tags: [
            "SaaS product strategy & UX design",
            "Dashboard & data visualization design",
            "Onboarding flows that turn trials into paying users",
            "Multi-role access & admin experiences",
            "Design systems built to scale with your team",
            "Front-end development, ready for your engineers or ours"
        ],
        video: {
            src: "/assets/videos/services/saas-reel.mp4",
            poster: "/assets/images/services/saas-reel-poster.webp"
        }
    },
    {
        title: "Web Management System",
        slug: "web-management-system",
        seo: {
            title: "Custom web management systems and admin panels",
            description:
                "Custom admin panels, internal tools and role-based dashboards that replace spreadsheets and manual follow-ups, shaped around how your team works."
        },
        label: "Custom Web Systems",
        description:
            "If your team still runs on spreadsheets, WhatsApp threads, and manual follow-ups, a custom management system pays for itself quickly. We build web-based systems for managing operations, teams, clients, inventory, and approvals, shaped around how your business really works, not a template that makes you adapt. Clear for your staff on day one, flexible enough to grow with you.",
        tags: [
            "Custom admin panels & internal tools",
            "Role-based dashboards & permissions",
            "Workflow automation & approval flows",
            "Reporting, analytics & data export",
            "CRM, inventory, HR & booking systems",
            "Secure cloud hosting, training & ongoing support"
        ],
        video: {
            src: "/assets/videos/services/wms-reel.mp4",
            poster: "/assets/images/services/wms-reel-poster.webp"
        }
    },
    {
        title: "Game Design",
        slug: "game-design",
        seo: {
            title: "2D game design studio",
            description:
                "2D game design: concept and core loop, characters and environments, game UI and HUD, level design and animation-ready art for mobile and branded games."
        },
        label: "2D Games",
        description:
            "A good game gets players to want “one more round.” We design 2D games with that in mind, covering mechanics, characters, worlds, and the interface that holds it all together. Whether you’re building a mobile casual game, a branded experience, or an indie project, we handle the art and design so your game looks great and feels good to play.",
        tags: [
            "Game concept & core loop design",
            "2D character, environment & asset design",
            "Game UI/UX, menus, HUD & onboarding",
            "Level design & progression systems",
            "Animation-ready art & sprite sheets",
            "Branded & promotional games"
        ],
        video: {
            src: "/assets/videos/services/game-reel.mp4",
            poster: "/assets/images/services/game-reel-poster.webp"
        }
    },
    {
        title: "Brand Identity",
        slug: "brand-identity",
        seo: {
            title: "Brand identity design for startups",
            description:
                "Brand identity for startups: logo and marks, colour and typography, usable brand guidelines, pitch deck and marketing templates, and brand voice."
        },
        label: "Brand & Visuals",
        description:
            "Your brand is what people remember after they close the tab. We build identities that look sharp and are easy to use, a clear system your team can apply consistently across your website, product, social media, and print. No generic logos, no trend-chasing. Just a brand that sounds like you and stands apart from your competitors.",
        tags: [
            "Logo design & brand mark variations",
            "Color palette, typography & visual language",
            "Brand guidelines your team can actually use",
            "Social media & marketing templates",
            "Stationery, pitch deck & presentation design",
            "Brand voice & messaging direction"
        ],
        video: {
            src: "/assets/videos/services/brand-reel.mp4",
            poster: "/assets/images/services/brand-reel-poster.webp"
        }
    }
];

export const serviceHref = (service: Pick<Service, "slug">) => `/services/${service.slug}`;
