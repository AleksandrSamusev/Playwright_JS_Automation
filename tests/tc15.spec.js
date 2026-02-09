import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/homepage";
import { LoginPage } from "../pages/loginpage";
import { SignupPage } from "../pages/signuppage";
import { AccountCreatedPage } from "../pages/accountcreatedpage";
import { CartPage } from "../pages/cartpage";
import { CheckoutPage } from "../pages/checkoutpage";
import { PaymentPage } from "../pages/paymentpage";
const json = JSON.parse(JSON.stringify(require("../testdata.json")));
import { generateName, generateEmailAddress, generatePassword } from "../util/functions.js";

test("Place Order: Register before Checkout", async ({ page }) => {
  const name = generateName();
  const email = generateEmailAddress();
  const password = generatePassword();
  // 1. Launch browser
  // 2. Navigate to url 'http://automationexercise.com'

  await page.goto(json.url);

  // 3. Verify that home page is visible successfully

  const homePage = new HomePage(page);
  await homePage.verifyCarouselVisible();

  // 4. Click 'Signup / Login' button
  await homePage.clickOnLoginBtn();

  // 5. Fill all details in Signup and create account
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
  await cartPage.verifyShoppingCartVisible();

  // 11. Click Proceed To Checkout
  await cartPage.clickProceedToCheckout();

  // 12. Verify Address Details and Review Your Order
  const checkoutPage = new CheckoutPage(page);
  await checkoutPage.verifyDeliveryAddressDetails(json);
  await checkoutPage.verifyInvoiceAddressDetails(json);

  // 13. Enter description in comment text area and click 'Place Order'
  await checkoutPage.fillMessage(json.checkout_message);
  await checkoutPage.clickPlaceOrder();

  // 14. Enter payment details: Name on Card, Card Number, CVC, Expiration date
  const paymentPage = new PaymentPage(page);
  await paymentPage.fillPaymentDetails(json);

  // 15. Click 'Pay and Confirm Order' button
  // 16. Verify success message 'Your order has been placed successfully!'
  await paymentPage.clickPay();

  // 17. Click 'Delete Account' button
  await paymentPage.clickDeleteAccount();

  // 18. Verify 'ACCOUNT DELETED!' and click 'Continue' button
  await paymentPage.verifyAccountDeletedVisible();
  await paymentPage.clickContinue();
});
