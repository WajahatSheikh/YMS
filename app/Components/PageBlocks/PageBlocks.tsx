import Link from "next/link";
import { WEEKLY_LOOP } from "@/app/data/subscription";
import style from "./index.module.scss";

// Content blocks for the inner pages. Each is a server-rendered <section> with
// its own <h2>, laid out on the same 1520px column as the home sections, so a
// page is just PageHero + a stack of these + existing home sections.

const CheckIcon = () => (
    <svg className={style.check} viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M3.5 8.4 6.5 11.2 12.5 4.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const Head = ({ eyebrow, title, intro }: { eyebrow?: string; title: string; intro?: string }) => (
    <header className={style.head}>
        {eyebrow && <p className={style.eyebrow}>{eyebrow}</p>}
        <h2 className={style.title}>{title}</h2>
        {intro && <p className={style.intro}>{intro}</p>}
    </header>
);

/** A text link to a related page, e.g. under a block. */
export const MoreLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <Link className={style.more} href={href}>
        {children}
        <span aria-hidden="true">&rarr;</span>
    </Link>
);

/** A titled checklist, optionally beside media (a reel, an image). */
export const ChecklistBlock = ({
    eyebrow,
    title,
    intro,
    items,
    media,
    footer
}: {
    eyebrow?: string;
    title: string;
    intro?: string;
    items: readonly string[];
    media?: React.ReactNode;
    footer?: React.ReactNode;
}) => (
    <section className={style.block}>
        <div className={`${style.inner} ${media ? style.split : ""}`}>
            {media && <div className={style.media}>{media}</div>}
            <div className={style.stack}>
                <Head eyebrow={eyebrow} title={title} intro={intro} />
                <ul className={style.checklist}>
                    {items.map((item) => (
                        <li key={item}>
                            <CheckIcon />
                            {item}
                        </li>
                    ))}
                </ul>
                {footer}
            </div>
        </div>
    </section>
);

/** The Monday-to-Friday sprint, from app/data/subscription.ts. */
export const WeekBlock = ({ eyebrow = "How a week runs", title, intro }: { eyebrow?: string; title: string; intro?: string }) => (
    <section className={style.block}>
        <div className={style.inner}>
            <Head eyebrow={eyebrow} title={title} intro={intro} />
            <ol className={style.week}>
                {WEEKLY_LOOP.map((step) => (
                    <li key={step.day} className={style.weekStep}>
                        <span className={style.weekDay}>{step.day}</span>
                        <h3 className={style.weekTitle}>{step.title}</h3>
                        <p className={style.weekNote}>{step.note}</p>
                    </li>
                ))}
            </ol>
        </div>
    </section>
);

export interface CompareRow {
    label: string;
    values: string[];
}

/** A comparison table; the first value column is highlighted as ours. */
export const CompareTable = ({
    eyebrow,
    title,
    intro,
    columns,
    rows
}: {
    eyebrow?: string;
    title: string;
    intro?: string;
    columns: string[];
    rows: CompareRow[];
}) => (
    <section className={style.block}>
        <div className={style.inner}>
            <Head eyebrow={eyebrow} title={title} intro={intro} />
            <div className={style.tableWrap} role="region" aria-label={title} tabIndex={0}>
                <table className={style.table}>
                    <thead>
                        <tr>
                            <td />
                            {columns.map((column, index) => (
                                <th key={column} scope="col" className={index === 0 ? style.ours : undefined}>
                                    {column}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row) => (
                            <tr key={row.label}>
                                <th scope="row">{row.label}</th>
                                {row.values.map((value, index) => (
                                    <td key={index} className={index === 0 ? style.ours : undefined}>
                                        {value}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </section>
);

export interface PlanCard {
    name: string;
    price: string;
    unit?: string;
    text: string;
    points: string[];
    featured?: boolean;
}

/** Side-by-side plans (the subscription and fixed-scope projects). */
export const PlanCards = ({ eyebrow, title, intro, plans }: { eyebrow?: string; title: string; intro?: string; plans: PlanCard[] }) => (
    <section className={style.block}>
        <div className={style.inner}>
            <Head eyebrow={eyebrow} title={title} intro={intro} />
            <ul className={style.plans}>
                {plans.map((plan) => (
                    <li key={plan.name} className={`${style.plan} ${plan.featured ? style.planFeatured : ""}`}>
                        <h3 className={style.planName}>{plan.name}</h3>
                        <p className={style.planPrice}>
                            {plan.price}
                            {plan.unit && <span className={style.planUnit}>{plan.unit}</span>}
                        </p>
                        <p className={style.planText}>{plan.text}</p>
                        <ul className={style.checklist}>
                            {plan.points.map((point) => (
                                <li key={point}>
                                    <CheckIcon />
                                    {point}
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    </section>
);

export interface LinkCard {
    title: string;
    label?: string;
    text: string;
    href: string;
}

/** A grid of links to related pages — the internal links between sections. */
export const LinkGrid = ({ eyebrow, title, intro, links }: { eyebrow?: string; title: string; intro?: string; links: LinkCard[] }) => (
    <section className={style.block}>
        <div className={style.inner}>
            <Head eyebrow={eyebrow} title={title} intro={intro} />
            <ul className={style.links}>
                {links.map((link) => (
                    <li key={link.href}>
                        <Link className={style.linkCard} href={link.href}>
                            <h3 className={style.linkTitle}>
                                {link.title}
                                {link.label && <span className={style.linkLabel}>{link.label}</span>}
                            </h3>
                            <p className={style.linkText}>{link.text}</p>
                            <span className={style.linkMore} aria-hidden="true">
                                Explore &rarr;
                            </span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    </section>
);
