# ONA TOWERS — FINAL VS CODE / CODEX IMPLEMENTATION PROMPT

You are working inside the existing ONA Towers React/Vite project in this workspace.

## NON-NEGOTIABLE GOAL

Finish this project using the REAL ONA assets already included in:

`public/ona-assets/`

and make the website factually honest using the verified information already present in the project and the rules below.

Do **not** redesign the whole site from scratch.
Do **not** replace sections that are already visually strong.
Do **not** invent project specifications.
Do **not** use external stock/Unsplash images after this task.
Do **not** push to Git automatically.

Keep the current cinematic direction, typography, palette, responsive system, section order, Life at ONA storytelling, and existing motion language unless a small change is needed for factual accuracy, image fit, readability, or build quality.

The task is mainly:

1. Replace every temporary/Unsplash image with the supplied official ONA image/plan assets.
2. Correct any remaining fabricated or unsupported content.
3. Make factual UI data come from one verified source of truth.
4. Remove fake enquiry success/contact information.
5. Keep the site visually premium and coherent.
6. Run lint/build and fix all regressions.

---

# 1. FIRST INSPECT THE PROJECT

Before editing:

- run `git status` if this is already a Git repository
- inspect `src/App.tsx`
- inspect `src/data/projectFacts.ts`
- inspect `src/data/residences.ts`
- inspect `src/data/images.ts`
- inspect all components in `src/components/`
- inspect `public/ona-assets/`
- inspect `IMAGE_PLACEMENT_MAP.md`

Do not assume the current generated content is true merely because it already exists in code.

---

# 2. SOURCE OF TRUTH — VERIFIED ONA FACTS

Use only these confirmed facts unless another existing project source clearly verifies something else.

## Project

- Project name: `ONA Towers`
- Location: `Zanzibar`
- Brand line: `Ishii juu. Ona zaidi.`
- The development contains:
  - 2 residential towers
  - 1 separate commercial / service building
  - residential, commercial/work and lifestyle functions

The storytelling labels `LIVE / LIFE / WORK` are allowed as creative brand language.

## Residential towers

BOTH Tower A and Tower B are residential.

Each residential tower has:

- ground level with parking / building services
- 11 residential floors
- 1 penthouse level
- approximately 46 apartments per residential tower

Do not describe either residential tower as a commercial tower.

## Typical residential floor

- 4 residences per typical floor
- 2 × two-bedroom residences
- 2 × three-bedroom residences

## Two-bedroom residence

- 2 bedrooms
- approx. 203 sqm

## Three-bedroom residence

- 3 bedrooms
- approx. 236 sqm

## Penthouse level

Two signature penthouse types are confirmed:

- 3-bedroom penthouse — approx. 416 sqm
- 4-bedroom penthouse — approx. 482 sqm

## Commercial / service building

Confirmed functions shown/supported by supplied project drawings include:

### Ground floor
- supermarket
- coffee / work area
- reception / waiting / display area
- entrance / office / supporting spaces

### Parking
- 2 parking levels

### Office
- office level

### Terrace / lifestyle level
- restaurant
- outdoor restaurant
- pool
- gym

These are enough to build the Commercial and Life at ONA sections honestly.

---

# 3. REMOVE / DO NOT REINTRODUCE FABRICATED CLAIMS

Globally search the repository and remove/neutralize unsupported claims including any remnants of:

- 28 / 32 / 34 / 36 storeys
- Tower B as commercial/hospitality tower
- skybridge
- Level 18 skybridge
- 60m / 60-meter infinity pool
- pool suspended between towers
- 318 sqm three-bedroom
- 540 sqm penthouse
- 12m private sky pool
- 270-degree / 360-degree view claims
- private marina / marina berths
- coral reef access
- private beach
- private members club
- LEED Gold target
- Gaggenau appliances
- Italian joinery
- biometric elevator
- private internal elevator
- wine chamber / wine cellar
- exact ceiling heights
- exact room dimensions not verified
- exact residence orientation/view assignments
- unsupported materials/engineering performance
- fake awards/reviews/statistics
- fake travel times/distances
- fake contact email/phone/address
- fake successful enquiry submission

Do not replace one invented number with another guessed number.

If something is unknown, keep it unknown.

---

# 4. CLEAN `src/data/projectFacts.ts`

Keep this file as the central factual source of truth.

Audit every descriptive sentence inside it too.

