import { Page } from '@playwright/test';

export async function showStep(page: Page, step: number, desc: string) {
  await page.evaluate(({ s, d }) => {
    const el = document.getElementById('qa-overlay');
    if (el) el.remove();
    const div = document.createElement('div');
    div.id = 'qa-overlay';
    div.style.cssText = 'position:fixed;top:10px;left:10px;z-index:99999;background:rgba(0,0,0,0.9);color:#00ff88;padding:14px 22px;border-radius:8px;font:bold 15px monospace;border:2px solid #00ff88;box-shadow:0 4px 20px rgba(0,255,136,0.3)';
    div.textContent = `Step ${s}: ${d}`;
    document.body.appendChild(div);
  }, { s: step, d: desc });
  await page.waitForTimeout(1500);
}

export async function showResult(page: Page, passed: boolean, message: string) {
  await page.evaluate(({ p, m }) => {
    const el = document.getElementById('qa-result');
    if (el) el.remove();
    const div = document.createElement('div');
    div.id = 'qa-result';
    div.style.cssText = `position:fixed;top:60px;left:10px;z-index:99999;background:${p ? 'rgba(0,100,0,0.9)' : 'rgba(150,0,0,0.9)'};color:white;padding:10px 18px;border-radius:8px;font:bold 14px monospace;border:2px solid ${p ? '#00ff00' : '#ff4444'}`;
    div.textContent = `${p ? 'PASS' : 'ISSUE'}: ${m}`;
    document.body.appendChild(div);
  }, { p: passed, m: message });
  await page.waitForTimeout(1200);
}

export async function highlightViolations(page: Page, selectors: string[]) {
  await page.evaluate((sels) => {
    sels.forEach((sel) => {
      try {
        const els = document.querySelectorAll(sel);
        els.forEach((el) => {
          (el as HTMLElement).style.outline = '3px solid red';
          (el as HTMLElement).style.outlineOffset = '2px';
        });
      } catch { /* skip invalid selectors */ }
    });
  }, selectors);
  await page.waitForTimeout(1000);
}
