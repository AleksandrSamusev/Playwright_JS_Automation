import { test, expect } from "@playwright/test";
const json = JSON.parse(JSON.stringify(require("../testdata.json")));
import { HomePage } from "../pages/homepage";
import { CartPage } from "../pages/cartpage";
import { LoginPage } from "../pages/loginpage";
import { SignupPage } from "../pages/signuppage.js";
import { CheckoutPage } from "../pages/checkoutpage.js";
import { PaymentPage } from "../pages/paymentpage.js";
import { generateName, generateEmailAddress, generatePassword } from "../util/functions.js";
import { AccountCreatedPage } from "../pages/accountcreatedpage.js";
import { DeleteAccountPage } from "../pages/deleteaccountpage.js";
import * as fs from "fs";
import * as path from "path";

test("Download Invoice after purchase order", async ({ page }) => {
  const name = generateName();
  const email = generateEmailAddress();
  const password = generatePassword();
  const downloadsPath = path.join(__dirname, "downloads");

  if (!fs.existsSync(downloadsPath)) {
    fs.mkdirSync(downloadsPath, { recursive: true });
  }

  // 1. Launch browser
  // 2. Navigate to url 'http://automationexercise.com'
  await page.goto(json.url);

  // 3. Verify that home page is visible successfully
  const homePage = new HomePage(page);
  await homePage.verifyCarouselVisible();

  // 4. Add products to cart
  await homePage.addProductsToCart();

  // 5. Click 'Cart' button
  await homePage.clickViewCartInModal();

  // 6. Verify that cart page is displayed
  const cartPage = new CartPage(page);
  await cartPage.verifyShoppingCartVisible();

  // 7. Click Proceed To Checkout
  await cartPage.clickProceedToCheckout();

  // 8. Click 'Register / Login' button
  await cartPage.clickLoginFromModal();

  // 9. Fill all details in Signup and create account
  const loginPage = new LoginPage(page);

  // CREATE ACCOUNT -  Enter name and email address
  await loginPage.enterNameAndEmailAddress(name, email);

  //CREATE ACCOUNT -  Click 'Signup' button
  await loginPage.clickSignupBtn();

  //CREATE ACCOUNT -  Verify that 'ENTER ACCOUNT INFORMATION' is visible
  const signupPage = new SignupPage(page);
  await signupPage.verifyEnterInformationVisible();

  //CREATE ACCOUNT -  Fill details: Title, Name, Email, Password, Date of birth
  await signupPage.selectTitleMr();
  await signupPage.fillName(name);
  await signupPage.fillPassword(password);
  await signupPage.setDateOfBirth(json.day, json.month, json.year);

  //CREATE ACCOUNT -  Select checkbox 'Sign up for our newsletter!'
  await signupPage.ckeckNewsletter();

  //CREATE ACCOUNT -  Select checkbox 'Receive special offers from our partners!'
  await signupPage.checkOffers();

  //CREATE ACCOUNT -  Fill details: First name, Last name, Company, Address, Address2, Country, State, City, Zipcode, Mobile Number
  await signupPage.fillFirstName(json.firstName);
  await signupPage.fillLastName(json.lastName);
  await signupPage.fillCompany(json.company);
  await signupPage.fillAddress(json.address);
  await signupPage.selectCountry(json.country);
  await signupPage.fillState(json.state);
  await signupPage.fillCity(json.city);
  await signupPage.fillZipCode(json.zipCode);
  await signupPage.fillMobileNumber(json.mobileNumber);

  //CREATE ACCOUNT -  Click 'Create Account button'
  await signupPage.clickCreateAccount();

  // 10. Verify 'ACCOUNT CREATED!' and click 'Continue' button
  const accountCreatedPage = new AccountCreatedPage(page);
  await accountCreatedPage.verifyAccountCreatedVisible();
  await accountCreatedPage.clickContinue();

  // 11. Verify ' Logged in as username' at top
  await homePage.verifyLoggedInUser(name);

  // 12.Click 'Cart' button
  await homePage.clickCart();

  // 13. Click 'Proceed To Checkout' button
  await cartPage.clickProceedToCheckout();

  // 14. Verify Address Details and Review Your Order
  const checkoutPage = new CheckoutPage(page);
  await checkoutPage.verifyDeliveryAddressDetails(json);
  await checkoutPage.verifyInvoiceAddressDetails(json);

  // 15. Enter description in comment text area and click 'Place Order'
  await checkoutPage.fillMessage(json.checkout_message);
  await checkoutPage.clickPlaceOrder();

  // 16. Enter payment details: Name on Card, Card Number, CVC, Expiration date
  const paymentPage = new PaymentPage(page);
  await paymentPage.fillPaymentDetails(json);

  // 17. Click 'Pay and Confirm Order' button
  // 18. Verify success message 'Your order has been placed successfully!'
  await paymentPage.clickPay();

  // 19. Click 'Download Invoice' button and verify invoice is downloaded successfully.

  // Start waiting for the download event before the action
  const downloadPromise = page.waitForEvent("download");

  await paymentPage.clickDownloadInvoice();
  // Start waiting for the download event before the action
  const download = await downloadPromise;
  // Define the path where the file will be saved
  const savePath = path.join(downloadsPath, download.suggestedFilename());
  // Save the downloaded file to the specified path
  await download.saveAs(savePath);
  // Verify the file exists on the file system
  expect(fs.existsSync(savePath)).toBeTruthy();

  // 20. Click 'Continue' button
  await paymentPage.clickContinue();

  // 21. Click 'Delete Account' button
  await homePage.clickOnDeleteAccount();

  // 22. Verify 'ACCOUNT DELETED!' and click 'Continue' button
  const deleteAccountPage = new DeleteAccountPage(page);
  await deleteAccountPage.verifyAccountDeletedVisible();
  await deleteAccountPage.clickContinue();
});
