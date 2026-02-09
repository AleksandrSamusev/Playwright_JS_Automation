import { test, expect } from "@playwright/test";
const json = JSON.parse(JSON.stringify(require("../testdata.json")));
import { HomePage } from "../pages/homepage";
import { CartPage } from "../pages/cartpage";

test("Add to cart from Recommended items", async ({ page }) => {
  // 1. Launch browser
  // 2. Navigate to url 'http://automationexercise.com'

  await page.goto(json.url);

  // 3. Scroll to bottom of page
  // 4. Verify 'RECOMMENDED ITEMS' are visible
  const homePage = new HomePage(page);
  await homePage.scrollToRecommendedItems();
  await homePage.verifyRecommendedItemsVisible();

  // 5. Click on 'Add To Cart' on Recommended product
  await homePage.addToCartItemFromRecommended();

  // 6. Click on 'View Cart' button
  await homePage.clickViewCartInModal();

  // 7. Verify that product is displayed in cart page
  const cartPage = new CartPage(page);
  await cartPage.verifyNumberOfProducts(1);
});
