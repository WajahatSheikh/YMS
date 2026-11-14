import { WORK_CATEGORIES, WORK_COUNT } from "@/app/data/work";
import WorkTabs from "./WorkTabs";
import style from "./index.module.scss";

// 06 · Case studies.
//
// Eyebrow "Selected work", then the case studies sorted by kind of work in
// tabs (see WorkTabs.tsx and app/data/work.ts). Each card opens its case study.

const Client = () => (
    <section id="work" className={style.section} aria-labelledby="work-title">
        <header className={style.head}>
            <div className={style.headMain}>
                <p className={style.eyebrow}>Selected work</p>
                <h2 id="work-title" className={style.title}>
                    Case studies
                </h2>
            </div>
            <p className={style.headAside}>
                <span className={style.headCount}>{String(WORK_COUNT).padStart(2, "0")}</span>
                case studies from brief to build. Pick a type of work, then open one.
            </p>
        </header>

        <WorkTabs categories={WORK_CATEGORIES} />
    </section>
);

export default Client;
