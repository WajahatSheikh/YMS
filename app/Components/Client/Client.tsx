import { MB } from "@/app/portfolio/mdrn-blk/content";
import { NW } from "@/app/portfolio/naturally-white/content";
import { TUIT } from "@/app/portfolio/tuit-luxury-candle/content";
import ProjectIndex, { type IndexProject } from "./ProjectIndex";
import style from "./index.module.scss";

// 06 · Work — the project index.
//
// Art direction: an editorial index of projects — big rows with number, title,
// client and category — and, on desktop, a preview card that follows the
// cursor. It holds up without thumbnails (each project gets a brand card with
// its monogram) and gets better as real ones are added: give an entry an
// `image` and both the preview and the mobile row thumbnail use it.
//
// Each row links to its own case study. The real ones (MDRN BLK, Naturally
// White, Tüit) have a thumbnail and a preview reel that plays in the cursor
// card. "Strike A Balance" still opens a placeholder page (app/data/projects.ts).
// Add a row only when its case study is ready.

const WORK: IndexProject[] = [
    { title: MB.client, category: MB.category, href: MB.path, image: MB.card.image, video: MB.card.video },
    { title: NW.client, category: NW.category, href: NW.path, image: NW.card.image, video: NW.card.video },
    {
        title: TUIT.client,
        client: TUIT.clientShort,
        category: TUIT.category,
        href: TUIT.path,
        image: TUIT.card.image,
        video: TUIT.card.video
    },
    { title: "Strike A Balance", client: "SABAQ", category: "Game Design", href: "/portfolio/shipstack" }
];

const Client = () => (
    <section id="work" className={style.section}>
        <header className={style.head}>
            <div className={style.headMain}>
                <p className={style.eyebrow}>Client Project</p>
                <h2 className={style.title}>Selected work for funded startups</h2>
            </div>
            <p className={style.headAside}>
                <span className={style.headCount}>{String(WORK.length).padStart(2, "0")}</span>
                selected projects — hover to preview, click for the case study
            </p>
        </header>

        <ProjectIndex projects={WORK} />
    </section>
);

export default Client;
