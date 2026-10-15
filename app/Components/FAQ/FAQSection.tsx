import Image from "next/image";
import { ctaGlow } from "@/app/lib/ctaGlow";
import { bookingLinkProps } from "@/app/lib/booking";
import { SITE } from "@/app/data/site";
import FaqAccordion from "./FaqAccordion";
import style from "./FAQSection.module.scss";

// 12 · FAQ — "a straight conversation".
//
// Art direction: the headline promises straight answers, so each question opens
// into a reply bubble from the team, like a real chat; topic chips let a
// visitor jump to what they care about. On desktop the intro and the contact
// card stay pinned on the left while the thread scrolls on the right.
//
// The intro is server-rendered; the thread (FaqAccordion.tsx) is the only
// client code.

const PhoneIcon = () => (
    <svg className={style.phoneIcon} viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <path
            d="M17.01 12.38C15.78 12.38 14.59 12.18 13.48 11.82C13.13 11.7 12.74 11.79 12.47 12.06L10.9 14.03C8.07 12.68 5.42 10.13 4.01 7.2L5.96 5.54C6.23 5.26 6.31 4.87 6.2 4.52C5.83 3.41 5.64 2.22 5.64 0.99C5.64 0.45 5.19 0 4.65 0H1.19C0.65 0 0 0.24 0 0.99C0 10.28 7.73 18 17.01 18C17.72 18 18 17.37 18 16.82V13.37C18 12.83 17.55 12.38 17.01 12.38Z"
            fill="currentColor"
        />
    </svg>
);

const FAQSection = () => (
    <section id="faq" className={style.section}>
        <div className={style.content}>
            <aside className={style.intro}>
                <div className={style.introHead}>
                    <p className={style.eyebrow}>FAQ</p>
                    <h2 className={style.title}>Questions, answered straight.</h2>
                </div>

                {/* Contact card — a person to talk to, not a form. */}
                <div className={style.contact}>
                    <div className={style.contactWho}>
                        <span className={style.avatar}>
                            <Image src="/assets/images/Humain%20Pics/faq-avatar.jpg" alt="" width={56} height={56} />
                            <span className={style.online} aria-hidden="true" />
                        </span>
                        <span className={style.contactText}>
                            <span className={style.prompt}>Can&rsquo;t find your answer?</span>
                            <span className={style.subPrompt}>Book a call and let&rsquo;s talk.</span>
                        </span>
                    </div>
                    <a className={style.cta} {...bookingLinkProps("faq")} {...ctaGlow}>
                        <PhoneIcon />
                        <span>Book a call</span>
                    </a>
                    <p className={style.email}>
                        Or email us &rarr; <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
                    </p>
                </div>
            </aside>

            <FaqAccordion />
        </div>
    </section>
);

export default FAQSection;
