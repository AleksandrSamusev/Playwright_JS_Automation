import { expect } from "@playwright/test";
import { dirname } from 'path';

export class ContactUsPage {
  constructor(page) {
    this.page = page;
    this.textGetInTouch = "//h2[text()='Get In Touch']";
    this.inputName = "//input[@data-qa='name']";
    this.inputEmail = "//input[@data-qa='email']";
    this.inputSubject = "//input[@data-qa='subject']";
    this.textareaMessage = "//textarea[@data-qa='message']";
    this.btnChooseFile = "//input[@name='upload_file']";
    this.btnSubmit = "//input[@data-qa='submit-button']"
    this.divSuccessSubmission = "//div[@class='contact-form']/div[2]"
  }

  async verifyGetInTouchVisible() {
    await expect(this.page.locator(this.textGetInTouch)).toBeVisible();
  }

  async fillName(name) {
    await this.page.fill(this.inputName, name);
  }
  async fillEmail(email) {
    await this.page.fill(this.inputEmail, email);
  }
  async fillSubject(sub) {
    await this.page.fill(this.inputSubject, sub);
  }
  async fillMessage(msg) {
    await this.page.fill(this.textareaMessage, msg);
  }

  async setFileToUpload(path) {
    await this.page.locator(this.btnChooseFile).setInputFiles(path); 
  }

  async clickSubmit()
  {
    await this.page.click(this.btnSubmit) 
    await this.page.waitForLoadState('networkidle')
  }
  
  async verifySuccessSubmission()
  {
   await expect(this.page.locator(this.divSuccessSubmission)).toContainText(/Success! Your details have been submitted successfully./i)
  }
}
