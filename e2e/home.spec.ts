import { test, expect, Page } from '@playwright/test';
// import * as mocked_resp from './mocked_resp.json';

// simple test
test.describe("Home page tests", () => {

    let page: Page;

    test.beforeAll(async ({ browser }) => {
        // new context like incognito mode
        let context = await browser.newContext();
        
        // mock the response to the client-side request
        // await context.route(`https://api.themoviedb.org/3/movie/popular?**`, (route) =>
        //     route.fulfill({
        //         status: 200,
        //         body: JSON.stringify(mocked_resp),
        //         contentType: 'application/json',
        //         // path: 'e2e/mocked_resp.json',
        //     })
        // );

        // Create a new page
        page = await context.newPage();


        // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
        await page.goto('/');
    });

    test('should open home page', async () => {
        // The new url should be "/" (baseURL is used there)
        await expect(page).toHaveURL('/');
        // The page should contain title with "actual page title"
        await expect(page).toHaveTitle(/Movstats \| Movie DB/i);
    });

    test('should find at least one card', async () => {
        let cards = page.locator('.card');
        await expect(cards.first()).toBeVisible();
        expect(await cards.count()).toBeGreaterThanOrEqual(1);
    });

});