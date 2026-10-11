import { test, expect } from '@playwright/test';
for (const width of [1440, 768, 390, 360]) {
  test(`live portfolio at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    const response = await page.goto('https://aashrithd4.github.io/life-in-many-frames/');
    expect(response.status()).toBe(200);
    await expect(page.getByRole('heading', { name: 'A Life in Many Frames.', exact: true })).toBeVisible();
    await expect(page.locator('section[id]')).toHaveCount(7);
    await expect(page.locator('.hero-art')).toHaveJSProperty('naturalWidth', 1536);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    if (width < 850) await page.getByRole('button', { name: 'Open navigation' }).click();
    await page.getByRole('link', { name: 'Builder', exact: true }).click();
    await expect(page).toHaveURL(/#builder$/);
    await expect(page.locator('#builder-title')).toBeVisible();
    await expect(page.locator('.builder-art')).toHaveJSProperty('naturalWidth', 1536);
    await expect(page.locator('.work-card')).toHaveCount(3);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await expect.poll(async () => Math.abs(await page.locator('#builder').evaluate(el => el.getBoundingClientRect().top) - (width < 850 ? 68 : 76))).toBeLessThanOrEqual(4);
    await page.screenshot({ path: `test-results/builder-${width}.png`, animations: 'disabled' });
    await page.getByRole('link', { name: 'Explore selected work', exact: true }).click();
    await expect(page).toHaveURL(/#builder-work$/);
    if (width < 850) {
      await page.getByRole('button', { name: 'Open navigation' }).click();
      await expect(page.getByRole('button', { name: 'Close navigation' })).toHaveAttribute('aria-expanded', 'true');
      await page.getByRole('link', { name: 'Stories', exact: true }).click();
      await expect(page.getByRole('button', { name: 'Open navigation' })).toHaveAttribute('aria-expanded', 'false');
    } else {
      await page.getByRole('link', { name: 'Stories', exact: true }).click();
    }
    await expect(page).toHaveURL(/#storyteller$/);
    await expect(page.locator('.story-art')).toHaveJSProperty('complete', true);
    await expect(page.locator('.story-art')).toHaveJSProperty('naturalWidth', 1536);
    const badAnchors = await page.evaluate(() => [...document.querySelectorAll('a[href^="#"]')].filter(a => !document.querySelector(a.getAttribute('href'))).length);
    expect(badAnchors).toBe(0);
    await page.getByRole('link', { name: 'Back to top' }).click();
    await expect(page).toHaveURL(/#home$/);
    await expect.poll(() => page.evaluate(() => Math.round(scrollY))).toBe(0);
    await page.screenshot({ path: `test-results/portfolio-${width}.png`, fullPage: true, animations: 'disabled' });
    expect(errors).toEqual([]);
  });
}

test('Builder direct link opens its chapter', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 900 });
  await page.goto('https://aashrithd4.github.io/life-in-many-frames/#builder');
  await expect(page.locator('#builder-title')).toBeVisible();
  await expect.poll(() => page.locator('#builder').evaluate(el => Math.round(el.getBoundingClientRect().top))).toBe(68);
});
