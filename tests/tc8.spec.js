import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/homepage";
import { ProductsPage } from "../pages/productspage";
import { ProductDetailsPage } from "../pages/productdetailspage";
const json = JSON.parse(JSON.stringify(require("../testdata.json")));

test("Verify All Products and product detail page", async ({ page }) => {
  await page.addLocatorHandler(
  page.getByRole('button', { name: 'Close' }),
  async () => {
    await page.getByRole('button', { name: 'Close' }).click();
  }
);
  // 1. Launch browser
  // 2. Navigate to url 'http://automationexercise.com'
  await page.goto(json.url);

  // 3. Verify that home page is visible successfully
  const homePage = new HomePage(page);
  await homePage.verifyCarouselVisible();

  // 4. Click on 'Products' button
  await homePage.clickProducts();

  // 5. Verify user is navigated to ALL PRODUCTS page successfully
  const productsPage = new ProductsPage(page);
  await productsPage.verifyAllProductsVisible();

  // 6. The products list is visible
  await productsPage.verifyProductsVisible();

  // 7. Click on 'View Product' of first product
  await productsPage.clickViewFirstProduct();

  // 8. User is landed to product detail page
  const productDetailPage = new ProductDetailsPage(page);
  await productDetailPage.verifyProductPriceVisible();

  //9. Verify that detail detail is visible: product name, category, price, availability, condition, brand
  await productDetailPage.verifyProductInformation();
});