Descriptions must not quietly introduce unsupported claims such as:

- commanding views
- private balcony areas
- elevated coastal setting
- flexible suites if not confirmed by the drawing
- direct access to services unless clearly supported
- exact material or performance claims

Prefer simple factual wording.

The core data should remain close to:

```ts
export const ONA_FACTS = {
  projectName: "ONA Towers",
  location: "Zanzibar",
  tagline: "Ishii juu. Ona zaidi.",

  development: {
    residentialTowers: 2,
    commercialServiceBuildings: 1,
  },

  residential: {
    residentialFloorsPerTower: 11,
    penthouseLevelsPerTower: 1,
    approximateApartmentsPerTower: 46,
    typicalFloor: {
      residences: 4,
      twoBedroom: 2,
      threeBedroom: 2,
    },
    twoBedroom: {
      bedrooms: 2,
      approximateAreaSqm: 203,
    },
    threeBedroom: {
      bedrooms: 3,
      approximateAreaSqm: 236,
    },
    penthouses: [
      { bedrooms: 3, approximateAreaSqm: 416 },
      { bedrooms: 4, approximateAreaSqm: 482 },
    ],
  },

  commercialServiceBuilding: {
    groundFloor: [
      "Supermarket",
      "Coffee / work area",
      "Reception / waiting / display area",
      "Entrance / office / supporting spaces",
    ],
    parkingLevels: 2,
    officeLevel: true,
    terraceLifestyleLevel: [
      "Restaurant",
      "Outdoor restaurant",
      "Pool",
      "Gym",
    ],
  },
};
```

You may retain additional structure only when it stays truthful.

---

# 5. CLEAN `src/data/residences.ts`

This file should consume `ONA_FACTS` wherever practical instead of duplicating factual numbers.

Use only the verified residence data above.

Avoid unsupported feature bullet lists.

Good examples:

### 2 Bedroom
- 2 Bedrooms
- Approx. 203 sqm
- 2 units per typical residential floor

### 3 Bedroom
- 3 Bedrooms
- Approx. 236 sqm
- 2 units per typical residential floor

### 3 Bedroom Penthouse
- 3 Bedrooms
- Approx. 416 sqm
- Penthouse level

### 4 Bedroom Penthouse
- 4 Bedrooms
- Approx. 482 sqm
- Penthouse level

Do not claim exact room arrangements beyond what is visible/confirmed in the official plan.

---

# 6. REPLACE ALL STOCK IMAGES WITH LOCAL ONA ASSETS

No Unsplash or other remote placeholder image should remain in `src/data/images.ts` after this task.

All files are already included under:

`public/ona-assets/`

Use site-root paths such as:

`/ona-assets/hero/hero-arrival.png`

Do not import them as base64.
Do not move them into `src` unless the framework requires it.

Use the exact image map in `IMAGE_PLACEMENT_MAP.md`.

---

# 7. REQUIRED IMAGE MAPPING

Update `src/data/images.ts` approximately as follows.

## Hero

`heroArrival`
→ `/ona-assets/hero/hero-arrival.png`

Use for the first full-screen arrival hero.

`heroAerial`
→ `/ona-assets/hero/hero-aerial.png`

Use for the first-scroll full-development reveal.

## ONA Idea — LIVE / LIFE / WORK

`livePreview`
→ `/ona-assets/residences/residences-exterior.png`

`lifePreview`
→ `/ona-assets/lifestyle/pool.png`

`workPreview`
→ `/ona-assets/commercial/boardroom.png`

## Development

`masterplan`
→ `/ona-assets/development/masterplan.png`

Use the REAL supplied masterplan.

Do not place guessed hotspot polygons on the plan unless you can verify alignment from the image.
If existing marker coordinates are uncertain, simplify the interaction to a clean legend/list for:

- Residential Tower A
- Residential Tower B
- Commercial / Service Building

## Residences

`residencesExterior`
→ `/ona-assets/residences/residences-exterior.png`

`residenceInteriorTeaser`
→ `/ona-assets/interiors/living-ocean-view.png`

`twoBedroomPlan`
→ `/ona-assets/residences/two-bedroom-plan-approx-203sqm.png`

`threeBedroomPlan`
→ `/ona-assets/residences/three-bedroom-plan-approx-236sqm.jpg`

Add/use:

`typicalFloorPlan`
→ `/ona-assets/residences/typical-floorplan.png`

