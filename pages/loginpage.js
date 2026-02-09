import {expect} from '@playwright/test'

export class LoginPage {

  constructor(page) {
    this.page = page;
    this.inputLoginEmail = "//input[@data-qa='login-email']";
    this.inputLoginPassword = "//input[@data-qa='login-password']";
    this.btnLogin = "//button[@data-qa='login-button']";
    this.loginToAccountText = "//h2[text()='Login to your account']";
    this.newUserSignupText = "//h2[text()='New User Signup!']"
    this.inputName = "//input[@data-qa='signup-name']"
    this.inputEmail = "//input[@data-qa='signup-email']"
    this.btnSignup = "//button[@data-qa='signup-button']"
    this.textWrongCredentials = "//p[text()='Your email or password is incorrect!']"
  }

  async fillAccountDetails(uName, pass) {
    await this.page.fill(this.email, uName);
    await this.page.fill(this.password, pass);    
  }

  async clickLoginBtn() {
    await this.page.click(this.btnLogin); 
  }

  async verifyLoginToAccountVisible() {
    await expect(this.page.locator(this.loginToAccountText)).toBeVisible();
  }

  async verifyNewUserSignupVisible()
  {
    await expect(this.page.locator(this.newUserSignupText)).toBeVisible()
  }

  async enterNameAndEmailAddress(uName, uEmail)
  {
    await this.page.fill(this.inputName, uName)
    await this.page.fill(this.inputEmail, uEmail)
  }

  async clickSignupBtn()
  {
    await this.page.click(this.btnSignup)
  }

  async fillEmailAndPassword(em, pass)
  {
    await this.page.fill(this.inputLoginEmail, em)
    await this.page.fill(this.inputLoginPassword, pass)
  }

  async validateWrongCredentials()
  {
    await expect(this.page.locator(this.textWrongCredentials)).toBeVisible()
  }
}
