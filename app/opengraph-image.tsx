import { ImageResponse } from "next/og";

// The image shown when the site is shared (LinkedIn, Slack, WhatsApp, X…) and
// used by ad platforms that read Open Graph. Generated at build time, 1200×630.
export const alt = "YourMomStudio — MVP design and development on monthly subscription";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    padding: "72px 80px",
                    backgroundColor: "#020202",
                    backgroundImage: "radial-gradient(circle at 85% 15%, rgba(232,80,2,0.35), rgba(2,2,2,0) 55%)",
                    color: "#ffffff",
                    fontFamily: "sans-serif"
                }}
            >
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <div style={{ width: 18, height: 18, borderRadius: 999, background: "#e85002" }} />
                    <div style={{ fontSize: 30, letterSpacing: 1, color: "#d4d4d8" }}>YourMomStudio</div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                    <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2, maxWidth: 960 }}>
                        MVP design and development, on monthly subscription
                    </div>
                    <div style={{ fontSize: 30, color: "#a1a1aa", maxWidth: 900 }}>
                        A full product team for funded startups — design, engineering and QA every week.
                    </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 24, fontSize: 28 }}>
                    <div style={{ display: "flex", padding: "14px 28px", borderRadius: 999, background: "#e85002", color: "#000" }}>
                        From $3,999/month
                    </div>
                    <div style={{ color: "#d4d4d8" }}>Pause or cancel anytime</div>
                </div>
            </div>
        ),
        size
    );
}
