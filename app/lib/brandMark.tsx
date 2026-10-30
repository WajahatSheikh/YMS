import { THEME_COLOR } from "./theme";

// The YMS app mark — a brand-orange "Y" on the dark canvas — drawn for
// next/og ImageResponse. Shared by app/icon.tsx and app/apple-icon.tsx so the
// favicon, home-screen icon and manifest icons always match.
//
// ImageResponse can't read the woff2 display face, so the glyph is the
// built-in sans at heavy weight; at icon sizes the difference doesn't show.
export const BRAND_ORANGE = "#e85002";

export const brandMark = (size: number, { rounded = true } = {}) => (
    <div
        style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: THEME_COLOR.dark,
            backgroundImage: "radial-gradient(circle at 80% 15%, rgba(232,80,2,0.35), rgba(2,2,2,0) 60%)",
            // iOS masks the apple icon itself, so that one stays square.
            borderRadius: rounded ? Math.round(size * 0.22) : 0,
            color: BRAND_ORANGE,
            fontFamily: "sans-serif",
            fontWeight: 800,
            fontSize: Math.round(size * 0.72),
            lineHeight: 1
        }}
    >
        Y
    </div>
);
