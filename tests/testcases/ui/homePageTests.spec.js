import {test,expect} from '@playwright/test';
import HomePage from '../../pages/homePage';

test('basic home page tests', {
  tag: '@smoke',
}, async ({ page }) => {
    const home = new HomePage(page);
    await page.goto('/');
    await home.clickBookNowButton();
    await expect(page).toHaveURL(/#book/);
    await expect(home.contactInfoCard).toBeVisible();
    await expect(home.messageUsCard).toBeVisible(); 
    await expect(home.titleLogo).toBeVisible();
    await expect(home.welcomeText).toBeVisible();
    await expect(home.bookingCard).toBeVisible();
    await expect(home.roomsSection).toBeVisible();
  // ...
});