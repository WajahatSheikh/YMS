"use client";

import { useState } from "react";
import { flushSync } from "react-dom";
import { FAQS, type FaqTopic } from "@/app/data/faq";
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

type Filter = "All" | FaqTopic;

const TOPICS: Filter[] = ["All", ...Array.from(new Set(FAQS.map((f) => f.topic)))];

const FaqAccordion = () => {
    // The first question starts open, as drawn.
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    const [filter, setFilter] = useState<Filter>("All");

    const count = (topic: Filter) => (topic === "All" ? FAQS.length : FAQS.filter((f) => f.topic === topic).length);

    const choose = (topic: Filter) => {
        if (topic === filter) return;
        const apply = () => {
            setFilter(topic);
            // Open the first question of the topic, so the filter shows an answer.
            const first = FAQS.findIndex((f) => topic === "All" || f.topic === topic);
            setOpenIndex(first);
        };
        const doc = document as Document & { startViewTransition?: (cb: () => void) => unknown };
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (doc.startViewTransition && !reduced) doc.startViewTransition(() => flushSync(apply));
        else apply();
    };

    return (
        <div className={style.thread}>
            <div className={style.topics} role="group" aria-label="Filter questions by topic">
                {TOPICS.map((topic) => (
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

            <ol className={style.questions}>
                {FAQS.map((faq, index) => {
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
                            <button
                                id={buttonId}
                                type="button"
                                className={style.trigger}
                                onClick={() => setOpenIndex(isOpen ? null : index)}
                                aria-expanded={isOpen}
                                aria-controls={panelId}
                            >
                                <span className={style.number}>{String(index + 1).padStart(2, "0")}</span>
                                <span className={style.question}>{faq.question}</span>
                                <span className={style.icon} aria-hidden="true">
                                    {/* One glyph: the vertical bar folds into the
                                        horizontal one, so plus becomes minus. */}
                                    <span className={style.bar} />
                                    <span className={`${style.bar} ${style.barVertical}`} />
                                </span>
                            </button>

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
