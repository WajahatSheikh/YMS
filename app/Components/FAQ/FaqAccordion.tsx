"use client";

import { useState } from "react";
import { flushSync } from "react-dom";
import { FAQS, type Faq, type FaqTopic } from "@/app/data/faq";
import style from "./FAQSection.module.scss";

// The FAQ conversation — the only client code in the FAQ section.
//
// Topic chips filter the list; each question opens to a reply bubble "from"
// the YMS team. Every answer stays in the DOM (collapsed rows are
// visibility:hidden, filtered rows display:none), so the copy is always there
// for search engines — it mirrors the FAQPage structured data word for word.
//
// Markup: the button covers only the question; the answer is a labelled
// region — correct accordion semantics.
//
// Inner pages pass a subset (e.g. only Pricing questions on /pricing); with a
// single topic the chips are left out.

type Filter = "All" | FaqTopic;

const FaqAccordion = ({ faqs = FAQS }: { faqs?: Faq[] }) => {
    // The first question starts open, as drawn.
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    const [filter, setFilter] = useState<Filter>("All");

    const topics: Filter[] = ["All", ...Array.from(new Set(faqs.map((f) => f.topic)))];
    const count = (topic: Filter) => (topic === "All" ? faqs.length : faqs.filter((f) => f.topic === topic).length);

    const choose = (topic: Filter) => {
        if (topic === filter) return;
        const apply = () => {
            setFilter(topic);
            // Open the first question of the topic, so the filter shows an answer.
            const first = faqs.findIndex((f) => topic === "All" || f.topic === topic);
            setOpenIndex(first);
        };
        const doc = document as Document & { startViewTransition?: (cb: () => void) => unknown };
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (doc.startViewTransition && !reduced) doc.startViewTransition(() => flushSync(apply));
        else apply();
    };

    return (
        <div className={style.thread}>
            {topics.length > 2 && (
                <div className={style.topics} role="group" aria-label="Filter questions by topic">
                    {topics.map((topic) => (
                        <button
                            key={topic}
                            type="button"
                            className={style.topic}
                            aria-pressed={filter === topic}
                            onClick={() => choose(topic)}
                        >
                            {topic}
                            <span className={style.topicCount}>{count(topic)}</span>
                        </button>
                    ))}
                </div>
            )}

            <ol className={style.questions}>
                {faqs.map((faq, index) => {
                    const visible = filter === "All" || faq.topic === filter;
                    const isOpen = visible && openIndex === index;
                    const panelId = `faq-panel-${index}`;
                    const buttonId = `faq-trigger-${index}`;

                    return (
                        <li
                            key={faq.question}
                            className={`${style.item} ${isOpen ? style.open : ""}`}
                            hidden={!visible}
                            style={{ viewTransitionName: `faq-${index}` } as React.CSSProperties}
                        >
                            <h3 className={style.questionHeading}>
                                <button
                                    id={buttonId}
                                    type="button"
                                    className={style.trigger}
                                    onClick={() => setOpenIndex(isOpen ? null : index)}
                                    aria-expanded={isOpen}
                                    aria-controls={panelId}
                                >
                                    {/* The number is drawn by CSS (::before) so the <h3> reads as
                                        just the question to search engines and screen readers. */}
                                    <span
                                        className={style.number}
                                        data-number={String(index + 1).padStart(2, "0")}
                                        aria-hidden="true"
                                    />
                                    <span className={style.question}>{faq.question}</span>
                                    <span className={style.icon} aria-hidden="true">
                                        {/* One glyph: the vertical bar folds into the
                                            horizontal one, so plus becomes minus. */}
                                        <span className={style.bar} />
                                        <span className={`${style.bar} ${style.barVertical}`} />
                                    </span>
                                </button>
                            </h3>

                            <div id={panelId} role="region" aria-labelledby={buttonId} className={style.panel}>
                                <div className={style.panelInner}>
                                    <div className={style.reply}>
                                        <span className={style.replyAvatar} aria-hidden="true">
                                            Y
                                        </span>
                                        <div className={style.bubble}>
                                            <p className={style.replyFrom}>
                                                YMS team <span className={style.replyTopic}>{faq.topic}</span>
                                            </p>
                                            <p className={style.answer}>{faq.answer}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    );
                })}
            </ol>
        </div>
    );
};

export default FaqAccordion;
