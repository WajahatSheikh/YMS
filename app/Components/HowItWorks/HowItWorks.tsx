import { GRAPH_PATH } from "./geometry";
import ProcessJourney from "./ProcessJourney";
import style from "./index.module.scss";

// 08 · Process — redesigned as a journey.
//
// A rising line graph runs across the first eight weeks with one node per phase.
// Each phase card carries a line illustration that draws itself in on scroll and
// redraws on hover. One phase is active at a time: its node lights up, the graph
// fills up to it, and the detail panel shows who leads it and what you get.
// The phases cycle on their own until the visitor interacts, then stay put.
//
// ≥992     graph + four cards in a row + shared detail panel
// 768–991  cards 2×2 + shared detail panel (no graph)
// <768     vertical timeline, details open inline under the active phase
//
// Server component: the copy, illustrations and graph are rendered here;
// ProcessJourney.tsx holds only the active-phase state and auto-cycle.

interface Phase {
    week: string;
    title: string;
    summary: string;
    detail: string;
    roles: string[];
    deliverables: string[];
    Illo: () => React.JSX.Element;
}

// ── line illustrations (stroke only, drawn with pathLength) ──────────────────
const P = (d: string, accent = false) => <path d={d} pathLength={1} className={accent ? style.accent : undefined} />;

const MapIllo = () => (
    <svg className={style.illo} viewBox="0 0 120 120" fill="none" aria-hidden="true">
        {P("M14 30 L44 20 L76 30 L106 20 L106 92 L76 102 L44 92 L14 102 Z")}
        {P("M44 20 L44 92")}
        {P("M76 30 L76 102")}
        {P("M24 84 C38 66 50 78 60 64 S80 50 88 46", true)}
        {P("M88 54 C82 46 80 42 80 38 A8 8 0 0 1 96 38 C96 42 94 46 88 54 Z", true)}
    </svg>
);

const DesignIllo = () => (
    <svg className={style.illo} viewBox="0 0 120 120" fill="none" aria-hidden="true">
        {P("M10 20 H104 V90 H10 Z")}
        {P("M10 32 H104")}
        {P("M20 42 H56 V66 H20 Z")}
        {P("M64 44 H94")}
        {P("M64 53 H86")}
        {P("M20 76 H94")}
        {P("M74 110 L102 82 L110 90 L82 118 L72 120 Z", true)}
        {P("M96 88 L104 96", true)}
    </svg>
);

const BuildIllo = () => (
    <svg className={style.illo} viewBox="0 0 120 120" fill="none" aria-hidden="true">
        {P("M36 32 L16 58 L36 84")}
        {P("M84 32 L104 58 L84 84")}
        {P("M68 26 L52 90", true)}
        {P("M60 96 V108")}
        {P("M36 108 H84")}
        {P("M36 108 V114 M60 108 V114 M84 108 V114")}
        {P("M60 6 V18 M54 12 H66", true)}
    </svg>
);

const ShipIllo = () => (
    <svg className={style.illo} viewBox="0 0 120 120" fill="none" aria-hidden="true">
        {P("M60 10 C78 26 82 52 77 80 H43 C38 52 42 26 60 10 Z")}
        {P("M60 34 A9 9 0 1 1 59.9 34 Z")}
        {P("M43 62 L30 84 L44 82")}
        {P("M77 62 L90 84 L76 82")}
        {P("M51 86 C53 98 60 110 60 110 C60 110 67 98 69 86", true)}
        {P("M22 30 L28 36 M98 24 L92 30 M100 60 H108", true)}
    </svg>
);

const PHASES: Phase[] = [
    {
        week: "Week 1",
        title: "Align + Map",
        summary: "We agree on goals, users and scope before anything gets designed.",
        detail: "Your Technical PM runs stakeholder alignment and requirements while the design team turns research into personas and flows. We close the week with a sprint plan, success metrics and one shared picture of what we’re building.",
        roles: ["Technical PM", "Design"],
        deliverables: [
            "Stakeholder alignment & requirements",
            "Technical feasibility review",
            "User research synthesis & personas",
            "User flow & content architecture",
            "Sprint plan & milestone roadmap",
            "Success metrics & KPI framework"
        ],
        Illo: MapIllo
    },
    {
        week: "Weeks 2–4",
        title: "Design + Iterate",
        summary: "Wireframes become polished, tested screens that are ready to build.",
        detail: "The design team takes the product from rapid wireframes to high-fidelity screens, while frontend developers audit components early so every decision is build-ready. We lock the visual language, responsive layouts and interactions.",
        roles: ["Design", "Technical PM", "Frontend"],
        deliverables: [
            "Creative direction & visual language",
            "Wireframes & UX flow validation",
            "High-fidelity UI screens & design system",
            "Interactive prototypes & design reviews",
            "Responsive layouts & component specs",
            "Dev handoff package & asset exports"
        ],
        Illo: DesignIllo
    },
    {
        week: "Weeks 4–8",
        title: "Build + Connect",
        summary: "Frontend, backend and infrastructure are built in parallel and tested as we go.",
        detail: "Frontend builds the interface, backend the APIs and data, and DevOps sets up infrastructure and CI/CD from day one. QA writes tests alongside the build, and every change ships through automated pipelines before it reaches staging.",
        roles: ["Frontend", "Backend", "DevOps", "QA"],
        deliverables: [
            "Frontend component implementation",
            "Backend API & database architecture",
            "CI/CD pipeline setup by DevOps",
            "QA test case authoring & coverage plan",
            "Integration & end-to-end testing",
            "Sprint-coordinated build handoff"
        ],
        Illo: BuildIllo
    },
    {
        week: "Week 8+",
        title: "Refine + Ship",
        summary: "We polish, test and launch, then plan what comes next.",
        detail: "QA runs full regression while DevOps handles zero-downtime deploys and the design team does the final polish. After launch we monitor, fix fast and hand you a groomed backlog for the next round.",
        roles: ["QA", "DevOps", "Technical PM", "Design"],
        deliverables: [
            "QA regression & acceptance testing",
            "Performance optimization & load testing",
            "Staging & production deployment",
            "Final UI polish by Design Team",
            "Post-launch monitoring & hotfixes",
            "Sprint retrospective & next backlog"
        ],
        Illo: ShipIllo
    }
];

