// Opt-in for the cursor-tracked highlight in the `brand-cta-glow` SCSS mixin:
// spread `{...ctaGlow}` onto a button or link.
//
// A data attribute rather than an event handler, so it works inside server
// components too. One delegated listener (app/Components/CtaGlow/CtaGlow.tsx)
// writes the two custom properties the stylesheet reads; the gradient itself
// lives in the mixin, so the look can be retuned without touching this.
export const ctaGlow = { "data-glow": "" } as const;
