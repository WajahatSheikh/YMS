// The team, shown by the Team section (home and /team) and described to search
// engines as Person nodes in the /team page schema, from this one list.

export interface Member {
    name: string;
    position: string;
    /** Revealed on hover — the specialty line the component note describes. */
    specialty: string;
    photo: string;
}

export const MEMBERS: Member[] = [
    {
        name: "Wajahat Sheikh",
        position: "Head of Product Design",
        specialty: "Sr. Product Designer | Game Designer | AI SaaS | UX & UI | B2B & B2C Platforms",
        photo: "/assets/images/wajahat.png"
    },
    {
        name: "Hamza Mithani",
        position: "Marketing Manager",
        specialty: "Senior Marketing Manager | SEO, Paid Ads & Content Strategy | Driving growth and revenue for SaaS and digital brands",
        photo: "/assets/images/hamza.webp"
    },
    {
        name: "Agha Zeeshan",
        position: "Technical Product Manager",
        specialty: "Technology Consultant | Program Manager | Technical Project Manager | Technical Product Owner | Scrum Master | Agile Practitioner | Business Analyst | CSM® | CSPO® | SSYB™",
        photo: "/assets/images/agha-v2.jpg"
    },
    {
        name: "Huzaifa Iqbal",
        position: "Senior Front End Developer",
        specialty: "Senior Frontend Architect | React.js, Next.js & React Native | Building scalable, high-performance web & mobile products",
        photo: "/assets/images/huzaifa-v2.jpg"
    },
    {
        name: "Imran",
        position: "Lead Software Test Engineer",
        specialty: "Automation Engineer | QA Automation | Selenium | Playwright | Python | API Testing | CI/CD | Web & End-to-End Testing | Agile",
        photo: "/assets/images/imran.webp"
    }
];
