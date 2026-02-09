import { test, expect } from "@playwright/test";
const json = JSON.parse(JSON.stringify(require("../testdata.json")));
import { HomePage } from "../pages/homepage";

test("Verify Scroll Up using 'Arrow' button and Scroll Down functionality", async ({ page }) => {
  // 1. Launch browser
  // 2. Navigate to url 'http://automationexercise.com'

  await page.goto(json.url);

  // 3. Verify that home page is visible successfully
  const homePage = new HomePage(page);
  await homePage.verifyCarouselVisible();

  // 4. Scroll down page to bottom
  await homePage.scrollToSubscription();

  // 5. Verify 'SUBSCRIPTION' is visible
  await homePage.verifySubscriptionTextInViewport()

  // 6. Click on arrow at bottom right side to move upward
  await homePage.clickScrollUp()

  // 7. Verify that page is scrolled up and 'Full-Fledged practice website for Automation Engineers' text is visible on screen
  await homePage.verifySuccessfullScrollUp()

});
