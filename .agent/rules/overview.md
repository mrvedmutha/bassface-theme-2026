---
trigger: always_on
---

# Development Rules - Overview

**Version:** 5.0.0
**Last Updated:** 2026-01-15

## Major Changes in v5.0.0
- Vanilla CSS + Alpine.js architecture
- BEM naming convention for CSS classes
- Desktop-first responsive design (1440px base)
- CSS files in assets/ folder (assets/section-[name].css)
- Manual-first testing (Playwright as backup only)
- docs/ folder for documentation (no prototype/ folder)

---

## Navigation Guide

### Building a New Section (Full Workflow)
Read in order:
1. [01-WORKFLOW.md](./01-WORKFLOW.md) - Complete development process
2. [02-DESIGN-EXTRACTION.md](./02-DESIGN-EXTRACTION.md) - Figma extraction
3. [03-ASSET-MANAGEMENT.md](./03-ASSET-MANAGEMENT.md) - Asset collection
4. [04-LIQUID-DEVELOPMENT.md](./04-LIQUID-DEVELOPMENT.md) - Liquid coding standards
5. [05-CSS-STANDARDS.md](./05-CSS-STANDARDS.md) - CSS, BEM, breakpoints
6. [07-TESTING.md](./07-TESTING.md) - Playwright testing

### Quick Tasks

**Daily cheat sheet (commands, code snippets):**
- Read: [10-QUICK-REFERENCE.md](./10-QUICK-REFERENCE.md) ⭐ Start here

**Just need CSS help (Vanilla CSS + BEM):**
- Read: [05-CSS-STANDARDS.md](./05-CSS-STANDARDS.md)

**Just need JavaScript help (Alpine.js):**
- Read: [06-JAVASCRIPT-STANDARDS.md](./06-JAVASCRIPT-STANDARDS.md)

**Testing/debugging section:**
- Read: [07-TESTING.md](./07-TESTING.md)

**Asset strategy discussion:**
- Read: [03-ASSET-MANAGEMENT.md](./03-ASSET-MANAGEMENT.md)

**File naming questions:**
- Read: [08-NAMING-CONVENTIONS.md](./08-NAMING-CONVENTIONS.md)

**Git/deployment help:**
- Read: [09-GIT-WORKFLOW.md](./09-GIT-WORKFLOW.md)

---

## File Index

| File | Purpose | Lines | When to Read |
|------|---------|-------|--------------|
| overview.md | Navigation guide | ~100 | Start here |
| 01-WORKFLOW.md | Complete workflow | ~300 | Building new section |
| 02-DESIGN-EXTRACTION.md | Figma MCP extraction | ~200 | Before starting design |
| 03-ASSET-MANAGEMENT.md | Asset strategy | ~250 | After Figma extraction |
| 04-LIQUID-DEVELOPMENT.md | Liquid + Vanilla CSS + Alpine | ~550 | During development |
| 05-CSS-STANDARDS.md | Vanilla CSS + BEM structure | ~500 | Writing styles |
| 06-JAVASCRIPT-STANDARDS.md | Alpine.js patterns | ~500 | Writing JavaScript |
| 07-TESTING.md | Manual-first testing | ~350 | Testing/debugging |
| 08-NAMING-CONVENTIONS.md | File/class naming | ~300 | Creating files |
| 09-GIT-WORKFLOW.md | Git/deployment | ~450 | Committing code |
| 10-QUICK-REFERENCE.md | 1-page cheat sheet | ~300 | Daily reference |

---

## Philosophy

**Token Efficiency:**
- Read only what you need
- Quick reference for common tasks
- More tokens for code, less for docs

**Vanilla CSS + Alpine Architecture:**
- Write CSS in separate files (assets/section-[name].css)
- Use BEM naming convention for class names
- Use Alpine.js for interactivity (inline in Liquid)
- Leverage CSS variables from design system
- Build with Shopify CLI (localhost:9292)

**Manual-First Testing:**
- Manual testing is primary approach
- Debug with markup/console.log when issues occur
- Playwright via MCP only when human says "test it"
- Fast iteration, minimal test overhead

---

## Core Principles

1. Extract Figma design first (via Figma MCP)
2. Collect all assets before coding
3. Build directly in Liquid (no prototypes)
4. Write CSS in separate files (assets/section-[name].css) + Alpine.js inline
5. Use BEM naming convention for CSS classes
6. Desktop-first responsive (1440px → 1024px → 700px → 412px)
7. Manual testing first, automated testing as backup
8. Never touch core theme files
9. Use CSS variables from design system (ask before adding new ones)
