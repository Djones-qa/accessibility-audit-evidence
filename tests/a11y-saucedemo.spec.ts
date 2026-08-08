import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { showStep, showResult, highlightViolations } from './helpers';

test.describe('Accessibility Audit - SauceDemo', () => {
  test('login page WCAG 2.1 AA scan', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    await showStep(page, 1, 'A11Y Audit: SauceDemo Login Page');

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();

    const violations = results.violations;
    const violationCount = violations.length;
    const impactCounts = { critical: 0, serious: 0, moderate: 0, minor: 0 };

    violations.forEach((v) => {
      if (v.impact) impactCounts[v.impact as keyof typeof impactCounts]++;
    });

    await showStep(page, 2, `Found ${violationCount} accessibility violations`);

    if (violations.length > 0) {
      const selectors = violations.flatMap((v) =>
        v.nodes.map((n) => n.target[0] as string),
      ).slice(0, 10);
      await highlightViolations(page, selectors);
      await showResult(page, false, `${impactCounts.critical} critical, ${impactCounts.serious} serious, ${impactCounts.moderate} moderate`);
    } else {
      await showResult(page, true, 'No WCAG 2.1 AA violations found');
    }

    await page.screenshot({ path: 'test-results/evidence/01-saucedemo-login-a11y.png' });
    await showStep(page, 3, 'Screenshot captured with violations highlighted');

    // Log violations for the report
    console.log(`\n=== SauceDemo Login - A11Y Results ===`);
    console.log(`Total violations: ${violationCount}`);
    console.log(`Critical: ${impactCounts.critical}, Serious: ${impactCounts.serious}, Moderate: ${impactCounts.moderate}, Minor: ${impactCounts.minor}`);
    violations.forEach((v) => {
      console.log(`  [${v.impact}] ${v.id}: ${v.description}`);
    });

    await page.waitForTimeout(2000);
  });

  test('products page WCAG 2.1 AA scan', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    await expect(page).toHaveURL(/inventory/);
    await showStep(page, 1, 'A11Y Audit: Products Page');

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();

    const violations = results.violations;
    await showStep(page, 2, `Found ${violations.length} violations on products page`);

    if (violations.length > 0) {
      const selectors = violations.flatMap((v) =>
        v.nodes.map((n) => n.target[0] as string),
      ).slice(0, 10);
      await highlightViolations(page, selectors);
      await showResult(page, false, `${violations.length} issues need fixing`);
    } else {
      await showResult(page, true, 'Products page is fully accessible');
    }

    await page.screenshot({ path: 'test-results/evidence/02-saucedemo-products-a11y.png' });

    console.log(`\n=== SauceDemo Products - A11Y Results ===`);
    console.log(`Total violations: ${violations.length}`);
    violations.forEach((v) => {
      console.log(`  [${v.impact}] ${v.id}: ${v.description}`);
    });

    await page.waitForTimeout(2000);
  });
});

test.describe('Accessibility Audit - The Internet', () => {
  test('form controls accessibility scan', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/login');
    await showStep(page, 1, 'A11Y Audit: Login Form');

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();

    const violations = results.violations;
    await showStep(page, 2, `Found ${violations.length} violations`);

    if (violations.length > 0) {
      const selectors = violations.flatMap((v) =>
        v.nodes.map((n) => n.target[0] as string),
      ).slice(0, 10);
      await highlightViolations(page, selectors);
      await showResult(page, false, `${violations.length} form accessibility issues`);
    } else {
      await showResult(page, true, 'Form is accessible');
    }

    await page.screenshot({ path: 'test-results/evidence/03-herokuapp-login-a11y.png' });

    console.log(`\n=== The Internet Login - A11Y Results ===`);
    console.log(`Total violations: ${violations.length}`);
    violations.forEach((v) => {
      console.log(`  [${v.impact}] ${v.id}: ${v.description}`);
    });

    await page.waitForTimeout(2000);
  });
});
