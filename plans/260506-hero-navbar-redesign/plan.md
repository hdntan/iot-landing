---
title: "Implementation Plan: Hero & Navbar Redesign"
date: "2026-05-06"
status: "pending"
---

# Implementation Plan: Hero & Navbar Redesign

This plan details the steps required to execute the redesign agreed upon in the Brainstorm Report (`plans/reports/brainstorm-260506-1143-hero-navbar-redesign.md`).

## Phase 1: Preparation & Setup
**Objective:** Prepare the project environment with necessary dependencies and global styles.
- **Dependencies:** Install `gsap` and `@gsap/react` (if not already installed). 
- **Global CSS:** 
  - Merge the `@keyframes fadeInUp` and other custom animations from the MD files into `app/globals.css`.
  - Add the custom root variables (`--color-primary`, `--color-dark`, `--size-container`, etc.) from `NAVBAR2.MD`.
  - Ensure Tailwind animations and utilities (`tw-animate-css` equivalents) are correctly mapped in Tailwind configuration or CSS.

## Phase 2: Refactoring the Navbar
**Objective:** Implement the Fullscreen Kinetic Navigation (`sterling-gate-kinetic-navigation.tsx`).
- **File:** `app/components/navbar.tsx`
- **Steps:**
  1. Replace the existing sticky nav with the new component structure.
  2. Register `CustomEase` and `gsap` safely within `useEffect` or `useGSAP`.
  3. Update the menu items to the 3 anchor links: `#tinh-nang`, `#cach-hoat-dong`, `#lien-he`.
  4. Implement an `onClick` handler on menu links to trigger `closeMenu()` and smoothly scroll to the section.
  5. Add supplementary company information (e.g., Email, Hotline) inside the fullscreen menu's empty space to ensure it feels premium and complete.

## Phase 3: Refactoring the Hero
**Objective:** Implement the "IoT Data Stream" Hero (`music-reactive-hero-section.tsx`) without audio dependencies.
- **File:** `app/components/hero.tsx`
- **Steps:**
  1. Replace the current `Hero` layout with the new component.
  2. **Remove Audio Dependencies:** Delete all `audioRef`, `audioContextRef`, `analyserRef`, `isPlaying`, `audioProgress`, and `togglePlayback` logic.
  3. **Adapt Visuals to Data Stream:** Modify the `animate` function to permanently use the math-based oscillators (demo animation mode) to generate the waves, representing continuous IoT data flow.
  4. **Remove Unused UI:** Remove the `<audio>` tag, Play/Stop button, and Progress Bar.
  5. **Restore Copywriting:** Insert the existing IoT copywriting: "Giám sát toàn bộ máy pha cà phê, từ xa.", the 3 stats blocks, and the "Đặt lịch Demo" CTA button.

## Phase 4: Quality Assurance & Polish
**Objective:** Ensure a bug-free, high-performance experience.
- **GSAP Conflicts:** Check for memory leaks or unkilled GSAP instances. Ensure `ctx.revert()` is called on unmount.
- **Responsiveness:** Verify the Canvas resizes correctly and the Fullscreen Menu works smoothly on mobile viewports.
- **Performance:** Check Lighthouse scores to ensure the Canvas animations do not heavily drop FPS. Add `requestAnimationFrame` cleanup on component unmount.
