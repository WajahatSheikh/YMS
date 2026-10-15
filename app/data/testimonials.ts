// Client testimonials. Every quote is the client's own words, verbatim.
//
// `highlight` must be an exact substring of `quote` — it is the line the design
// marks up, not a rewrite. `result` is a short tag drawn from what the client
// says; keep both honest (no ratings, scores or claims the quote doesn't make).

export interface Testimonial {
    name: string;
    role: string;
    company: string;
    avatar: string;
    /** Avatar is a logo mark that needs a light ground. */
    avatarOnWhite?: boolean;
    logo: string;
    /** Rendered logo width at the 28px logo height. */
    logoWidth: number;
    project: string;
    location: string;
    country: string;
    quote: string;
    highlight: string;
    result: string;
}

export const TESTIMONIALS: Testimonial[] = [
    {
        name: "Aysha Abdul Rab",
        role: "Founder",
        company: "Global Learners Education",
        avatar: "/assets/images/Testimonial%20Avatar/global.png",
        avatarOnWhite: true,
        logo: "/assets/images/client-logos/logo-06-global.png",
        logoWidth: 108,
        project: "Website design",
        location: "Ras al-Khaimah, UAE",
        country: "UAE",
        quote: "Working with YMS was seamless. They delivered our complete website in just 1 week, on time and beyond expectations. The design quality, attention to detail and communication throughout the process was outstanding. Highly recommend",
        highlight: "They delivered our complete website in just 1 week, on time and beyond expectations.",
        result: "Website live in 1 week"
    },
    {
        name: "Hassan Bin Rizwan",
        role: "Director, P@SHA",
        company: "SABAQ",
        avatar: "/assets/images/Testimonial%20Avatar/hbr.png",
        logo: "/assets/images/client-logos/logo-01-sabaq.png",
        logoWidth: 98,
        project: "Mobile game design",
        location: "Karachi, Pakistan",
        country: "Pakistan",
        quote: "A highly impactful collaboration on the MUSE Learning App, where complex school curriculum was transformed into fun, interactive, and engaging mobile games for kids. The work focused on turning traditional learning content into playful experiences that improve understanding and retention",
        highlight: "complex school curriculum was transformed into fun, interactive, and engaging mobile games for kids",
        result: "Curriculum into games"
    },
    {
        name: "Azeem Illyas",
        role: "Founder",
        company: "AA Animation Studio",
        avatar: "/assets/images/Testimonial%20Avatar/Azeem.png",
        logo: "/assets/images/client-logos/logo-05-aa-studio.png",
        logoWidth: 103,
        project: "Investor pitch deck",
        location: "Sugar Land, Texas, USA",
        country: "USA",
        quote: "Yourmomstudio brought our investor pitch deck to life with a clean, strategic, and visually powerful approach. The team was fast, detail-focused, and incredibly easy to collaborate with. One of the few studios that truly understands how to turn ideas into impactful presentations.",
        highlight: "One of the few studios that truly understands how to turn ideas into impactful presentations.",
        result: "Investor-ready deck"
    },
    {
        name: "Muhammad Umair",
        role: "Product Delivery Manager",
        company: "Digital Gravity",
        avatar: "/assets/images/Testimonial%20Avatar/umair.png",
        logo: "/assets/images/client-logos/DG.png",
        logoWidth: 66,
        project: "Web management system",
        location: "Dubai, UAE",
        country: "UAE",
        quote: "A highly professional and detail-oriented team to work with. The web management system was designed with a clear understanding of both user experience and business requirements, resulting in a platform that feels modern, scalable, and easy to navigate.",
        highlight: "a platform that feels modern, scalable, and easy to navigate.",
        result: "Scalable platform"
    },
    {
        name: "Suhail Sajid Panjwani",
        role: "CMO",
        company: "Paramount Students",
        avatar: "/assets/images/Testimonial%20Avatar/sp.png",
        logo: "/assets/images/client-logos/logo-03-paramount.png",
        logoWidth: 96,
        project: "Mobile products",
        location: "Istanbul, Türkiye",
        country: "Türkiye",
        quote: "Working on multiple mobile products together was a great experience. From student communities and dorm management to university admission platforms, the entire process was handled with strong product thinking, creativity, and attention to detail.",
        highlight: "handled with strong product thinking, creativity, and attention to detail.",
        result: "Multiple products"
    }
];