`penthouseLevelOverview`
→ `/ona-assets/residences/penthouse-level-overview.png`

`penthouseThreeBedroomPlan`
→ `/ona-assets/residences/penthouse-3-bedroom-approx-416sqm.jpg`

`penthouseFourBedroomPlan`
→ `/ona-assets/residences/penthouse-4-bedroom-approx-482sqm.png`

IMPORTANT:

The 2-bedroom and 4-bedroom images were derived/cropped from supplied official architectural drawings. Treat them as project drawings, but do not pretend they are separately issued marketing plans.

Replace/remove any fake SVG floor plans if they visually conflict with the real supplied plans. Prefer the actual plan images.

## Interiors

`interiorLiving`
→ `/ona-assets/interiors/living-main.png`

`interiorOceanView`
→ `/ona-assets/interiors/living-ocean-view.png`

`interiorKitchen`
→ `/ona-assets/interiors/kitchen-dining.png`

`interiorBedroom`
→ `/ona-assets/interiors/primary-bedroom.png`

If another interior image is useful:

`interiorDining`
→ `/ona-assets/interiors/dining.png`

Do not claim any image belongs to an exact unit/floor unless verified.
Use honest labels such as `Interior visualization` where appropriate.

## Life at ONA

`lifestylePool`
→ `/ona-assets/lifestyle/pool.png`

`lifestyleRestaurant`
→ `/ona-assets/lifestyle/rooftop-restaurant.png`

`lifestyleGym`
→ `/ona-assets/lifestyle/gym.png`

`lifestyleCoffee`
→ `/ona-assets/lifestyle/coffee-corner.png`

Do not fabricate a separate “community courtyard” feature. If the current `lifestyleCommunity` entry has no real source, remove it or reuse only a confirmed lifestyle scene with honest copy.

Keep the current Life at ONA visual composition if it is already strong.

## Commercial

`commercialOffice`
→ `/ona-assets/commercial/office-level-plan.png`

`commercialBoardroom`
→ `/ona-assets/commercial/boardroom.png`

`commercialMarket`
→ `/ona-assets/commercial/supermarket.png`

Also add/use where helpful:

`commercialGroundFloorPlan`
→ `/ona-assets/commercial/ground-floor-plan.png`

`commercialTerracePlan`
→ `/ona-assets/commercial/terrace-lifestyle-plan.png`

Use rendered visuals as emotional/primary imagery and drawings as secondary factual explanation.

## Architecture

`architectureFacade`
→ `/ona-assets/architecture/architecture-closeup.png`

`architectureMaterial`
→ `/ona-assets/architecture/single-tower-aerial.png`

Do not attach invented façade/material specifications to these images.

## Location

IMPORTANT:

There is no verified dedicated location image/map in this asset set.

Do NOT use a random Zanzibar stock photo and imply it is the project's actual site.

Simplify the Location section to an elegant typography-led section stating only that ONA Towers is in Zanzibar until verified address/map/travel data is supplied.

You may use a small generic graphic treatment or no image at all.
Do not fabricate coastline access, direct ocean access, marina, travel times, or exact geography.

## Enquiry

Use an actual ONA tower render as the visual background if needed, for example:

`/ona-assets/architecture/single-tower-aerial.png`

or

`/ona-assets/hero/hero-aerial.png`

Do not invent contact details.

---

# 8. IMAGE ALT TEXT

Alt text must describe what is actually shown without inventing specifications.

Examples:

- `ONA Towers exterior architectural render`
- `ONA Towers aerial architectural render`
- `ONA Towers development masterplan`
- `Two-bedroom residence plan, approx. 203 sqm`
- `Three-bedroom residence plan, approx. 236 sqm`
- `Interior visualization of living space`
- `ONA lifestyle pool visualization`
- `Commercial boardroom visualization`

Do not use alt text to assert private beach, skybridge, marina, exact view, etc.

---

# 9. HERO

Keep the current strong cinematic hero direction.

Use the official local hero arrival image.

Keep:

- ONA / TOWERS serif treatment
- Zanzibar label
- `Ishii juu. Ona zaidi.`
- Explore ONA CTA
- restrained local gradient
- black / porcelain palette

Do not add extra marketing claims.

Make sure the actual tower remains the dominant subject and the text is easy to read on desktop/mobile.

---

# 10. HERO REVEAL / ONA IDEA

