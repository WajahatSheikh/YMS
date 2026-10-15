import Image from "next/image";
import TeamRail from "./TeamRail";
import style from "./index.module.scss";

// 11 · Team — Figma node 143:1384 (1920×964)
//
// Team Member note (157:380): "Full-bleed portrait card. The photo is the card
// fill (scaleMode FILL) — swap it per person. Hover lifts the card, turns border
// + index brand, deepens the scrim and REVEALS the specialty line — progressive
// disclosure, not just a colour change. Wired 'While hovering' + Smart Animate
// 220ms."
//
// The Members row is 1660 wide inside a 1520 container, so it is meant to run
// past the edge. Here it is a real scroll rail (TeamRail.tsx — the only client
// code in this section): edge to edge, draggable, and it keeps the design's
// alternating 44px vertical offset on the even cards.

interface Member {
    name: string;
    position: string;
    /** Revealed on hover — the specialty line the component note describes. */
    specialty: string;
    photo: string;
}

const MEMBERS: Member[] = [
    {
        name: "Wajahat Sheikh",
        position: "Head of Product Design",
        specialty: "Sr. Product Designer | Game Designer | AI SaaS | UX & UI | B2B & B2C Platforms",
        photo: "/assets/images/wajahat.png"
    },
    {
        name: "Ali Abbas",
        position: "Creative Director",
        specialty: "Creative Director | Website Designer, Product Design & Art Direction | Turning bold ideas into visuals that convert",
        photo: "/assets/images/ali-v2.jpg"
    },
    {
        name: "Hamza Mithani",
        position: "Marketing Manager",
        specialty: "Senior Marketing Manager | SEO, Paid Ads & Content Strategy | Driving growth and revenue for SaaS and digital brands",
        photo: "/assets/images/hamza.webp"
    },
    {
        name: "Agha Zeeshan",
        position: "Technical Product Manager",
        specialty: "Technology Consultant | Program Manager | Technical Project Manager | Technical Product Owner | Scrum Master | Agile Practitioner | Business Analyst | CSM® | CSPO® | SSYB™",
        photo: "/assets/images/agha-v2.jpg"
    },
    {
        name: "Huzaifa Iqbal",
        position: "Senior Front End Developer",
        specialty: "Senior Frontend Architect | React.js, Next.js & React Native | Building scalable, high-performance web & mobile products",
        photo: "/assets/images/huzaifa-v2.jpg"
    },
    {
        name: "Imran",
        position: "Lead Software Test Engineer",
        specialty: "Automation Engineer | QA Automation | Selenium | Playwright | Python | API Testing | CI/CD | Web & End-to-End Testing | Agile",
        photo: "/assets/images/imran.webp"
    }
];

export const TeamSection = () => (
    <section id="team" className={style.section}>
        <header className={style.head}>
            <p className={style.eyebrow}>Meet the team</p>
            <h2 className={style.title}>Meet your product team</h2>
            <p className={style.lead}>
                Six specialists, one team — the same people on your product every week. You will know them all by
                name.
            </p>
        </header>

        <TeamRail>
            {MEMBERS.map((member, index) => (
                // data-theme="dark": name and specialty sit on the photo scrim, so the
                // card keeps its dark colours on a light page.
                <li
                    key={member.name}
                    className={style.card}
                    style={{ "--i": index } as React.CSSProperties}
                    data-theme="dark"
                >
                    <Image
                        className={style.photo}
                        src={member.photo}
                        alt={member.name}
                        width={260}
                        height={420}
                        sizes="260px"
                    />

                    <span className={style.scrim} aria-hidden="true" />
                    <span className={style.index} aria-hidden="true">
                        {String(index + 1).padStart(2, "0")}
                    </span>

                    <div className={style.info}>
                        <p className={style.name}>{member.name}</p>
                        <p className={style.position}>{member.position}</p>
                        {/* Progressive disclosure — hidden until hover. The inner
                            span is what the 0fr→1fr row clips; a bare text node
                            would not collapse. */}
                        <p className={style.specialty}>
                            <span>{member.specialty}</span>
                        </p>
                    </div>
                </li>
            ))}
        </TeamRail>
    </section>
);

export default TeamSection;
