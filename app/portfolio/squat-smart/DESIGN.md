# Squat Smart case study · design notes (/awwwards pass)

Scope: one art-directed case-study page inside the existing YMS Next.js site
(`/portfolio/squat-smart`). Stack: the site's own Next.js App Router, SCSS modules and GSAP
(already a dependency); Lenis stays site-level. No GL: this is a product story, and the craft
goes into type, the mat drawing and motion.

## Brief

- **Subject:** Squat Smart, an at-home squat training mat printed with A, B and C foot zones.
  YourMomStudio designed the landing page and product page in two directions; the client
  approved B, and we built it on Shopify. It is live at squatsmart.com.
- **Audience:** founders and marketers of DTC brands looking for a studio, reading our work.
- **Job:** show that we can turn a product's own logic into a store that sells, and get a call.
- **Facts used (all real):** 4.7 rating from 10,656 verified reviews, 5 to 10 minutes a day,
  3 zones, 2 directions → 1 approved, $37.97, FAQ answers, and customer reviews from the live store.
- **Assumptions:** none invented. No sales or conversion numbers (the client shared none).

## Concepts

| | Idea | Anchor | Signature | O/F/Fe/P |
|---|---|---|---|---|
| A. Material | The page is the mat: you read it like a rep, and your pointer or scroll sets the stance | the mat's printed A/B/C foot zones (wide, centre, narrow) | feet on a drawn mat slide to the stance; a sticky zone stage scrubs A→B→C | 4/5/4/1 |
| B. Process | Ten chapters counted as ten reps at a squat tempo | "5 to 10 minutes a day" | a tempo metronome paces chapters | 3/4/4/2 |
| C. Formal | Everything split down the middle, Direction A against B | the two revisions | split wipe on every section | 3/3/3/3 |

Picked **A**. It can't be moved to another brand and it drives layout, motion and copy. The tempo
idea from B becomes the idle state (a slow rep). C survives as one chapter, the compare slider.

## Concept card

```
Idea:        The case study is the mat: read it like a rep, and your pointer sets your stance.
Metaphor:    the printed Squat Smart mat (zones A wide, B centre, C narrow) and a squat rep.
Signature:   the stance mat. In the hero the feet follow the pointer across the zones; in
             chapter 04 a sticky stage scrubs A → B → C with scroll and the copy follows.
             (Recipe: motion.md "Pinned chapters" with CSS sticky, driven by one variable.)
Emotion:     calm confidence, the soft studio light of the approved design, with a coach's
             directness.
Motion verb: press and spring back, like a rep: things sink a little, then spring home
             (back.out ease, 0.5 to 0.7 s).
Screenshot:  the hero: FIND YOUR STANCE. beside the drawn mat, feet planted on zone B, the
             zone label reading "Zone B · Quads".
```

## Driver

One variable per mat, `stance` (0 = C narrow … 1 = A wide), mapped to everything on that mat:
foot spread, active band, the zone label and the copy panel. Inputs:

- hero mat: pointer x (lagged), idle tempo when the pointer is still, a fixed B on touch;
- zone stage: the stage's scroll progress (3 equal segments); the A/B/C tabs jump to a segment;
- the zone rail: whole-page progress moves the footprint, and each chapter lights its tick.

Idle: a rep at 0.25 Hz. The feet sink 3 px and flatten 4 % on the way down, then spring back.
It runs on `gsap.ticker` only while the mat is on screen. Off under reduced motion.

## System

- **Palette** (the client's): ground blush `#F9ECED`, ink `#181818`, muted `#4D4446`,
  line `rgba(24,24,24,.12)`, accent coral `#FF6D6D` (fills; text `#B4232B`), action sky
  `#00ADFA` (fills only, ink on it), night `#1A1A1C`.
- **Type:** display Saira Condensed 800 (web stand-in for the client's Evogria, which appears
  as real images in Foundations), text Inter 300 to 600. Display tracking -0.005em, leading 0.82
  to 0.95. Body 16 to 20 px, leading 1.55.
- **Grid:** 1600 max, the site gutter, 12-column intent; chapter heads 7/5 split.
- **Shape:** 3 px on buttons, 8 to 16 px on cards and frames, full round on chips and rail.
- **Motion:** ease `cubic-bezier(.16,1,.3,1)` for reveals, `back.out(1.7)` for the press and
  spring. Big moves 0.8 to 0.9 s, small 0.25 to 0.5 s, staggers 40 to 60 ms.

## Micro-interactions (one per role)

- Primary buttons: **press**. A fill rises from the bottom edge like a foot pressing the mat,
  the label inverts, and on active the button sinks 2 px.
- Work images and screens: **lift**. Scale 1.03 inside their clip with the frame shadow
  tightening.
- Tabs and swatches: **spring**. A small nudge with the back ease.
- Utility links and chips: color and underline only.

## Composition plan (a different family per section)

```
Hero      [ FIND YOUR / STANCE. (huge, left) | stance mat + zone label (right) ]
          [ intro · zone chips · byline ] then [ browser + phone, tilted ]
01 Brief  dark: [ title 7 | body 5 ] / [ 4 stat tiles, counters ] / [ facts 3-col ]
02 Dirs   white: full-bleed compare slider, captions split left/right
03 Found. blush: 6 copyable swatches strip / [ Evogria images 1.6 | SF Pro 1 ]
04 Zones  dark: STICKY STAGE (mat left, tabs + panel right), 3 scroll segments
05 Live   blush: [ product card | buttons + FAQ ]
06 Pages  rose: two scrollable full-page windows
07 Detail white: wide, wide, then 2-up crops with captions
08 Resp.  petal: browser + iPad + phone overlapping trio
09 Phones coral: full-bleed drag rail of 8 phones, staggered
10 Launch white: 4 steps, last one blue, live link
Closing   black: THANKS FOR THE REPS. + CTA; then the next case study
```

## Genericness test

- "Hero with a browser mockup" is what a generic model makes. Changed: the hero's poster is
  the mat and the feet, and the devices sit below the fold.
- "Fade-up on every section" was the only motion. Changed: reveals stay, but the concept moves
  on its own driver (stance) and the zone chapter is a scroll-scrubbed stage.
- Plain color-swap hovers. Changed: one press treatment for buttons, lift for screens.
