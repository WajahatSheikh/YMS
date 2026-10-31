import type { MetadataRoute } from "next";
import { SITE } from "./data/site";
import { THEME_COLOR } from "./lib/theme";

// /manifest.webmanifest — name, colours and icons used when the site is added
// to a home screen, and read by Chrome and Lighthouse. The favicon itself is
// app/icon.svg (Figma 392:16654) with app/icon1.png as the PNG fallback; these
// larger PNGs are rendered from the same mark.
export default function manifest(): MetadataRoute.Manifest {
    return {
        name: SITE.name,
        short_name: "YMS",
        description: SITE.description,
        start_url: "/",
        display: "browser",
        background_color: THEME_COLOR.dark,
        theme_color: THEME_COLOR.dark,
        icons: [
            { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
            { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" }
        ]
    };
}
