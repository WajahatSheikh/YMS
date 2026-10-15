import Image from "next/image";
import MarqueeGallery from "./MarqueeGallery";
import style from "./index.module.scss";

// 07b · Shipped with YMS — Figma node 144:1631
//
// Two rows of work cards drifting in opposite directions. The cards are
// server-rendered; MarqueeGallery.tsx is the only client code — the drift and
// its slow-down on hover.

interface Work {
    name: string;
    kind: string;
    image: string;
    /** Figma card widths: 190 phone, 580 desktop, 780 wide. */
    width: 190 | 580 | 780;
}

const ROW_ONE: Work[] = [
    { name: "SABAQ", kind: "Mobile app", image: "/assets/images/carousel%20bottom/sabaq.png", width: 190 },
    { name: "Paramount Students", kind: "Web platform", image: "/assets/images/carousel%20bottom/paramount.png", width: 780 },
    { name: "Moonshot", kind: "Mobile app", image: "/assets/images/carousel%20bottom/moonshot.png", width: 190 },
    { name: "Multinet", kind: "Website", image: "/assets/images/carousel%20bottom/multinet.png", width: 580 },
    { name: "Jolly", kind: "Mobile app", image: "/assets/images/carousel%20bottom/jolly.png", width: 190 },
    { name: "Global Learners", kind: "Website", image: "/assets/images/carousel%20bottom/global.png", width: 580 }
];

const ROW_TWO: Work[] = [
    { name: "Naturally White", kind: "E-commerce", image: "/assets/images/carousel%20bottom/naturally.png", width: 580 },
    { name: "AA-Studio", kind: "Mobile app", image: "/assets/images/carousel%20bottom/aastudio.png", width: 190 },
    {
        name: "Digital Gravity",
        kind: "Web platform",
        image: "/assets/images/carousel%20bottom/digitalgravity.png",
        width: 780
    },
    { name: "VIVRE", kind: "Website", image: "/assets/images/carousel%20bottom/vivre.png", width: 580 },
    { name: "Strike A Balance", kind: "Game", image: "/assets/images/carousel%20bottom/strike.png", width: 190 }
];

const Card = ({ work, duplicate }: { work: Work; duplicate?: boolean }) => (
    <li
        className={style.card}
        style={{ "--w": `${work.width}px` } as React.CSSProperties}
        aria-hidden={duplicate || undefined}
    >
        <Image
            src={work.image}
            alt={duplicate ? "" : `${work.name} — ${work.kind}`}
            width={work.width * 2}
            height={760}
            sizes={`${work.width}px`}
        />
    </li>
);

const ShippedWith = () => (
    <section id="shipped" className={style.section} aria-label="Shipped with YMS">
        <header className={style.head}>
            <h2 className={style.title}>Shipped with YMS</h2>
            <p className={style.lead}>
                Real products in production — mobile apps, web platforms, and the design systems holding them
                together.
            </p>
        </header>

        <MarqueeGallery className={style.gallery}>
            {[ROW_ONE, ROW_TWO].map((works, rowIndex) => (
                <ul key={rowIndex} className={style.row} data-marquee-row>
                    {works.map((work) => (
                        <Card key={work.name} work={work} />
                    ))}
                    {/* Second pass makes the wrap seamless. */}
                    {works.map((work) => (
                        <Card key={`${work.name}-loop`} work={work} duplicate />
                    ))}
                </ul>
            ))}
        </MarqueeGallery>
    </section>
);

export default ShippedWith;
