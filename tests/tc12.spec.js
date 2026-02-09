import { test, expect } from "@playwright/test";
const json = JSON.parse(JSON.stringify(require("../testdata.json")));
import { HomePage } from "../pages/homepage";
import { ProductsPage } from "../pages/productspage";
import { CartPage } from "../pages/cartpage";

test("Add Products in Cart", async ({ page }) => {
  // 1. Launch browser
  // 2. Navigate to url 'http://automationexercise.com'

  await page.goto(json.url);

  // 3. Verify that home page is visible successfully
  const homePage = new HomePage(page);
  await homePage.verifyCarouselVisible();

  // 4. Click 'Products' button
  await homePage.clickProducts();

  // 5. Hover over first product and click 'Add to cart'
  const productsPage = new ProductsPage(page);
  await productsPage.addFirstProductToCart();

  // 6. Click 'Continue Shopping' button
  await productsPage.clickContinueShopping();

  // 7. Hover over second product and click 'Add to cart'
  await productsPage.addSecondProductToCart();

  // 8. Click 'View Cart' button
  await productsPage.clickViewCart();

  // 9. Verify both products are added to Cart
  const cartPage = new CartPage(page)
  await cartPage.verifyNumberOfProducts(2)

  // 10. Verify their prices, quantity and total price
  await cartPage.verifyProductsInformation()
});
