import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/homepage";
import { TestCasesPage } from "../pages/testCasesPage";
const json = JSON.parse(JSON.stringify(require("../testdata.json")));

test("Verify Test Cases Page", async ({ page }) => {
    
  // 1. Launch browser
  // 2. Navigate to url 'http://automationexercise.com'

  await page.goto(json.url);

  // 3. Verify that home page is visible successfully
  const homePage = new HomePage(page);
  await homePage.verifyCarouselVisible();

  // 4. Click on 'Test Cases' button
  await homePage.clickTestCasesInNavbar();

  //5. Verify user is navigated to test cases page successfully
  const testCasesPage = new TestCasesPage(page);
  await testCasesPage.verifyTestCasesVisible();
});
