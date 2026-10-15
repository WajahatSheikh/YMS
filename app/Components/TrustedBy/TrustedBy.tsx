import Image from "next/image";
import style from "./index.module.scss";

// 04 · Logos — Figma node 143:785
// Widths are the Figma frame widths at a locked 40px height.
const LOGOS = [
    { src: "/assets/images/client-logos/logo-01-sabaq.png", alt: "Sabaq", width: 140 },
    { src: "/assets/images/client-logos/logo-02-multinet.png", alt: "Multinet", width: 123 },
    { src: "/assets/images/client-logos/logo-03-paramount.png", alt: "Paramount Students", width: 143 },
    { src: "/assets/images/client-logos/logo-04-moonshot.png", alt: "Moonshot Animations", width: 149 },
    { src: "/assets/images/client-logos/logo-05-aa-studio.png", alt: "AA-Studio", width: 154 },
    { src: "/assets/images/client-logos/logo-06-global.png", alt: "Global Learners Education", width: 154 },
    { src: "/assets/images/client-logos/logo-07-jolly.png", alt: "Jolly", width: 77 },
    { src: "/assets/images/client-logos/logo-08-vivre.png", alt: "Vivre", width: 154 },
    { src: "/assets/images/client-logos/logo-09-skinomatics.png", alt: "Skinomatics", width: 126 },
    { src: "/assets/images/client-logos/logo-10-naturally.png", alt: "Naturally White", width: 270 },
    { src: "/assets/images/client-logos/logo-11-mbrp.png", alt: "MBRP", width: 103 },
    { src: "/assets/images/client-logos/logo-12-americano.png", alt: "Americano", width: 76 }
] as const;

const TrustedBy = () => (
    <section id="trusted-by" className={style.section}>
        <div className={style.container}>
            <h2 className={style.eyebrow}>Trusted by Startups &amp; Product Teams We&rsquo;ve Worked With</h2>

            <ul className={style.grid}>
                {LOGOS.map((logo) => (
                    <li key={logo.src} className={style.item} style={{ width: `${logo.width}px` }}>
                        <Image
                            src={logo.src}
                            alt={logo.alt}
                            width={logo.width}
                            height={40}
                            sizes={`${logo.width}px`}
                        />
                    </li>
                ))}
            </ul>
        </div>
    </section>
);

export default TrustedBy;
