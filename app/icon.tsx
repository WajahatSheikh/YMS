import { ImageResponse } from "next/og";
import { brandMark } from "./lib/brandMark";

// Favicon and manifest icons, generated at build time. Next adds a
// <link rel="icon"> for each size; Google shows the favicon beside the site in
// search results and asks for at least 48px, so 192 and 512 cover that and the
// web app manifest (app/manifest.ts) as well.
const SIZES = [32, 192, 512] as const;

// The icons never change between requests: render each size once and cache it.
export const dynamic = "force-static";

export function generateImageMetadata() {
    return SIZES.map((size) => ({
        id: String(size),
        size: { width: size, height: size },
        contentType: "image/png"
    }));
}

export default async function Icon({ id }: { id: Promise<string> | string }) {
    const size = Number(await id);
    return new ImageResponse(brandMark(size), { width: size, height: size });
}
