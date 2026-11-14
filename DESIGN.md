# YourMomStudio: inner pages design notes

Scope: `/services`, the seven `/services/<slug>` pages, and `/compare/designme-alternative`.
They live inside the existing site, so they reuse its tokens:
- Stack Sans Notch display, Geist body, Geist Mono labels
- brand orange `#e85002`, `--gradient-brand`
- light and dark themes
- header, footer and booking modal

## Brief

- **Subject:** YourMomStudio, a five-person product team sold as a $3,999/month subscription.
- **Audience:** startup founders searching a specific service ("SaaS product design", "mobile app design", "2D game design studio"…).
- **Job:** rank for each service, then turn the visit into a booked call.
- **Constraints:**
  - Every fact comes from `app/data` (services, subscription, faq, testimonials, case studies).
  - No invented metrics.
  - Each page must say something the other six don't.

## Concepts considered

| Concept | Anchor | Orig | Fit | Feasible | Portable (low = good) |
|---|---|---|---|---|---|
| A. Mom's recipe card: each service as ingredients / method / serves | the studio's name | 4 | 2 | 4 | 1 |
| B. **The Friday demo:** each page is one sprint week of that service, Monday kickoff to the live demo on Friday | YMS's real weekly loop (Mon agenda, Tue to Thu build to staging, Fri live demo) | 4 | 5 | 4 | 2 |
| C. Spec sheet with part numbers | none specific | 2 | 3 | 5 | 4 |

**Picked: B.** The weekly Friday demo is the one thing every YMS page already promises, so making it the page's structure turns a claim into something you can see.

Concept A was rejected because it is charming but reads as a joke on a page meant to sell a $48k/year engagement.

## Concept card

```
Idea:        Every service page is one sprint week: what lands on Monday, what ships to staging mid-week, what you see live on Friday.
Metaphor:    a sprint board and a staging deploy
Signature:   the week strip, a sticky stage where scrolling moves "now" from Monday to Friday; each day lights in turn and the service's own reel goes from a grey staging preview to live colour on Friday
Emotion:     "these people actually ship, every week"
Motion verb: ship to staging: elements slide up into place with a short tick, like a deploy landing
Screenshot:  the week strip at Friday, five days lit, the reel live beside "Friday · live demo"
```

## System

- **Palette** (existing tokens):
  - ground `--bg-canvas`
  - raised `--bg-raised`
  - ink `--text-primary`
  - muted `--text-tertiary`
  - line `--border-default`
  - accent `#e85002` / `--text-brand`
  - the "now" marker is the brand gradient
- **Type:**
  - display Stack Sans Notch: H1 clamp(40px, 5.2vw, 84px), tracking -0.035em
  - body Geist 17/27
  - labels Geist Mono, 12 to 13px uppercase, +0.06em
- **Grid:**
  - the site's 1520px column with `--gutter`
  - asymmetric splits (7/5 hero, 4/8 index, 5/7 week strip)
  - section rhythm alternates tight (index) and tall (week strip)
- **Shape:**
  - 16px radius on media frames, 999px on chips
  - lists are rules, not cards
- **Motion:**
  - one ease (`expo.out`)
  - reveals rise 24px and fade in 0.9s
  - the week strip is scrubbed by scroll
  - the idle state is a slow pulse on the "now" dot
  - everything runs on GSAP's ticker via ScrollTrigger
  - reduced motion shows every day lit, the reel live, and no pin
- **Hover (one treatment per role):**
  - index rows: an orange rule draws in under the row and the arrow ships right
  - CTAs: the site's existing glow treatment

## Composition (service page)

```
[crumbs]                                   ┌──────────── reel ───────────┐
EYEBROW · label                            │  staging · Friday demo chip │
H1 service keyword                         │                             │
lead · updated · [Book a call] [Pricing]   └─────────────────────────────┘
─────────────────────────────────────────────────────────────────────────
WHAT YOU GET (4 col)  │ deliverable ............................ detail →
                      │ deliverable ............................ detail →
─────────────────────────────────────────────────────────────────────────
A WEEK OF <SERVICE> (sticky, desktop)
 MON ● ─── TUE ─── WED ─── THU ─── FRI          ┌ reel: grey → live ┐
 day title + note for the active day             └───────────────────┘
─────────────────────────────────────────────────────────────────────────
BRING US IN WHEN       (three large statements, ruled)
PROOF                  (testimonial in their words, or case studies)
PRICE                  $3,999/mo  |  fixed scope from $1,299  + includes
FAQ                    (four questions only this service answers)
OTHER SERVICES         (index list) → footer CTA
```

Genericness check: a generic build would use a centred hero, three feature cards and a shared FAQ. We replaced those with:
- an asymmetric split with the real reel
- a ruled index list instead of cards
- a FAQ written per service
- the week strip, which only works because YMS really runs a Friday demo

## Decisions recorded in QA

- **Hub (`/services`) and the compare page are still at rest.** They have no week strip; their life is in the hovers (index rows draw an orange rule, the thumb grows and the arrow ships right) and the reveals. A decorative idle wobble was not added just to pass a check.
- **The hero reel only plays on screens 992px and wider, after load.** On phones the poster stays a still: the playing video's first frame became the LCP element (11.9 s on a throttled phone), and with the still it is 1.8 s.
- **The week strip uses CSS `position: sticky` in a tall section, not a GSAP pin.** This is the same approach as the Tüit case study. The global `section` rule fought the pin spacer.
