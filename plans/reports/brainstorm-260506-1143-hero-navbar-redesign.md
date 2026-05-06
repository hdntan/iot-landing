---
title: "Brainstorm Report: Hero & Navbar Redesign for IoT Coffee Landing Page"
date: "2026-05-06"
status: "agreed"
---

# Brainstorm Summary: Hero & Navbar Redesign

## Problem Statement & Requirements
The goal is to integrate two highly complex and visually stunning new UI components (`HERO2.MD` and `NAVBAR2.MD`) into an existing B2B IoT platform landing page for coffee chains. The challenge is adapting components built with different original intents (music-reactive and deep multi-page navigation) to fit a single-page B2B context while preserving their premium aesthetic and dynamic behaviors.

## Evaluated Approaches

### Hero Component
1. **IoT Data Stream Adaptation (Selected)**
   - *Pros:* Extremely premium, visualizes "data flow" perfectly without needing audio, better UX for B2B.
   - *Cons:* Requires stripping out Web Audio API and rewriting the animation loop to be self-driven.
2. **Audio-Driven Machine Heartbeat**
   - *Pros:* Immersive sound design.
   - *Cons:* Autoplaying or requiring users to play audio on a B2B landing page is poor UX.

### Navbar Component
1. **Optimized Fullscreen Menu (Selected)**
   - *Pros:* Delivers the wow-factor of GSAP kinetic animations. Fits the brand's premium tier.
   - *Cons:* The site only has 3 anchor links, which could leave the fullscreen menu feeling empty. 
   - *Mitigation:* We will inject contact information (Email, Hotline, Social Links) and a strong CTA inside the menu to utilize the negative space effectively.
2. **Hybrid Approach (Desktop vs Mobile)**
   - *Pros:* Faster navigation on desktop.
   - *Cons:* Inconsistent brand experience across devices.

## Final Agreed Solution
**Option 1 for both components.**

1. **Hero**: We will transform the `music-reactive-hero` into a self-animated **"IoT Data Stream"** hero. We will remove the `AudioContext`, the audio file dependency, and the play/stop button. The canvas wave generator will use mathematical oscillators (the existing demo mode in the code) to simulate real-time data flow. Copywriting will be merged from the existing Hero component (Headline, Stats, CTA).
2. **Navbar**: We will adapt `sterling-gate-kinetic-navigation` to serve as the global navigation. The menu will list the 3 section anchors (`#tinh-nang`, `#cach-hoat-dong`, `#lien-he`). Clicking a link will smoothly scroll to the section and close the overlay. The empty space in the menu will be populated with company contact info.

## Implementation Considerations & Risks
- **GSAP & CustomEase Integration**: The new Navbar requires `gsap` and `CustomEase`. We need to ensure GSAP is installed and `CustomEase` is registered properly without SSR issues in Next.js (using `useGSAP` or checking `typeof window`).
- **Canvas Performance**: The Hero uses heavy canvas operations (Film Grain, Chromatic Aberration). We must ensure it pauses or degrades gracefully on low-end devices or when not in the viewport to save battery.
- **Tailwind Integration**: Both components come with custom CSS (`--color-primary`, keyframes). We need to merge this safely with the existing `globals.css` without breaking the current Shadcn UI theme.
- **Anchor Scrolling**: Next.js routing might conflict with standard anchor tag scrolling if not handled smoothly within the fullscreen GSAP menu.

## Success Metrics
- Visual execution perfectly matches the premium, dynamic feel of the source MD components.
- Hero waves animate continuously without errors or audio prompts.
- Navbar opens smoothly, and clicking a link scrolls to the target and closes the overlay.
- Zero horizontal scrolling or layout shift bugs introduced.
- Lighthouse performance score remains high despite canvas usage.

## Next Steps
- Generate a detailed implementation plan.
- Execute the replacement of `Hero` and `Navbar` components.
- Merge CSS variables and animations into `globals.css`.
- Test responsive layout and performance.
