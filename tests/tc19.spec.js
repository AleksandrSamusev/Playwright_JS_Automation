import { test, expect } from "@playwright/test";
const json = JSON.parse(JSON.stringify(require("../testdata.json")));
import { HomePage } from "../pages/homepage";
import { ProductsPage } from "../pages/productspage";

test("View & Cart Brand Products", async ({ page }) => {
  // 1. Launch browser
  // 2. Navigate to url 'http://automationexercise.com'

  await page.goto(json.url);

  // 3. Click on 'Products' button
  const homePage = new HomePage(page);
  await homePage.clickProducts();

  // 4. Verify that Brands are visible on left side bar
  const productsPage = new ProductsPage(page);
  await productsPage.verifyBrandsVisible();

  // 5. Click on any brand name
  await productsPage.clickFirstBrand();

  // 6. Verify that user is navigated to brand page and brand products are displayed
  await productsPage.verifySelectedBrand(json.first_brand);
  await productsPage.verifyListProductsNotEmpty()

  // 7. On left side bar, click on any other brand link
  await productsPage.clickThirdBrand();

  // 8. Verify that user is navigated to that brand page and can see products
  await productsPage.verifySelectedBrand(json.second_brand)
  await productsPage.verifyListProductsNotEmpty()
});
