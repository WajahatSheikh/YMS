"use client";

import { useState } from "react";
import Image from "next/image";
import s from "./nw.module.scss";

// 05 · The pages. A list of the inner pages; the chosen one shows how it opens.
//
// Desktop: hovering or focusing a row swaps the preview beside the list (all
// previews are stacked, the active one fades in). Narrow screens: the list is
// an accordion, and the chosen row opens to show its note and its preview.
// The first page is chosen from the start, so nothing is hidden without script.

interface PageItem {
    name: string;
    kind: string;
    text: string;
    src: string;
    alt: string;
}

export default function PagesIndex({ items, width, height }: { items: readonly PageItem[]; width: number; height: number }) {
    const [active, setActive] = useState(0);

    return (
        <div className={s.pagesGrid} data-rise>
            <ol className={s.pagesList}>
                {items.map((item, i) => {
                    const on = i === active;
                    return (
                        <li key={item.name} className={`${s.pageRow} ${on ? s.pageRowOn : ""}`}>
                            <button type="button" aria-expanded={on} onPointerEnter={(event) => event.pointerType === "mouse" && setActive(i)} onFocus={() => setActive(i)} onClick={() => setActive(i)}>
                                <span className={s.pageNum}>{String(i + 1).padStart(2, "0")}</span>
                                <span className={s.pageName}>{item.name}</span>
                                <span className={s.pageKind}>{item.kind}</span>
                                <span className={s.pageMark} aria-hidden="true" />
                            </button>
                            <div className={s.pageBody}>
                                <div>
                                    <p className={s.pageText}>{item.text}</p>
                                    <div className={s.pageInline}>
                                        <Image src={item.src} alt={item.alt} width={width} height={height} sizes="92vw" />
                                    </div>
                                </div>
                            </div>
                        </li>
                    );
                })}
            </ol>

            {/* Desktop preview: decorative here, the same images sit in the list
                (with their alt text) for narrow screens and screen readers. */}
            <div className={s.pagesPreview} aria-hidden="true">
                <div className={s.previewBar}>
                    <i />
                    <i />
                    <i />
                    <span>{items[active].name}</span>
                </div>
                <div className={s.previewStack}>
                    {items.map((item, i) => (
                        <Image
                            key={item.name}
                            className={i === active ? s.previewOn : ""}
                            src={item.src}
                            alt=""
                            width={width}
                            height={height}
                            sizes="(max-width: 991px) 1px, 52vw"
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
