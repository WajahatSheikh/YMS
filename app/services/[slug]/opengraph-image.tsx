import fs from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";
import { SERVICES } from "@/app/data/services";

// The share image for each service page (LinkedIn, WhatsApp, Slack, X…), built
// at build time: the service's keyword title, its label, three deliverables and
// a still from its own reel, in the same dark-and-orange frame as the home
// page's share image. 1200×630.
//
// Satori (the renderer behind ImageResponse) reads PNG and JPEG but not WebP,
// so the still comes from the poster's .jpg (or .png) twin next to the .webp.

export const alt = "A design and development service by YourMomStudio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
    return SERVICES.map((service) => ({ slug: service.slug }));
}

const stillFor = (poster: string) => {
    for (const ext of [".jpg", ".png"]) {
        const file = path.join(process.cwd(), "public", poster.replace(/\.webp$/, ext));
        if (fs.existsSync(file)) {
            return `data:image/${ext === ".jpg" ? "jpeg" : "png"};base64,${fs.readFileSync(file).toString("base64")}`;
        }
    }
    return null;
};

export default async function ServiceShareImage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const service = SERVICES.find((s) => s.slug === slug) ?? SERVICES[0];
    const still = service.video ? stillFor(service.video.poster) : null;

    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    padding: "64px 64px 64px 72px",
                    gap: 48,
                    backgroundColor: "#020202",
                    backgroundImage: "radial-gradient(circle at 88% 12%, rgba(232,80,2,0.38), rgba(2,2,2,0) 55%)",
                    color: "#ffffff",
                    fontFamily: "sans-serif"
                }}
            >
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                        <div style={{ width: 16, height: 16, borderRadius: 999, background: "#e85002" }} />
                        <div style={{ fontSize: 26, letterSpacing: 1, color: "#d4d4d8" }}>YourMomStudio</div>
                        {service.label && (
                            <div style={{ display: "flex", marginLeft: 10, padding: "6px 14px", borderRadius: 999, border: "1px solid #52525b", fontSize: 20, color: "#a1a1aa" }}>
                                {service.label}
                            </div>
                        )}
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
                        <div style={{ fontSize: 60, fontWeight: 700, lineHeight: 1.06, letterSpacing: -1.5 }}>{service.seo.title}</div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                            {service.tags.slice(0, 3).map((tag) => (
                                <div key={tag} style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 24, color: "#d4d4d8" }}>
                                    <div style={{ width: 10, height: 10, borderRadius: 2, background: "#e85002" }} />
                                    {tag}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div style={{ display: "flex", fontSize: 22, color: "#a1a1aa" }}>yourmomstudio.com/services/{service.slug}</div>
                </div>
                {still && (
                    <div style={{ display: "flex", alignItems: "center" }}>
                        {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse renders plain <img> */}
                        <img
                            src={still}
                            alt=""
                            width={440}
                            height={302}
                            style={{ width: 440, height: 302, objectFit: "cover", borderRadius: 18, border: "1px solid #3f3f46" }}
                        />
                    </div>
                )}
            </div>
        ),
        size
    );
}
