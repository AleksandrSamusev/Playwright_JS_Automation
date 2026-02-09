import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/homepage.js";
import { LoginPage } from "../pages/loginpage.js";
import { SignupPage } from "../pages/signuppage.js";
import { AccountCreatedPage } from "../pages/accountcreatedpage.js";
import { DeleteAccountPage } from "../pages/deleteaccountpage.js";
import { generateName, generateEmailAddress, generatePassword } from "../util/functions.js";
import { CheckoutPage } from "../pages/checkoutpage.js";
const json = JSON.parse(JSON.stringify(require("../testdata.json")));
import { CartPage } from "../pages/cartpage.js";

test("Verify address details in checkout page", async ({ page }) => {
  const name = generateName();
  const email = generateEmailAddress();
  const password = generatePassword();

  // 1. Launch browser
  // 2. Navigate to url 'http://automationexercise.com'

  await page.goto(json.url);

  // 3. Verify that home page is visible successfully
  const homePage = new HomePage(page);
  homePage.verifyCarouselVisible();

  // 4. Click 'Signup / Login' button
  homePage.clickOnLoginBtn();

  // 5. Fill all details in Signup and create account
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
  await signupPage.setDateOfBirth(json.day, json.month, json.year);

  //10. Select checkbox 'Sign up for our newsletter!'
  await signupPage.ckeckNewsletter();

  //11. Select checkbox 'Receive special offers from our partners!'
  await signupPage.checkOffers();

  //12. Fill details: First name, Last name, Company, Address, Address2, Country, State, City, Zipcode, Mobile Number
  await signupPage.fillFirstName(json.firstName);
  await signupPage.fillLastName(json.lastName);
  await signupPage.fillCompany(json.company);
  await signupPage.fillAddress(json.address);
  await signupPage.selectCountry(json.country);
  await signupPage.fillState(json.state);
  await signupPage.fillCity(json.city);
  await signupPage.fillZipCode(json.zipCode);
  await signupPage.fillMobileNumber(json.mobileNumber);

  //13. Click 'Create Account button'
  await signupPage.clickCreateAccount();

  // 6. Verify 'ACCOUNT CREATED!' and click 'Continue' button
  const accountCreatedPage = new AccountCreatedPage(page);
  await accountCreatedPage.verifyAccountCreatedVisible();
  await accountCreatedPage.clickContinue();

  // 7. Verify ' Logged in as username' at top
  await homePage.verifyLoggedInUser(name);

  // 8. Add products to cart
  await homePage.addProductsToCart();

  // 9. Click 'Cart' button
  await homePage.clickViewCartInModal();

  // 10. Verify that cart page is displayed
  const cartPage = new CartPage(page);
  await cartPage.verifyNumberOfProducts(2);

  // 11. Click Proceed To Checkout
  await cartPage.clickProceedToCheckout();

  // 12. Verify that the delivery address is same address filled at the time registration of account
  const checkoutPage = new CheckoutPage(page);
  await checkoutPage.verifyDeliveryAddressDetails(json);

  // 13. Verify that the billing address is same address filled at the time registration of account
  await checkoutPage.verifyInvoiceAddressDetails(json);

  // 14. Click 'Delete Account' button
  await checkoutPage.clickDeleteAccount();

  // 15. Verify 'ACCOUNT DELETED!' and click 'Continue' button
  const deleteAccountPage = new DeleteAccountPage(page);
  await deleteAccountPage.verifyAccountDeletedVisible();
  await deleteAccountPage.clickContinue();
});
