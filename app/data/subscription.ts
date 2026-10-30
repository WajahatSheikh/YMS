// What the monthly subscription includes and how a week runs. Rendered by the
// Pricing receipt on the home page and reused by /pricing, /design-subscription
// and every /services/* page, so the offer reads the same everywhere.

export const INCLUDES = [
    "Product design & UX",
    "Frontend + backend build",
    "QA & testing",
    "Launch & deployment",
    "A dedicated technical PM",
    "Shared Slack channel",
    "Weekly live demo",
    "You own all code & design"
];

export const WEEKLY_LOOP = [
    { day: "MON", title: "Sprint kickoff", note: "You set the agenda for the week." },
    { day: "TUE–THU", title: "Design and build", note: "Work ships to staging as it lands." },
    { day: "FRI", title: "Live demo", note: "You review, we plan the next sprint." }
];

/** Fixed-scope projects start here (see the FAQ "What if I need a one-off project instead?"). */
export const FIXED_SCOPE_FROM = 1299;
