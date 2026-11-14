import { TESTIMONIALS } from "@/app/data/testimonials";
import TestimonialSlider from "./TestimonialSlider";
import style from "./index.module.scss";

// 07 · Testimonials: "Founders, after they shipped".
//
// A big two-line heading with the slider's arrows on its right, then a row of
// tall testimonial cards that runs past the right edge of the page, dots under
// it and one line on who these people are. Card details and the hover state
// are described in TestimonialSlider.tsx.
//
// Everything that makes it read as real is real: logo, photo, name, role,
// project, location and the client's own words verbatim. No star ratings or
// badges we can't back up.

// Distinct countries, in the order they first appear.
const COUNTRIES = [...new Set(TESTIMONIALS.map((t) => t.country))];
const listFormat = (items: string[]) =>
    items.length > 1 ? `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}` : items.join("");

const Testimonial = () => (
    <section id="testimonials" className={style.section} aria-labelledby="testimonials-title">
        <TestimonialSlider items={TESTIMONIALS} />

        <p className={style.proofText}>
            {TESTIMONIALS.length} founders and product leads in {listFormat(COUNTRIES)}
        </p>
    </section>
);

export default Testimonial;
