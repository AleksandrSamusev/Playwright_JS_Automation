import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/homepage.js";
import { LoginPage } from "../pages/loginpage.js";
import { SignupPage } from "../pages/signuppage.js";
import { AccountCreatedPage } from "../pages/accountcreatedpage.js";
import { DeleteAccountPage } from "../pages/deleteaccountpage.js";
import { generateName, generateEmailAddress, generatePassword } from "../util/functions.js";
const testData = JSON.parse(JSON.stringify(require('../testdata.json')))

test("Register User", async ({ page }) => {

  const name = generateName();
  const email = generateEmailAddress();
  const password = generatePassword();


  //2. Navigate to url 'http://automationexercise.com'
  await page.goto(testData.url);

  //3. Verify that home page is visible successfully
  const homePage = new HomePage(page);
  await homePage.verifyCarouselVisible();

  //4. Click on 'Signup / Login' button
  await homePage.clickOnLoginBtn();

  //5. Verify 'New User Signup!' is visible
  const loginPage = new LoginPage(page);
  await loginPage.verifyNewUserSignupVisible();

  //6. Enter name and email address
  await loginPage.enterNameAndEmailAddress(name, email);

  //7. Click 'Signup' button
  await loginPage.clickSignupBtn();

  //8. Verify that 'ENTER ACCOUNT INFORMATION' is visible
  const signupPage = new SignupPage(page);
  await signupPage.verifyEnterInformationVisible();

  //9. Fill details: Title, Name, Email, Password, Date of birth
  await signupPage.selectTitleMr();
  await signupPage.fillName(name);
  await signupPage.fillPassword(password);
  await signupPage.setDateOfBirth(testData.day, testData.month, testData.year);

  //10. Select checkbox 'Sign up for our newsletter!'
  await signupPage.ckeckNewsletter();

  //11. Select checkbox 'Receive special offers from our partners!'
  await signupPage.checkOffers();

  //12. Fill details: First name, Last name, Company, Address, Address2, Country, State, City, Zipcode, Mobile Number
  await signupPage.fillFirstName(testData.firstName);
  await signupPage.fillLastName(testData.lastName);
  await signupPage.fillCompany(testData.company);
  await signupPage.fillAddress(testData.address);
  await signupPage.selectCountry(testData.country);
  await signupPage.fillState(testData.state);
  await signupPage.fillCity(testData.city);
  await signupPage.fillZipCode(testData.zipCode);
  await signupPage.fillMobileNumber(testData.mobileNumber);

  //13. Click 'Create Account button'
  await signupPage.clickCreateAccount();

  //14. Verify that 'ACCOUNT CREATED!' is visible
  const accountCreatedPage = new AccountCreatedPage(page);
  await accountCreatedPage.verifyAccountCreatedVisible();

  //15. Click 'Continue' button
  await accountCreatedPage.clickContinue();

  //16. Verify that 'Logged in as username' is visible
  await homePage.verifyLoggedInUser(name);

  //17. Click 'Delete Account' button
  await homePage.clickOnDeleteAccount();

  //18. Verify that 'ACCOUNT DELETED!' is visible and click 'Continue' button
  const deleteAccountPage = new DeleteAccountPage(page);
  await deleteAccountPage.verifyAccountDeletedVisible();
  await deleteAccountPage.clickContinue();
});
