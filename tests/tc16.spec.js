import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/homepage.js";
import { LoginPage } from "../pages/loginpage.js";
import { SignupPage } from "../pages/signuppage.js";
import { CheckoutPage } from "../pages/checkoutpage.js";
import { AccountCreatedPage } from "../pages/accountcreatedpage.js";
import { CartPage } from "../pages/cartpage.js";
import { PaymentPage } from "../pages/paymentpage.js";
import { generateName, generateEmailAddress, generatePassword } from "../util/functions.js";
const json = JSON.parse(JSON.stringify(require("../testdata.json")));

test("Place Order: Login before Checkout", async ({ page }) => {
  const name = generateName();
  const email = generateEmailAddress();
  const password = generatePassword();

  // PRE-REQUISITE ---> CREATE NEW USER AND LOGOUT

  //PRE-REQUISITE 2. Navigate to url 'http://automationexercise.com'
  await page.goto(json.url);

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
  await signupPage.setDateOfBirth(json.day, json.month, json.year);

  //PRE-REQUISITE 10. Select checkbox 'Sign up for our newsletter!'
  await signupPage.ckeckNewsletter();

  //PRE-REQUISITE 11. Select checkbox 'Receive special offers from our partners!'
  await signupPage.checkOffers();

  //PRE-REQUISITE 12. Fill details: First name, Last name, Company, Address, Address2, Country, State, City, Zipcode, Mobile Number
  await signupPage.fillFirstName(json.firstName);
  await signupPage.fillLastName(json.lastName);
  await signupPage.fillCompany(json.company);
  await signupPage.fillAddress(json.address);
  await signupPage.selectCountry(json.country);
  await signupPage.fillState(json.state);
  await signupPage.fillCity(json.city);
  await signupPage.fillZipCode(json.zipCode);
  await signupPage.fillMobileNumber(json.mobileNumber);

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

  // 3. Verify that home page is visible successfully
  await homePage.verifyCarouselVisible();

  // 4. Click 'Signup / Login' button
  await homePage.clickOnLoginBtn();

  // 5. Fill email, password and click 'Login' button
  await loginPage.fillEmailAndPassword(email, password);
  await loginPage.clickLoginBtn();

  // 6. Verify 'Logged in as username' at top
  await homePage.verifyLoggedInUser(name);

  // 7. Add products to cart
  await homePage.addProductsToCart();

  // 8. Click 'Cart' button
  await homePage.clickViewCartInModal();

  // 9. Verify that cart page is displayed
  const cartPage = new CartPage(page);
  await cartPage.verifyShoppingCartVisible();

  // 10. Click Proceed To Checkout
  await cartPage.clickProceedToCheckout();

  // 11. Verify Address Details and Review Your Order
  const checkoutPage = new CheckoutPage(page);
  await checkoutPage.verifyDeliveryAddressDetails(json);
  await checkoutPage.verifyInvoiceAddressDetails(json);

  // 12. Enter description in comment text area and click 'Place Order'
  await checkoutPage.fillMessage(json.checkout_message);
  await checkoutPage.clickPlaceOrder();

  // 13. Enter payment details: Name on Card, Card Number, CVC, Expiration date
  const paymentPage = new PaymentPage(page);
  await paymentPage.fillPaymentDetails(json);

  // 14. Click 'Pay and Confirm Order' button
  // 15. Verify success message 'Your order has been placed successfully!'
  await paymentPage.clickPay();

  // 16. Click 'Delete Account' button
  await paymentPage.clickDeleteAccount();

  // 17. Verify 'ACCOUNT DELETED!' and click 'Continue' button
  await paymentPage.verifyAccountDeletedVisible();
  await paymentPage.clickContinue();
});
