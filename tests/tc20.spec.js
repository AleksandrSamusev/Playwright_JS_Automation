import { test, expect } from "@playwright/test";
const json = JSON.parse(JSON.stringify(require("../testdata.json")));
import { HomePage } from "../pages/homepage";
import { ProductsPage } from "../pages/productspage";
import { LoginPage } from "../pages/loginpage";
import { CartPage } from "../pages/cartpage";

test("Search Products and Verify Cart After Login", async ({ page }) => {
  // 1. Launch browser
  // 2. Navigate to url 'http://automationexercise.com'

  await page.goto(json.url);

  // verification step

  const homePage = new HomePage(page);
  await homePage.verifyCarouselVisible();

  // 3. Click on 'Products' button
  await homePage.clickProducts();

  // 4. Verify user is navigated to ALL PRODUCTS page successfully
  const productsPage = new ProductsPage(page);
  await productsPage.verifyAllProductsVisible();

  // 5. Enter product name in search input and click search button
  await productsPage.fillSearchInput(json.search_query);
  await productsPage.clickSearchButton();

  // 6. Verify 'SEARCHED PRODUCTS' is visible
  await productsPage.verifySearchedProducts();

  // 7. Verify all the products related to search are visible
  await productsPage.verifyProductsRelatedToSearch(json.search_query);

  // 8. Add those products to cart
  await productsPage.addFirstProductToCart();
  //await productsPage.clickContinueShopping();
  //await productsPage.addSecondProductToCart();

  // 9. Click 'Cart' button and verify that products are visible in cart
  await productsPage.clickViewCartInModal()
  const cartPage = new CartPage(page)
  await cartPage.verifyNumberOfProducts(1)

  // 10. Click 'Signup / Login' button and submit login details
  await cartPage.clickLoginInHeader()
  const loginPage = new LoginPage(page);
  await loginPage.fillEmailAndPassword(json.existing_account_email, json.existing_account_password);
  await loginPage.clickLoginBtn();

  // 11. Again, go to Cart page
  await homePage.clickCart();

  // 12. Verify that those products are visible in cart after login as well
  await cartPage.verifyNumberOfProducts(1)

  
});
