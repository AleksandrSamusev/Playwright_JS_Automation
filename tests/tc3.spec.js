import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/homepage";
import { LoginPage } from "../pages/loginpage";
import { generateName, generateEmailAddress, generatePassword } from "../util/functions.js";
const testData = JSON.parse(JSON.stringify(require('../testdata.json')))

test("Login User with incorrect email and password", async ({ page }) => {
  const email = generateEmailAddress();
  const password = generatePassword();

  //2. Navigate to url 'http://automationexercise.com'
  await page.goto(testData.url);

  //3. Verify that home page is visible successfully
  const homePage = new HomePage(page);
  await homePage.verifyCarouselVisible();

  //4. Click on 'Signup / Login' button
  await homePage.clickOnLoginBtn();

  //5. Verify 'Login to your account' is visible
  const loginPage = new LoginPage(page);
  await loginPage.verifyLoginToAccountVisible();

  //6. Enter incorrect email address and password
  await loginPage.fillEmailAndPassword(email, password);

  //7. Click 'login' button
  await loginPage.clickLoginBtn();

  //8. Verify error 'Your email or password is incorrect!' is visible
  await loginPage.validateWrongCredentials()
});
