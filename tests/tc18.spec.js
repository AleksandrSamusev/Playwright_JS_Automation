import { test, expect } from "@playwright/test";
import { CategoriesPage } from "../pages/categoriespage";
import { HomePage } from "../pages/homepage";
const json = JSON.parse(JSON.stringify(require("../testdata.json")));

test("View Category Products", async ({ page }) => {
  // 1. Launch browser
  // 2. Navigate to url 'http://automationexercise.com'
  await page.goto(json.url);

  // 3. Verify that categories are visible on left side bar
  const homePage = new HomePage(page);
  await homePage.verifyCategoriesVisible();

  // 4. Click on 'Women' category
  await homePage.clickFirstCategory();

  // 5. Click on any category link under 'Women' category, for example: Dress
  await homePage.clickFirstSubcategory();

  // 6. Verify that category page is displayed and confirm text 'WOMEN - TOPS PRODUCTS'
  const categoriesPage = new CategoriesPage(page);
  await categoriesPage.verifyWomenTitle(json.subcategory);

  // 7. On left side bar, click on any sub-category link of 'Men' category
  await homePage.clickSecondCategory();
  await homePage.clickSecondSubcategory();

  // 8. Verify that user is navigated to that category page
  await categoriesPage.verifyMenTitle(json.second_subcategory);

});