Use the real aerial image for the reveal.

Keep `LIVE / LIFE / WORK` as storytelling labels.

Use:

- Live → real residential exterior render
- Life → real pool visualization
- Work → real commercial boardroom visualization

Copy should remain short and non-factual where possible, e.g.:

- `A home above the everyday.`
- `More than an address.`
- `Business, closer to life.`

Do not attach invented specifications.

---

# 11. DEVELOPMENT / MASTERPLAN

Use the real masterplan.

Present only:

01 — Residential Tower A
02 — Residential Tower B
03 — Commercial / Service Building

Do not call Tower B commercial.
Do not show a skybridge.
Do not invent exact hover regions if alignment cannot be verified.

A beautiful static/legend-led masterplan is better than a wrong interactive plan.

---

# 12. RESIDENCES

Use the real ONA tower and interior images.

Keep the current cinematic/editorial structure.

The residence selector must show the real plan assets, not stock interiors pretending to be plans.

Display only verified facts:

- 2 Bedroom — approx. 203 sqm
- 3 Bedroom — approx. 236 sqm
- 3 Bedroom Penthouse — approx. 416 sqm
- 4 Bedroom Penthouse — approx. 482 sqm

If the current `FloorPlanSVG.tsx` creates a generic/fake floor plan, stop using it for the actual residence plan viewer.
Use the supplied image files instead.

The typical floor image may be shown as supporting architectural information:

`4 residences per typical floor · 2 × 2 Bedroom · 2 × 3 Bedroom`

---

# 13. PENTHOUSES

Use BOTH supplied official penthouse plan images.

Do not use a generic terrace stock image as the penthouse plan.

Keep the visual hierarchy premium using the real facts:

`416 SQM`

and

`482 SQM`

No 540 sqm.
No private sky pool.
No invented crown level.

---

# 14. INTERIORS

Use the supplied ONA interior visuals.

Keep them large and cinematic.

Use generic labels such as:

- Living
- Kitchen & Dining
- Bedroom
- Interior visualization

Do not assign an exact residence/floor unless source information confirms it.

---

# 15. LIFE AT ONA

This section is one of the strongest visual sections. Preserve its structure and motion as much as possible.

Replace all images with the supplied official visuals.

Supported scenes:

- Pool
- Restaurant / outdoor dining
- Gym
- Coffee / work area
- Supermarket can appear as an everyday-convenience transition if useful

Do not add invented spa, sauna, member club, 60m pool, etc.

---

# 16. COMMERCIAL

Use the supplied boardroom and supermarket visualizations plus the real commercial drawings.

Keep the story around:

- Work
- Meet
- Everyday convenience

Supported factual content:

- ground-floor supermarket
- coffee / work area
- reception / waiting / display
- 2 parking levels
- office level
- terrace restaurant / outdoor restaurant / pool / gym

Do not invent office heights, tenants, concierge, LEED, clubs, capacities, or luxury services.

---

# 17. ARCHITECTURE

Use the supplied official ONA exterior/detail visuals.

Keep copy broad and truthful.

For example:

`Designed as a contemporary mixed-use development bringing residential, commercial and lifestyle spaces together in Zanzibar.`

Do not claim exact materials, sustainability performance, engineering metrics, or façade systems unless separately verified.

---

# 18. LOCATION

Current generated location copy is too specific.

Remove/avoid claims such as:

- direct coastal access
- turquoise waters surrounding the project
- exact connectivity/travel statements
- year-round sunshine as a property-specific promise
- ocean breeze architecture
- Indian Ocean coastline caption if it implies the actual site

Replace with a clean, honest section such as:

Small label:
`LOCATION`

Headline:
`ZANZIBAR.`

Body:
`ONA Towers is a mixed-use development in Zanzibar.`

Optional supporting line:
`Detailed location information will be added from verified project material.`

For production polish, you may omit the second line and keep the section minimal rather than showing development-placeholder language publicly.

Do not show a fake map.

---

# 19. ENQUIRY — MUST BE HONEST

Audit `EnquirySection.tsx`.

The current generated code uses a fake `setTimeout()` submission and then tells the user the enquiry was received.

REMOVE THAT.

Also remove any contact email/phone/address unless it is explicitly verified by the user/project source.

Do not invent `info@onatowers.com` or any other contact.

Preferred behavior for now:

