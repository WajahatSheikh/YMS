import { ImageResponse } from "next/og";
import { brandMark } from "./lib/brandMark";

// Home-screen icon for iPhone and iPad (apple-touch-icon), 180×180.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
    return new ImageResponse(brandMark(size.width, { rounded: false }), size);
}
