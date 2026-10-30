import type { MetadataRoute } from "next";
import { SITE } from "./data/site";

// /robots.txt — everything is crawlable; the sitemap tells crawlers what matters.
//
// The AI search and assistant crawlers are named explicitly so the welcome is
// unambiguous: being read by them is how the site gets cited in ChatGPT,
// Perplexity, Claude and Google's AI answers. /llms.txt summarises the site
// for them.
const AI_CRAWLERS = [
    "GPTBot",
    "OAI-SearchBot",
    "ChatGPT-User",
    "ClaudeBot",
    "Claude-SearchBot",
    "Claude-User",
    "PerplexityBot",
    "Perplexity-User",
    "Google-Extended",
    "Applebot-Extended"
];

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            { userAgent: "*", allow: "/" },
            { userAgent: AI_CRAWLERS, allow: "/" }
        ],
        sitemap: `${SITE.url}/sitemap.xml`
    };
}
