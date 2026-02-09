import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/homepage";
import { ContactUsPage } from "../pages/contactuspage";
const json = JSON.parse(JSON.stringify(require("../tc6_testdata.json")));

test("Contact Us Form", async ({ page }) => {

  page.on('dialog', async dialog => await dialog.accept())

  //1. Launch browser
  //2. Navigate to url 'http://automationexercise.com'
  await page.goto(json.url);

  //3. Verify that home page is visible successfully
  const homePage = new HomePage(page);
  await homePage.verifyCarouselVisible();

  //4. Click on 'Contact Us' button
  await homePage.clickContactUs();

  //5. Verify 'GET IN TOUCH' is visible
  const contactUsPage = new ContactUsPage(page);
  await contactUsPage.verifyGetInTouchVisible();

  //6. Enter name, email, subject and message
  await contactUsPage.fillName(json.name);
  await contactUsPage.fillEmail(json.email);
  await contactUsPage.fillSubject(json.subject);
  await contactUsPage.fillMessage(json.message);

  //7. Upload file
  await contactUsPage.setFileToUpload(json.file_path);

  //8. Click 'Submit' button
  await contactUsPage.clickSubmit();  

  // //9. Click OK button

  //10. Verify success message 'Success! Your details have been submitted successfully.' is visible
  await contactUsPage.verifySuccessSubmission()
});
