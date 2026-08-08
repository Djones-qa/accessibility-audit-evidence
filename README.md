# Accessibility Audit with Video Evidence

[![Playwright](https://img.shields.io/badge/Playwright-45ba4b.svg?logo=playwright&logoColor=white)](https://playwright.dev/)
[![axe-core](https://img.shields.io/badge/axe--core-663399.svg)](https://www.deque.com/axe/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)](https://www.typescriptlang.org/)
[![WCAG 2.1 AA](https://img.shields.io/badge/WCAG-2.1_AA-blue.svg)](https://www.w3.org/WAI/WCAG21/quickref/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

WCAG 2.1 AA accessibility audit with full evidence - axe-core automated scans, violations highlighted in red on screenshots, step-labeled video recordings. Tests real production websites.

## Audit Results

| Site | Page | Violations | Severity | Evidence |
|------|------|-----------|----------|----------|
| SauceDemo | Login | 0 | Clean | Screenshot + Video |
| SauceDemo | Products | 1 | Critical | Screenshot + Video |
| The Internet | Login Form | 1 | Serious | Screenshot + Video |

## Issues Found

### SauceDemo Products Page - CRITICAL
- **select-name**: Select element (sort dropdown) has no accessible name
- Impact: Screen readers cannot identify the purpose of the dropdown

### The Internet Login - SERIOUS
- **color-contrast**: Foreground/background color contrast ratio fails WCAG AA minimum
- Impact: Users with low vision may not be able to read text

## Evidence

- **Screenshots**: Violations highlighted with red outlines in `test-results/evidence/`
- **Videos**: Step-labeled recordings showing the audit process in `test-results/*/video.webm`
- **Step overlays**: Green labels on-screen showing each audit step

## Getting Started

```bash
git clone https://github.com/Djones-qa/accessibility-audit-evidence.git
cd accessibility-audit-evidence
npm install
npx playwright install chromium
npx playwright test --reporter=list
```

## Tech Stack

- **Playwright** - Browser automation + video recording
- **axe-core** - WCAG accessibility rule engine
- **TypeScript** - Type-safe test code

## Author

**Darrius Jones**

- GitHub: [@Djones-qa](https://github.com/Djones-qa)
- LinkedIn: [darrius-jones-28226b350](https://www.linkedin.com/in/darrius-jones-28226b350)

## License

MIT - 2026 Darrius Jones

See [LICENSE](./LICENSE) for details.
