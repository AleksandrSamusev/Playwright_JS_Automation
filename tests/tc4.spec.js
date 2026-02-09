import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/homepage.js";
import { LoginPage } from "../pages/loginpage.js";
import { SignupPage } from "../pages/signuppage.js";
import { AccountCreatedPage } from "../pages/accountcreatedpage.js";
import { generateName, generateEmailAddress, generatePassword } from "../util/functions.js";
const testData = JSON.parse(JSON.stringify(require("../testdata.json")));

test("Logout User", async ({ page }) => {
  const name = generateName();
  const email = generateEmailAddress();
  const password = generatePassword();

  //PRE_REQUISITE ---> REGISTERING NEW USER, THEN LOGOUT, THEN NAVIGATE TO HOME PAGE

  //PRE-REQUISITE 2. Navigate to url 'http://automationexercise.com'
  await page.goto(testData.url);

  //PRE-REQUISITE 3. Verify that home page is visible successfully
  const homePage = new HomePage(page);
  await homePage.verifyCarouselVisible();

  //PRE-REQUISITE 4. Click on 'Signup / Login' button
  await homePage.clickOnLoginBtn();

  //PRE-REQUISITE 5. Verify 'New User Signup!' is visible
  const loginPage = new LoginPage(page);
  await loginPage.verifyNewUserSignupVisible();

  //PRE-REQUISITE 6. Enter name and email address
  await loginPage.enterNameAndEmailAddress(name, email);

  //PRE-REQUISITE 7. Click 'Signup' button
  await loginPage.clickSignupBtn();

  //PRE-REQUISITE 8. Verify that 'ENTER ACCOUNT INFORMATION' is visible
  const signupPage = new SignupPage(page);
  await signupPage.verifyEnterInformationVisible();

  //PRE-REQUISITE 9. Fill details: Title, Name, Email, Password, Date of birth
  await signupPage.selectTitleMr();
  await signupPage.fillName(name);
  await signupPage.fillPassword(password);
  await signupPage.setDateOfBirth(testData.day, testData.month, testData.year);

  //PRE-REQUISITE 10. Select checkbox 'Sign up for our newsletter!'
  await signupPage.ckeckNewsletter();

  //PRE-REQUISITE 11. Select checkbox 'Receive special offers from our partners!'
  await signupPage.checkOffers();

  //PRE-REQUISITE 12. Fill details: First name, Last name, Company, Address, Address2, Country, State, City, Zipcode, Mobile Number
  await signupPage.fillFirstName(testData.firstName);
  await signupPage.fillLastName(testData.lastName);
  await signupPage.fillCompany(testData.company);
  await signupPage.fillAddress(testData.address);
  await signupPage.selectCountry(testData.country);
  await signupPage.fillState(testData.state);
  await signupPage.fillCity(testData.city);
  await signupPage.fillZipCode(testData.zipCode);
  await signupPage.fillMobileNumber(testData.mobileNumber);

  //PRE-REQUISITE 13. Click 'Create Account button'
  await signupPage.clickCreateAccount();

  //PRE-REQUISITE 14. Verify that 'ACCOUNT CREATED!' is visible
  const accountCreatedPage = new AccountCreatedPage(page);
  await accountCreatedPage.verifyAccountCreatedVisible();

  //PRE-REQUISITE 15. Click 'Continue' button
  await accountCreatedPage.clickContinue();

  //PRE-REQUISITE 16. Verify that 'Logged in as username' is visible
  await homePage.verifyLoggedInUser(name);

  //PRE-REQUISITE 17. Click logout
  await homePage.clickLogout();

  //PRE-REQUISITE 18. Click Home
  await homePage.clickHome();

    //===================================================================================//

  //3. Verify that home page is visible successfully
  await homePage.verifyCarouselVisible();

  //4. Click on 'Signup / Login' button
  await homePage.clickOnLoginBtn();

  //5. Verify 'Login to your account' is visible
  await loginPage.verifyLoginToAccountVisible()

  //6. Enter correct email address and password
  await loginPage.fillEmailAndPassword(email, password)

  //7. Click 'login' button
  await loginPage.clickLoginBtn();

  //8. Verify that 'Logged in as username' is visible
  await homePage.verifyLoggedInUser(name)

  //9. Click 'Logout' button
  await homePage.clickLogout()

  //10. Verify that user is navigated to login page
    await loginPage.verifyLoginToAccountVisible()
});