- keep the beautiful enquiry section design
- keep form fields if useful
- prevent fake submission
- either disable submit with an honest non-public placeholder implementation, or convert the CTA to a neutral non-submitting button until a real endpoint/contact is supplied

Do not tell the visitor `Your enquiry has been received` unless data is actually sent to a real endpoint.

No fake loading state.
No fake success state.

---

# 20. META / SEO COPY

Audit `index.html` and metadata.

Do not say `residential and commercial towers` if that implies the commercial building is a tower.

A safe description is:

`ONA Towers is a mixed-use development in Zanzibar with two residential towers and a separate commercial and lifestyle building.`

Keep wording factual.

---

# 21. EXTERNAL IMAGES / NETWORK DEPENDENCY

After completing this task:

- `src/data/images.ts` must contain no Unsplash URLs
- no external stock image URL should remain in user-facing components
- official ONA visuals should load from `/ona-assets/...`

Google Fonts can remain if the project already uses them.

---

# 22. DESIGN SYSTEM — KEEP

Preserve the current visual system unless something is broken:

- Cormorant Garamond display typography
- Manrope body/UI typography
- Onyx `#080808`
- Graphite `#171716`
- Porcelain `#F7F5F0`
- Ivory `#FFFDF8`
- Warm Stone `#D7D0C5`
- Champagne `#AE9A7C` used sparingly

Keep typography readable and bold enough.
Keep strong black sections.
Keep generous spacing.
Keep the site professional, artistic and welcoming.

---

# 23. DO NOT OVER-REDESIGN

Do NOT:

- convert sections into generic cards
- introduce glassmorphism
- add purple/blue gradients
- add 3D spheres/particles
- replace working motion with gimmicks
- rebuild Life at ONA from scratch
- change routes unnecessarily
- add backend/API integrations without credentials
- invent contact details

The goal is to FINISH and CORRECT this existing site, not start another concept.

---

# 24. CLEAN UNUSED CODE/DEPENDENCIES CAREFULLY

If an old component such as `FloorPlanSVG.tsx` is no longer used after switching to real plan images, remove its usage and delete it only if safe.

If `@google/genai` is unused, you may remove it from dependencies only if you confirm it is not referenced anywhere.

Do not remove dependencies blindly.

---

# 25. TEST EVERYTHING

After implementation:

1. run `npm install` if needed
2. run `npm run lint`
3. run `npm run build`
4. run `npm run dev`
5. inspect desktop
6. inspect tablet
7. inspect mobile
8. check browser console
9. check all local images load
10. check no Unsplash image remains
11. check no horizontal overflow
12. check floor-plan viewer
13. check masterplan presentation
14. check Life at ONA
15. check Commercial
16. check form does not fake submission
17. check location contains no invented geography

Fix all errors introduced by the work.

---

# 26. FINAL FACTUAL CHECKLIST

Before stopping, confirm:

- Both Tower A and Tower B are residential
- There are 11 residential floors + 1 penthouse level per residential tower
- Approx. 46 apartments per residential tower
- Typical floor = 4 residences
- Typical floor = 2 × 2-bed + 2 × 3-bed
- 2BR = approx. 203 sqm
- 3BR = approx. 236 sqm
- 3BR penthouse = approx. 416 sqm
- 4BR penthouse = approx. 482 sqm
- Commercial/service building is separate
- Commercial building has 2 parking levels
- Ground floor supported uses are accurate
- Office level is accurate
- Terrace restaurant / outdoor restaurant / pool / gym are accurate
- No skybridge claim remains
- No 60m pool claim remains
- No 540 sqm penthouse remains
- No marina/private beach claim remains
- No fake contact remains
- No fake enquiry success remains
- No stock/Unsplash visual remains

---

# 27. GIT SAFETY

Do not push automatically.

If this folder is already a Git repository:

- show me `git status`
- keep changes on the current working branch unless I explicitly ask you to create another branch

If it is not a Git repository, do not invent a remote URL.

At the end, simply tell me the exact Git commands I should run to commit and push after I review the website.

---

# 28. FINAL REPORT

When complete, report:

1. files changed
2. exact image mapping now used
3. stock images removed
4. factual claims corrected
5. unsupported claims removed
6. enquiry behavior after correction
7. Location behavior after correction
8. any remaining information that needs the user's confirmation
9. lint result
10. build result
11. local run command
12. recommended Git commit message

Then STOP.

Do not push.
