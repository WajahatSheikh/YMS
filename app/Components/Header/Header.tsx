"use client";
import style from "./index.module.scss";
import { ctaGlow } from "@/app/lib/ctaGlow";
import { bookingLinkProps } from "@/app/lib/booking";
import HeaderList from "./HeaderList/HeaderList";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useLenis } from "@/app/contexts/LenisContext";
import { usePageTransition } from "@/app/contexts/PageTransitionContext";
import { NAVBAR_HEIGHT, scrollToSection as scrollTo } from "@/app/lib/scrollToSection";

// Order and labels come from the Figma nav (node 107:1388).
//
// On the home page every entry scrolls to the section with its id, so each id
// must exist there. On inner pages the entries are links: to the section's own
// page where there is one (`href`), otherwise back to the home section.
const NAV_ITEMS = [
    { text: "Services", id: "services", href: "/services" },
    { text: "Work", id: "work", href: "/#work" },
    { text: "Testimonials", id: "testimonials", href: "/#testimonials" },
    { text: "Process", id: "process", href: "/process" },
    { text: "Pricing", id: "pricing", href: "/pricing" },
    { text: "Team", id: "team", href: "/team" },
    { text: "FAQ", id: "faq", href: "/faq" }
] as const;

const isCurrentPage = (pathname: string | null, href: string) =>
    !href.includes("#") && !!pathname && (pathname === href || pathname.startsWith(`${href}/`));

const SECTION_IDS = NAV_ITEMS.map((item) => item.id);

const CallIcon = () => (
    <svg className={style.callIcon} viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <path
            d="M17.01 12.38C15.78 12.38 14.59 12.18 13.48 11.82C13.13 11.7 12.74 11.79 12.47 12.06L10.9 14.03C8.07 12.68 5.42 10.13 4.01 7.2L5.96 5.54C6.23 5.26 6.31 4.87 6.2 4.52C5.83 3.41 5.64 2.22 5.64 0.99C5.64 0.45 5.19 0 4.65 0H1.19C0.65 0 0 0.24 0 0.99C0 10.28 7.73 18 17.01 18C17.72 18 18 17.37 18 16.82V13.37C18 12.83 17.55 12.38 17.01 12.38Z"
            fill="currentColor"
        />
    </svg>
);

const BookACall = ({ className, placement }: { className?: string; placement: string }) => (
    <a className={`${style.cta} ${className ?? ""}`} {...bookingLinkProps(placement)} {...ctaGlow}>
        <CallIcon />
        <span>Book a call</span>
    </a>
);

// ── Portfolio header — back arrow + Book a Call ───────────────────────────────
const PortfolioHeader = () => {
    const { navigateTo } = usePageTransition();

    return (
        <header className={style.header}>
            <div className={style.inner}>
                <button className={style.backButton} onClick={() => navigateTo("/", "Home")} aria-label="Back to home">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                        <path
                            d="M15 9H3M3 9L8 4M3 9L8 14"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                    <span>Back</span>
                </button>
                <div className={style.right}>
                    <ThemeToggle />
                    <BookACall placement="header-case-study" />
                </div>
            </div>
        </header>
    );
};

// ── Main header ───────────────────────────────────────────────────────────────
const Header = () => {
    const pathname = usePathname();
    const isPortfolio = pathname?.startsWith("/portfolio");
    const isHome = pathname === "/";

    const [menuOpen, setMenuOpen] = useState(false);

    // A page link in the mobile sheet navigates; close the sheet when it does.
    useEffect(() => {
        setMenuOpen(false);
    }, [pathname]);
    const [activeSection, setActiveSection] = useState<string>(NAV_ITEMS[0].id);
    const [navHidden, setNavHidden] = useState(false);
    const lastScrollY = useRef(0);
    const menuOpenRef = useRef(false);
    const lenis = useLenis();

    useEffect(() => {
        menuOpenRef.current = menuOpen;
    }, [menuOpen]);

    // Lock body scroll while the mobile sheet is open.
    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [menuOpen]);

    useEffect(() => {
        if (isPortfolio) return;

        const handleScroll = () => {
            const scrollY = window.scrollY;

            if (!menuOpenRef.current) {
                if (scrollY < NAVBAR_HEIGHT) {
                    setNavHidden(false);
                } else if (scrollY > lastScrollY.current + 10) {
                    setNavHidden(true);
                } else if (scrollY < lastScrollY.current - 5) {
                    setNavHidden(false);
                }
            }
            lastScrollY.current = scrollY;

            let current = SECTION_IDS[0];
            for (const id of SECTION_IDS) {
                const el = document.getElementById(id);
                if (!el) continue;
                if (el.getBoundingClientRect().top <= NAVBAR_HEIGHT + 20) {
                    current = id;
                }
            }
            setActiveSection(current);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, [isPortfolio]);

    if (isPortfolio) return <PortfolioHeader />;

    const scrollToSection = (id: string) => {
        setMenuOpen(false);
        scrollTo(id, lenis);
    };

    const navItems = NAV_ITEMS.map((item) =>
        isHome ? (
            <HeaderList
                key={item.id}
                text={item.text}
                link={`#${item.id}`}
                isActive={activeSection === item.id}
                onClick={() => scrollToSection(item.id)}
            />
        ) : (
            <HeaderList key={item.id} text={item.text} link={item.href} isActive={isCurrentPage(pathname, item.href)} />
        )
    );

    return (
        <header className={`${style.header} ${navHidden ? style.navHidden : ""}`}>
            <div className={style.inner}>
                {/* Segmented nav pill — Figma "Status Toggle" */}
                <nav className={style.pill} aria-label="Primary">
                    <ul>{navItems}</ul>
                </nav>

                <div className={style.right}>
                    <ThemeToggle />
                    <BookACall className={style.ctaDesktop} placement="header" />
                    <button
                        className={style.hamburger}
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Toggle navigation"
                        aria-expanded={menuOpen}
                    >
                        <span className={`${style.bar} ${menuOpen ? style.barTop : ""}`} />
                        <span className={`${style.bar} ${menuOpen ? style.barMid : ""}`} />
                        <span className={`${style.bar} ${menuOpen ? style.barBot : ""}`} />
                    </button>
                </div>
            </div>

            {/* Mobile sheet */}
            <div className={`${style.mobileMenu} ${menuOpen ? style.open : ""}`}>
                <ul>{navItems}</ul>
                <BookACall className={style.ctaMobile} placement="header-mobile" />
            </div>
        </header>
    );
};

export default Header;
