import { test, expect, Page } from '@playwright/test';

// simple test
test.describe("Home page tests", () => {
    let page: Page;
    test('should open home page', async ({ browser }) => {
        page = await browser.newPage();
        // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
        await page.goto('/');
        // The new url should be "/" (baseURL is used there)
        await expect(page).toHaveURL('/');
        // The page should contain title with "actual page title"
        await expect(page).toHaveTitle(/Movstats \| Movie DB/i);
    });


    // close opened broswer after all
    test.afterAll(async () => {
        await page.close();
    });
});