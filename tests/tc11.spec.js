import { test, expect } from "@playwright/test";
const json = JSON.parse(JSON.stringify(require("../testdata.json")));
import { HomePage } from "../pages/homepage";
import { CartPage } from "../pages/cartpage";
import { generateEmailAddress } from "../util/functions";

test("Verify Subscription in Cart page", async ({ page }) => {
  const emailAddr = generateEmailAddress();

  // 1. Launch browser
  // 2. Navigate to url 'http://automationexercise.com'
  await page.goto(json.url);

  // 3. Verify that home page is visible successfully
  const homePage = new HomePage(page);
  await homePage.verifyCarouselVisible();

  // 4. Click 'Cart' button
  await homePage.clickCart();

  // 5. Scroll down to footer
  // 6. Verify text 'SUBSCRIPTION'
  const cartPage = new CartPage(page);
  await cartPage.verifySubscriptionText();

  // 7. Enter email address in input and click arrow button
  await cartPage.fillSubscribeEmail(emailAddr);
  await cartPage.clickSubscribeButton();

  // 8. Verify success message 'You have been successfully subscribed!' is visible
  await cartPage.verifySuccessSubscribeVisible();
});
