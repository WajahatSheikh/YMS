import HeroSection from "./Components/HeroSection/HeroSection";
import TrustedBy from "./Components/TrustedBy/TrustedBy";
import Showreel from "./Components/Showreel/Showreel";
import Services from "./Components/Services/Services";
import Client from "./Components/Client/Client";
import ShippedWith from "./Components/ShippedWith/ShippedWith";
import Testimonial from "./Components/Testimonial/Testimonial";
import HowItWorks from "./Components/HowItWorks/HowItWorks";
import Package from "./Components/Package/Package";
import { TeamSection } from "./Components/TeamSection/TeamSection";
import FAQSection from "./Components/FAQ/FAQSection";
import JsonLd from "./Components/Seo/JsonLd";

// Section order mirrors the Figma home page (file XrSiLLpbOI4fPG4A771F2e):
//   02 Hero · 04 Logos · 03 Showreel · 05 Services · 06 Work · 07 Testimonials
//   08 Process · 09 Pricing · 11 Team · 12 FAQ · 07b Shipped with YMS
// (07b sits last on request, immediately above the footer).
// Header and footer are rendered by Wrapper, outside <main>.
//
// Removed on request: 13 CTA ("Let's build digital products…") and 10 About
// ("Who we are"). Their components are kept in app/Components, so putting
// either back is a one-line change here plus NAV_ITEMS in Header.
export default function Home() {
    return (
        <main id="main">
            <JsonLd />
            <HeroSection />
            <TrustedBy />
            <Showreel />
            <Services />
            <Client />
            <Testimonial />
            <HowItWorks />
            <Package />
            <TeamSection />
            <FAQSection />
            <ShippedWith />
        </main>
    );
}
