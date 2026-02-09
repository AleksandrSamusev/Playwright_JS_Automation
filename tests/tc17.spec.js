import { test, expect } from "@playwright/test";
const json = JSON.parse(JSON.stringify(require("../testdata.json")));
import { HomePage } from "../pages/homepage";
import { CartPage } from "../pages/cartpage";

test("Remove Products From Cart", async ({ page }) => {
  // 1. Launch browser
  // 2. Navigate to url 'http://automationexercise.com'

  await page.goto(json.url);

  // 3. Verify that home page is visible successfully
  const homePage = new HomePage(page);
  await homePage.verifyCarouselVisible();

  // 4. Add products to cart
  await homePage.addProductsToCart();

  // 5. Click 'Cart' button
  await homePage.clickViewCartInModal();

  // 6. Verify that cart page is displayed
  const cartPage = new CartPage(page);
  await cartPage.verifyShoppingCartVisible();

  // 7. Click 'X' button corresponding to particular product
  await cartPage.deleteFirstProduct()

  // 8. Verify that product is removed from the cart
  await cartPage.verifyNumberOfProducts(1)
  await cartPage.verifySecondProductOnCart()
});
