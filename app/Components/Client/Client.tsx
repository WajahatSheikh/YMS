import { projects } from "@/app/data/projects";
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
// The Figma card set repeated "Gasoline Application" three times and "Radiant
// skincare branding" twice; an index makes repeats obvious, so it lists each
// project once. There are six case-study pages, one per project, and each row
// links to its own. Replace copy, thumbnail and case study together as the real
// work lands.

const WORK: Omit<IndexProject, "href">[] = [
    { title: "Paramount Students", client: "Paramount Students", category: "Mobile App" },
    { title: "Students Experience", client: "Paramount Students", category: "Mobile App" },
    { title: "Gasoline Application", client: "Digital Gravity", category: "Web Management" },
    // Client tag left off until the real client name is confirmed.
    { title: "Radiant Skincare Branding", category: "Website Design" },
    { title: "Ed-Tech Mobile Games", client: "SABAQ", category: "Game Design" },
    { title: "Strike A Balance", client: "SABAQ", category: "Game Design" }
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

        <ProjectIndex
            projects={WORK.map((project, index) => ({
                ...project,
                href: `/portfolio/${projects[index % projects.length].slug}`
            }))}
        />
    </section>
);

export default Client;
