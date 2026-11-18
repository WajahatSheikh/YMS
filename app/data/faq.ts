// FAQ content. Rendered by the FAQ section and mirrored, word for word, into
// the FAQPage structured data — Google requires the schema to match what is
// visible on the page, so edit answers here and both stay in sync.

export type FaqTopic = "Pricing" | "Process" | "Team" | "Ownership";

export interface Faq {
    question: string;
    answer: string;
    /** Groups the question for the topic filter in the FAQ section. */
    topic: FaqTopic;
}

export const FAQS: Faq[] = [
    {
        question: "What's included for $3,999 a month?",
        topic: "Pricing",
        answer:
            "A full product team — design, frontend, backend, QA and a technical PM — working on your product every week. Not hours in a bucket: an actual team on a sprint cadence."
    },
    {
        question: "How quickly will I see something real?",
        topic: "Process",
        answer:
            "Working design in week one, and something clickable on staging by the end of week two. After that there's a live demo every Friday."
    },
    {
        question: "Can I pause or cancel?",
        topic: "Pricing",
        answer:
            "Any time, from your side, without a call. Pause between funding rounds and pick up where you left off — no renegotiation, no ramp-up fee."
    },
    {
        question: "Who owns the code and the designs?",
        topic: "Ownership",
        answer:
            "You do. Every file and every repository, from day one. No licence, no escrow, and nothing to buy out if you leave."
    },
    {
        question: "What if I need a one-off project instead?",
        topic: "Pricing",
        answer:
            "We do fixed-scope builds from $1,299 — same team, same process, defined deliverables. Subscription makes sense when the work keeps coming; fixed scope when it doesn't."
    },
    {
        question: "Who will I actually be working with?",
        topic: "Team",
        answer:
            "The same five people every week, in a shared Slack channel. There's no account manager sitting between you and the people building your product."
    },
    {
        question: "What if you don't do what I need?",
        topic: "Team",
        answer:
            "We'll say so. 2D game design is done in-house; for 3D or advanced motion work we bring in specialists we've worked with before. If it's outside what we do well, we'll point you somewhere better rather than learn on your budget."
    },
    {
        question: "How does a week actually run?",
        topic: "Process",
        answer:
            "Monday you set the agenda. We design and build Tuesday to Thursday, shipping to staging as work lands. Friday you see it live and shape the next sprint."
    },
    {
        question: "How much does an MVP cost?",
        topic: "Pricing",
        answer:
            "Two ways to pay. A subscription is $3,999 a month for a full team working on your product every week. A fixed-scope project, such as a website, starts from $1,299 and depends on the deliverables. Book a free 30-minute call and we'll tell you which one fits your scope."
    },
    {
        question: "How long does it take to build an MVP?",
        topic: "Process",
        answer:
            "You see working design in week one and something clickable on staging by the end of week two. After that there is a live demo every Friday. Launch date depends on scope, so we agree it with you on the first call and check it against the demo each week."
    },
    {
        question: "What is a design subscription?",
        topic: "Pricing",
        answer:
            "One fixed monthly price for a product team instead of a project quote. You send requests, we design and build them in weekly sprints, and you can pause or cancel any time. It suits products where the work keeps coming, like an MVP that turns into a live product."
    },
    {
        question: "Is a subscription better than hiring a designer or a freelancer?",
        topic: "Pricing",
        answer:
            "A hire is one salary and one skill set, and a freelancer is one person's availability. A subscription gives you a team of design, frontend, backend, QA and a technical PM for one monthly price, with no hiring or notice period. A single in-house designer is the better fit once you have steady work for them every day."
    },
    {
        question: "Do you build the product too, or only design it?",
        topic: "Team",
        answer:
            "Both. The same team designs and builds, so what you approve in Figma is what ships: websites, iOS and Android apps, SaaS products and custom admin systems, all delivered dev-ready and then built."
    },
    {
        question: "Do you build design systems for startups?",
        topic: "Process",
        answer:
            "Yes. A design system is part of product design here: components, tokens and usage rules, built in Figma and handed over dev-ready, so your team can add screens without redesigning the basics."
    }
];

/** The FAQs on the given topics, in their usual order — for the inner pages. */
export const faqsByTopic = (...topics: FaqTopic[]) => FAQS.filter((f) => topics.includes(f.topic));
