import { test, expect } from "@playwright/test";
const json = JSON.parse(JSON.stringify(require("../testdata.json")));
import { HomePage } from "../pages/homepage";
import { ProductsPage } from "../pages/productspage";
import { ProductDetailsPage } from "../pages/productdetailspage";
import { generateName, generateEmailAddress } from "../util/functions.js";

test("Add review on product", async ({ page }) => {
  const nm = generateName();
  const eml = generateEmailAddress();

  // 1. Launch browser
  // 2. Navigate to url 'http://automationexercise.com'

  await page.goto(json.url);

  // 3. Click on 'Products' button
  const homePage = new HomePage(page);
  await homePage.clickProducts();

  // 4. Verify user is navigated to ALL PRODUCTS page successfully
  const productsPage = new ProductsPage(page);
  await productsPage.verifyAllProductsVisible();

  // 5. Click on 'View Product' button
  await productsPage.clickViewFirstProduct();

  // 6. Verify 'Write Your Review' is visible
  const productDetailsPage = new ProductDetailsPage(page);
  await productDetailsPage.verifyWriteReviewVisible();

  // 7. Enter name, email and review
  await productDetailsPage.fillReviewName(nm);
  await productDetailsPage.fillReviewEmail(eml);
  await productDetailsPage.fillReviewContent(json.review_content);

  // 8. Click 'Submit' button
  await productDetailsPage.clickSubmitReview();

  // 9. Verify success message 'Thank you for your review.'
  await productDetailsPage.verifyTextThankYou();
});
