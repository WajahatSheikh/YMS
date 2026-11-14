// Content for the /services/<slug> pages that the shared service data
// (app/data/services.ts) doesn't carry: what each deliverable means, how a
// sprint week of this service runs, when to bring us in, and the questions
// only this service answers. Every page says something the other six don't.
//
// Honesty rules: no numbers that aren't true, no client names that aren't in
// app/data/testimonials.ts, and the week describes our real loop (Monday
// agenda, Tuesday to Thursday design and build to staging, Friday live demo).

export interface ServicePage {
    /** Deliverables, in the same order as the service's `tags`. */
    deliverables: { name: string; detail: string }[];
    /** One sprint week of this service, Monday to Friday. */
    week: { day: "Mon" | "Tue" | "Wed" | "Thu" | "Fri"; title: string; note: string }[];
    /** Situations where this service is the right call. */
    fit: string[];
    faqs: { question: string; answer: string }[];
    /** Proof to show: a testimonial by client name, and/or our website case studies. */
    proof?: { testimonial?: string; caseStudies?: boolean };
}

export const SERVICE_PAGES: Record<string, ServicePage> = {
    "product-design": {
        deliverables: [
            { name: "UI & UX design", detail: "Screens designed in the context of the whole flow, with every state your engineers will ask about." },
            { name: "MVP & prototype design", detail: "The smallest version that proves the idea, clickable before a line of code is written." },
            { name: "Design systems & component libraries", detail: "Tokens, components and usage rules in Figma that match how the product is built." },
            { name: "User flows & wireframing", detail: "The journey mapped end to end first, so screens answer real steps instead of guesses." },
            { name: "Mobile & responsive design", detail: "Layouts drawn for phone, tablet and desktop, not one size stretched to fit." },
            { name: "Usability testing & iteration", detail: "Real people try the prototype; what trips them up goes into the next sprint." }
        ],
        week: [
            { day: "Mon", title: "You set the agenda", note: "We agree which flow ships this week and what done looks like." },
            { day: "Tue", title: "Flows and wireframes", note: "The journey and the key screens are sketched in low fidelity, in your workspace." },
            { day: "Wed", title: "High-fidelity screens", note: "Screens are designed on the design system, with empty, error and loading states." },
            { day: "Thu", title: "Prototype and handover", note: "The flow becomes clickable and is annotated for build, so engineering can start." },
            { day: "Fri", title: "Live demo", note: "You click through the prototype with us and we plan the next sprint from your notes." }
        ],
        fit: [
            "You have an idea and funding, and need the first version designed so engineers can build it without guessing.",
            "Your product works but feels stitched together, and every new feature makes it a little harder to use.",
            "Your engineers keep asking what a screen should do when there is no data, an error or a slow connection."
        ],
        faqs: [
            {
                question: "Do you design in our Figma or yours?",
                answer: "In yours if you have one. Everything we make lives in your workspace from day one, so nothing has to be handed over or bought out later."
            },
            {
                question: "What does dev-ready actually mean?",
                answer: "Every screen comes with its states (empty, loading, error), uses components from the design system, and is annotated for build. Engineers start building instead of asking questions."
            },
            {
                question: "Can you design an MVP before we have engineers?",
                answer: "Yes. We design the MVP and can build it too, since design, frontend, backend and QA are in the same subscription."
            },
            {
                question: "How soon do we see screens?",
                answer: "Working design in week one, and a clickable flow on staging by the end of week two. After that, a live demo every Friday."
            }
        ]
    },

    websites: {
        deliverables: [
            { name: "Marketing & company websites", detail: "The pages that explain what you do, prove it and get a visitor to book or buy." },
            { name: "Landing pages & campaign sites", detail: "One page, one job: built to convert a specific audience from a specific channel." },
            { name: "Webflow & Framer development", detail: "Built on the platform your team can edit, or in custom code when it needs more." },
            { name: "CMS setup & content architecture", detail: "Collections and templates set up so publishing a page never needs a developer." },
            { name: "SEO-ready page structure", detail: "One H1 per page, clean headings, metadata, schema and a sitemap, from launch day." },
            { name: "Responsive & mobile-first design", detail: "Designed for the phone first, because that is where most visitors arrive." }
        ],
        week: [
            { day: "Mon", title: "You set the agenda", note: "We agree which pages ship this week, what each one has to do, and the copy we have." },
            { day: "Tue", title: "Structure and copy", note: "Sitemap, page sections and headlines are laid out before anything is styled." },
            { day: "Wed", title: "Design in the system", note: "Pages are designed for phone, tablet and desktop on one set of components." },
            { day: "Thu", title: "Build to staging", note: "The same people build what they designed, so staging looks exactly like the comp." },
            { day: "Fri", title: "Live demo", note: "You click through the real pages on staging and we plan what goes live next." }
        ],
        fit: [
            "Your website explains last year's product, and sales calls start by correcting it.",
            "You are launching or raising and need a site that looks as serious as the product.",
            "Your marketing team waits on a developer for every page change."
        ],
        faqs: [
            {
                question: "Webflow, Framer or custom code?",
                answer: "Webflow or Framer when your team wants to edit the site visually, custom code when the site needs logic, integrations or performance a builder can't give. We recommend one after the first call."
            },
            {
                question: "Will the site look like the design?",
                answer: "Yes. The same team designs and builds it, so there is no handoff where details get lost. The site goes live looking the way it looked in the comp."
            },
            {
                question: "Do you write the copy?",
                answer: "We structure every page and write headlines and section copy with you. You bring the product knowledge; we make it read clearly."
            },
            {
                question: "Is SEO included?",
                answer: "The foundations are: page structure, headings, metadata, schema, sitemap, image alt text and fast pages. Ongoing content and link building are a separate job."
            }
        ],
        proof: { testimonial: "Aysha Abdul Rab", caseStudies: true }
    },

    "mobile-app": {
        deliverables: [
            { name: "iOS & Android app design", detail: "Native-feeling screens for both stores, designed around one thumb and short sessions." },
            { name: "Cross-platform development (React Native / Flutter)", detail: "One codebase for iOS and Android, so features ship to both at once." },
            { name: "Onboarding & user flow design", detail: "The first minute in the app, designed so people reach the value before they leave." },
            { name: "App Store & Play Store launch support", detail: "Store listings, screenshots and the review process handled with you." },
            { name: "Push notifications, payments & third-party integrations", detail: "The plumbing that makes an app useful: messages, checkout and the services you rely on." },
            { name: "Post-launch updates & performance tuning", detail: "Release after release, with crashes, speed and reviews watched between them." }
        ],
        week: [
            { day: "Mon", title: "You set the agenda", note: "We agree the flow or feature for the week, for both iOS and Android." },
            { day: "Tue", title: "Flow on the phone", note: "The flow is designed at phone size first, checked against one-handed use." },
            { day: "Wed", title: "Build the feature", note: "Screens are built in the cross-platform codebase with real data where it exists." },
            { day: "Thu", title: "Test on devices", note: "QA runs the build on real iPhones and Android phones, not only a simulator." },
            { day: "Fri", title: "Live demo", note: "You install the build on your own phone and try it with us." }
        ],
        fit: [
            "You need one app on iOS and Android and can't afford two separate teams.",
            "People download your app and stop using it within the first few minutes.",
            "Your web product works and your users keep asking for an app."
        ],
        faqs: [
            {
                question: "Native or cross-platform?",
                answer: "Usually cross-platform (React Native or Flutter): one codebase, both stores, one team. If your app needs something only native can do, we will say so on the first call."
            },
            {
                question: "Do you publish the app to the stores?",
                answer: "We prepare the build, the listing and the screenshots and take it through review with you. The apps are published under your own developer accounts, so you own them."
            },
            {
                question: "Can we test before launch?",
                answer: "Yes. Every Friday you get a build to install on your own phone, so you are trying the real app long before it goes public."
            },
            {
                question: "Who maintains the app after launch?",
                answer: "We can, on the same subscription: updates, new OS versions, crash fixes and new features. Or we hand over the code and docs to your team."
            }
        ],
        proof: { testimonial: "Suhail Sajid Panjwani" }
    },

    "saas-products": {
        deliverables: [
            { name: "SaaS product strategy & UX design", detail: "Which problems the product solves first, and the flows that make that obvious." },
            { name: "Dashboard & data visualization design", detail: "Numbers people act on, not decoration: the right chart for each question." },
            { name: "Onboarding flows that turn trials into paying users", detail: "The path from sign-up to the first moment the product is worth paying for." },
            { name: "Multi-role access & admin experiences", detail: "Owners, admins and members each see what they need, and nothing they shouldn't." },
            { name: "Design systems built to scale with your team", detail: "Components and rules that keep the product consistent as more people build it." },
            { name: "Front-end development, ready for your engineers or ours", detail: "Production front end your team can extend, or that we keep building with you." }
        ],
        week: [
            { day: "Mon", title: "You set the agenda", note: "We pick the feature or flow for the week and the metric it should move." },
            { day: "Tue", title: "Map the roles", note: "Who uses the feature, what each role needs to see, and what happens with real data." },
            { day: "Wed", title: "Design and build", note: "The feature is designed on the design system and the front end starts in parallel." },
            { day: "Thu", title: "Staging with real data", note: "The feature runs on staging with realistic data, empty states and permissions." },
            { day: "Fri", title: "Live demo", note: "You use the feature on staging and decide what ships to customers." }
        ],
        fit: [
            "Trials sign up and don't convert, and you suspect onboarding is the reason.",
            "Your dashboard shows everything and helps nobody decide anything.",
            "Every new feature is designed from scratch and the product no longer feels like one product."
        ],
        faqs: [
            {
                question: "Can you work with our existing engineering team?",
                answer: "Yes. We can design and build the front end while your engineers own the backend, or design only and hand over dev-ready files. We work in your Slack and your repositories."
            },
            {
                question: "Do you redesign the whole product at once?",
                answer: "Rarely. We usually fix the flow that costs you most first (often onboarding), ship it, and move on feature by feature, so customers never face a big-bang change."
            },
            {
                question: "Who owns the design system?",
                answer: "You do, like everything else we make. It lives in your Figma and your codebase from day one."
            },
            {
                question: "How do you design dashboards?",
                answer: "We start from the decisions people make with the data, then choose the views that answer them. Every chart has to earn its place."
            }
        ]
    },

    "web-management-system": {
        deliverables: [
            { name: "Custom admin panels & internal tools", detail: "The screens your team uses all day, built around your real process." },
            { name: "Role-based dashboards & permissions", detail: "Each person sees their own work, and managers see everyone's." },
            { name: "Workflow automation & approval flows", detail: "Requests, approvals and reminders that move on their own instead of by WhatsApp." },
            { name: "Reporting, analytics & data export", detail: "The reports you rebuild in spreadsheets every month, generated in one click." },
            { name: "CRM, inventory, HR & booking systems", detail: "The system your business needs, rather than a template that makes you adapt." },
            { name: "Secure cloud hosting, training & ongoing support", detail: "Hosted, backed up and explained to your staff, with us on hand afterwards." }
        ],
        week: [
            { day: "Mon", title: "You set the agenda", note: "We pick one process to move off spreadsheets this week and who uses it." },
            { day: "Tue", title: "Map the process", note: "Every step, approval and exception is written down with the people who do it." },
            { day: "Wed", title: "Design the screens", note: "Screens are designed for the roles involved: staff, managers and admins." },
            { day: "Thu", title: "Build and import", note: "The module is built on staging and loaded with a copy of your real data." },
            { day: "Fri", title: "Live demo", note: "Your team tries the module with us and we fix what doesn't match how they work." }
        ],
        fit: [
            "Your operations run on spreadsheets, WhatsApp threads and someone remembering to follow up.",
            "Off-the-shelf software made you change how you work, and your team works around it.",
            "You need managers to see what is happening without asking anyone."
        ],
        faqs: [
            {
                question: "Why custom instead of off-the-shelf software?",
                answer: "When your process is what makes you good, a template that forces you to change it costs more than it saves. A custom system fits the way your team already works."
            },
            {
                question: "Can you move our existing data over?",
                answer: "Yes. We import from your spreadsheets or current tools onto staging first, check it with you, then move it for real at launch."
            },
            {
                question: "Where is it hosted and who owns it?",
                answer: "On secure cloud hosting in your own account, and you own the code and the data. Nothing is locked to us."
            },
            {
                question: "Do you train our staff?",
                answer: "Yes. Training and ongoing support are part of the service, and the Friday demos mean your team has used each module before it goes live."
            }
        ]
    },

    "game-design": {
        deliverables: [
            { name: "Game concept & core loop design", detail: "What the player does every few seconds, and why they want one more round." },
            { name: "2D character, environment & asset design", detail: "Characters and worlds with one consistent style, drawn to be animated." },
            { name: "Game UI/UX, menus, HUD & onboarding", detail: "The interface that holds the game together without getting in the player's way." },
            { name: "Level design & progression systems", detail: "Difficulty that rises at the right pace, so players feel clever, not stuck." },
            { name: "Animation-ready art & sprite sheets", detail: "Assets layered and exported the way your engine and animators need them." },
            { name: "Branded & promotional games", detail: "Short games that carry a brand or a lesson and are actually fun to play." }
        ],
        week: [
            { day: "Mon", title: "You set the agenda", note: "We agree the mechanic, level or set of assets for the week." },
            { day: "Tue", title: "Sketch and loop", note: "Rough sketches and a paper version of the loop, to check it is fun before it is pretty." },
            { day: "Wed", title: "Characters and worlds", note: "Characters, environments and UI are drawn in the game's art style." },
            { day: "Thu", title: "Export for the engine", note: "Assets are cut, layered and exported as sprite sheets for your engine." },
            { day: "Fri", title: "Live demo", note: "You see the art in a playable scene and we plan the next level." }
        ],
        fit: [
            "You are building a 2D mobile or casual game and need its art and design done properly.",
            "You need to turn learning content or a brand into something people choose to play.",
            "Your game plays well but looks unfinished next to the competition."
        ],
        faqs: [
            {
                question: "Do you do 3D games?",
                answer: "2D game design is done in-house. For 3D or advanced motion work we bring in specialists we've worked with before, and we will tell you up front if it's outside what we do well."
            },
            {
                question: "Which engines do you deliver for?",
                answer: "We export art, sprite sheets and UI the way your engine expects them. Tell us your engine on the first call and we set up the export around it."
            },
            {
                question: "Can you design educational games?",
                answer: "Yes. For SABAQ's MUSE Learning App we turned school curriculum into playful mobile games for kids."
            },
            {
                question: "Who owns the characters and art?",
                answer: "You do. Every file, character and asset is yours from day one, with no licence to renew."
            }
        ],
        proof: { testimonial: "Hassan Bin Rizwan" }
    },

    "brand-identity": {
        deliverables: [
            { name: "Logo design & brand mark variations", detail: "A mark with versions that work as small as an app icon and as large as a stage banner." },
            { name: "Color palette, typography & visual language", detail: "Colours, type and shapes chosen for screens first, with accessible contrast built in." },
            { name: "Brand guidelines your team can actually use", detail: "Short, practical rules with real examples, not a 60-page PDF nobody opens." },
            { name: "Social media & marketing templates", detail: "Templates your team fills in, so every post looks like the same brand." },
            { name: "Stationery, pitch deck & presentation design", detail: "The story of your company in slides investors can follow without you in the room." },
            { name: "Brand voice & messaging direction", detail: "How you sound in a headline, an email and an error message." }
        ],
        week: [
            { day: "Mon", title: "You set the agenda", note: "We agree what the brand has to say, to whom, and what you already have." },
            { day: "Tue", title: "Directions", note: "Two or three clearly different directions, each shown on real screens, not on a blank page." },
            { day: "Wed", title: "Refine one", note: "You pick a direction and we refine the mark, colour and type around it." },
            { day: "Thu", title: "Put it to work", note: "The brand is applied to your website, deck and social templates." },
            { day: "Fri", title: "Live demo", note: "You see the brand across everything at once and we plan the guidelines." }
        ],
        fit: [
            "Your product has outgrown the logo you made in a weekend.",
            "You are raising and need a deck and a brand that look as serious as the business.",
            "Every designer who touches your marketing makes it look slightly different."
        ],
        faqs: [
            {
                question: "How many logo options do we get?",
                answer: "Two or three distinct directions, each shown on real applications. We'd rather refine one strong idea with you than hand over twenty weak ones."
            },
            {
                question: "Do you design pitch decks?",
                answer: "Yes. AA Animation Studio's investor deck is one example, and a deck can be done on its own or as part of a full identity."
            },
            {
                question: "What files do we receive?",
                answer: "The logo in every format you need, colour and type specs, templates, and the guidelines, all in your own Figma and drive."
            },
            {
                question: "Can you apply the brand to our product and website too?",
                answer: "Yes. The same team designs and builds websites and products, so the brand doesn't stop at the guidelines."
            }
        ],
        proof: { testimonial: "Azeem Illyas" }
    }
};
