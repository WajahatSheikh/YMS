import type { MetadataRoute } from "next";
import { SITE } from "./data/site";
import { THEME_COLOR } from "./lib/theme";

// /manifest.webmanifest — name, colours and icons used when the site is added
// to a home screen, and read by Chrome and Lighthouse. Icons come from
// app/icon.tsx (one route per size).
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
            { src: "/icon/192", sizes: "192x192", type: "image/png" },
            { src: "/icon/512", sizes: "512x512", type: "image/png" }
        ]
    };
}
