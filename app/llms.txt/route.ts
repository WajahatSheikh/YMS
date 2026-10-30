import { SITE, PRICE_LABEL, absoluteUrl } from "@/app/data/site";
import { SERVICES, serviceHref } from "@/app/data/services";
import { FAQS } from "@/app/data/faq";
import { INCLUDES, FIXED_SCOPE_FROM } from "@/app/data/subscription";

// /llms.txt — a plain-text map of the site for AI assistants and answer
// engines (format: https://llmstxt.org). Built from the same data files as the
// pages, so it can't say anything the site doesn't. Rendered once at build.

export const dynamic = "force-static";

export function GET() {
    const fixed = `$${FIXED_SCOPE_FROM.toLocaleString("en-US")}`;
    const link = (title: string, path: string, note: string) => `- [${title}](${absoluteUrl(path)}): ${note}`;

    const body = [
        `# ${SITE.name}`,
        "",
        `> ${SITE.description}`,
        "",
        `${SITE.name} is a product design and development studio for startups. One monthly subscription (${PRICE_LABEL}/month) buys a full product team (design, frontend, backend, QA and a technical PM) working on the client's product every week. No contracts; pause or cancel anytime. Fixed-scope projects start at ${fixed}. Clients own all code and design from day one.`,
        "",
        "Every subscription includes:",
        "",
        ...INCLUDES.map((item) => `- ${item}`),
        "",
        "## Pages",
        "",
        link("Home", "/", "overview, services, selected work, testimonials, process, pricing, team and FAQ."),
        link("Design subscription", "/design-subscription", "what the subscription includes and how it compares to hiring in-house or freelancers."),
        link("Pricing", "/pricing", `${PRICE_LABEL}/month subscription or fixed-scope projects from ${fixed}.`),
        link("Services", "/services", "every capability, with a page for each."),
        link("Process", "/process", "the first eight weeks and the weekly sprint with a Friday demo."),
        link("Team", "/team", "the people who design and build the product."),
        link("FAQ", "/faq", "pricing, process, ownership and team questions."),
        "",
        "## Services",
        "",
        ...SERVICES.map((service) => link(service.title, serviceHref(service), service.seo.description)),
        "",
        "## FAQ",
        "",
        ...FAQS.flatMap((faq) => [`### ${faq.question}`, "", faq.answer, ""]),
        "## Contact",
        "",
        `- Book a call: ${SITE.bookingUrl}`,
        `- Email: ${SITE.email}`,
        ...Object.entries(SITE.social)
            .filter(([, url]) => url)
            .map(([network, url]) => `- ${network[0].toUpperCase()}${network.slice(1)}: ${url}`),
        ""
    ].join("\n");

    return new Response(body, {
        headers: { "Content-Type": "text/plain; charset=utf-8" }
    });
}
