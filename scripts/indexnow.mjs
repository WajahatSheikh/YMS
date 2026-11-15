// IndexNow: after a production build on Vercel, tell Bing, Yandex, Seznam and
// the other IndexNow engines which pages changed, so they recrawl them within
// hours instead of waiting for their next visit.
//
// "Changed" comes from the sitemap's <lastmod> (app/data/pageDates.ts and the
// case studies' published dates): only URLs whose lastmod is within the last
// three days are sent, so a redeploy that changed nothing sends nothing.
//
// The key below is public by design: engines verify it by fetching
// https://yourmomstudio.com/<key>.txt (public/<key>.txt). It never fails the
// build; any error is logged and skipped.
import fs from "node:fs";
import path from "node:path";

const KEY = "d4f56096b3a16a69fd8513d88bf2a8dd";
const HOST = "yourmomstudio.com";
const WINDOW_DAYS = 3;

if (process.env.VERCEL_ENV !== "production") {
    console.log("[indexnow] skipped (not a Vercel production build)");
    process.exit(0);
}

try {
    const distDir = process.env.NEXT_DIST_DIR || ".next";
    const file = path.join(distDir, "server", "app", "sitemap.xml.body");
    const xml = fs.readFileSync(file, "utf8");
    const since = Date.now() - WINDOW_DAYS * 24 * 60 * 60 * 1000;
    const urls = [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)]
        .map((m) => ({ loc: m[1].match(/<loc>([^<]+)<\/loc>/)?.[1], lastmod: m[1].match(/<lastmod>([^<]+)<\/lastmod>/)?.[1] }))
        .filter((u) => u.loc && u.lastmod && Date.parse(u.lastmod) >= since)
        .map((u) => u.loc);

    if (!urls.length) {
        console.log("[indexnow] no recently changed URLs");
        process.exit(0);
    }

    const res = await fetch("https://api.indexnow.org/indexnow", {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList: urls })
    });
    console.log(`[indexnow] sent ${urls.length} URLs, response ${res.status}`);
} catch (error) {
    console.log("[indexnow] skipped:", error instanceof Error ? error.message : error);
}