const CheckIcon = () => (
    <svg className={style.checkIcon} viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <circle cx="8" cy="8" r="7" />
        <path d="M4.8 8.2 7 10.3 11.2 5.9" />
    </svg>
);

const InfoIcon = () => (
    <svg className={style.infoIcon} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
            d="M11 7H13V9H11V7ZM11 11H13V17H11V11ZM12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z"
            fill="currentColor"
        />
    </svg>
);

const Detail = ({ phase }: { phase: Phase }) => (
    <>
        <div className={style.detailCopy}>
            <p className={style.detailLabel}>Led by</p>
            <ul className={style.roles}>
                {phase.roles.map((r) => (
                    <li key={r} className={style.role}>
                        {r}
                    </li>
                ))}
            </ul>
            <p className={style.detailText}>{phase.detail}</p>
        </div>
        <div className={style.detailList}>
            <p className={style.detailLabel}>What you get</p>
            <ul className={style.deliverables}>
                {phase.deliverables.map((d, i) => (
                    <li key={d} style={{ "--i": i } as React.CSSProperties}>
                        <CheckIcon />
                        <span>{d}</span>
                    </li>
                ))}
            </ul>
        </div>
    </>
);

const HowItWorks = () => (
    <ProcessJourney
        head={
            <header className={style.head}>
                <p className={style.eyebrow}>How it works</p>
                <div className={style.headRow}>
                    <h2 className={style.title}>What the first 8 weeks look like</h2>
                    <p className={style.intro}>
                        Every project is different, but the rhythm is usually the same: get clear, move fast, build
                        properly, then tighten until the work feels ready for the real world.
                    </p>
                </div>
            </header>
        }
        graph={
            <>
                <svg viewBox="0 0 1000 160" preserveAspectRatio="none">
                    <defs>
                        <clipPath id="process-reveal" clipPathUnits="objectBoundingBox">
                            <rect className={style.revealAll} x="0" y="0" width="1" height="1" />
                        </clipPath>
                        <clipPath id="process-progress" clipPathUnits="objectBoundingBox">
                            <rect className={style.revealProgress} x="0" y="0" width="1" height="1" />
                        </clipPath>
                    </defs>
                    {[40, 80, 120].map((y) => (
                        <line key={y} className={style.gridLine} x1="0" x2="1000" y1={y} y2={y} />
                    ))}
                    <path className={style.lineBase} d={GRAPH_PATH} clipPath="url(#process-reveal)" />
                    <path className={style.lineActive} d={GRAPH_PATH} clipPath="url(#process-progress)" />
                </svg>
                <span className={style.axisStart}>Kickoff</span>
                <span className={style.axisEnd}>Launch</span>
            </>
        }
        phases={PHASES.map((p) => ({
            title: p.title,
            card: (
                <>
                    <span className={style.illoWrap}>
                        <p.Illo />
                    </span>
                    <span className={style.cardText}>
                        <span className={style.week}>
                            <span className={style.dot} />
                            {p.week}
                        </span>
                        <span className={style.cardTitle}>{p.title}</span>
                        <span className={style.summary}>{p.summary}</span>
                    </span>
                </>
            ),
            detail: <Detail phase={p} />
        }))}
        callout={
            <aside className={style.callout}>
                <InfoIcon />
                <p>
                    Every project is different. A focused landing page or MVP can wrap up in a few weeks; a full SaaS
                    platform, mobile app or enterprise system usually takes a few months. Either way you get clear
                    phases, regular check-ins and no surprises.
                </p>
            </aside>
        }
    />
);

export default HowItWorks;
