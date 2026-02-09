import { expect } from '@playwright/test'

export class SignupPage {
  constructor(page) {
    this.page = page;
    this.textEnterAccountInformation = "//div[@class='login-form']/h2/b";
    this.radioTitleMr = "//input[@id='id_gender1']";
    this.inputName = "//input[@data-qa='name']";
    this.password = "//input[@data-qa='password']";
    this.day = "select#days";
    this.month = "select#months";
    this.year = "select#years";
    this.chkNewsletter = "//input[@id='newsletter']"
    this.chkOffers = '//input[@id="optin"]'
    this.fName = '//input[@data-qa="first_name"]'
    this.lName = '//input[@data-qa="last_name"]'
    this.company = '//input[@data-qa="company"]'
    this.address = '//input[@data-qa="address"]'
    this.address2 = ''
    this.country = '//select[@data-qa="country"]'
    this.state = '//input[@data-qa="state"]'
    this.city = '//input[@data-qa="city"]'
    this.zipCode = '//input[@data-qa="zipcode"]'
    this.mobileNumber = '//input[@data-qa="mobile_number"]'
    this.btnCreateAccount = "//button[text()='Create Account']"
    this.textEmailAlreadyExist = "//p[text()='Email Address already exist!']"
  }

  async verifyEnterInformationVisible() {
    await expect(this.page.locator(this.textEnterAccountInformation)).toBeVisible();
  }

  async selectTitleMr() {
    await this.page.click(this.radioTitleMr);
  }

  async fillName(nm) {
    await this.page.fill(this.inputName, nm);
  }

  async fillPassword(passw) {
    await this.page.fill(this.password, passw);
  }

  async setDateOfBirth(day, month, year) {
    await this.page.locator(this.day).selectOption({ value: day });
    await this.page.locator(this.month).selectOption({ value: month });
    await this.page.locator(this.year).selectOption({ value: year });
  }

  async ckeckNewsletter()
  {
    await this.page.click(this.chkNewsletter)
  }

  async checkOffers()
  {
    await this.page.click(this.chkOffers)
  }

  async fillFirstName(fn)
  {
    await this.page.fill(this.fName, fn)
  }

  async fillLastName(ln)
  {
    await this.page.fill(this.lName, ln)
  }

  async fillCompany(comp)
  {
    await this.page.fill(this.company, comp)
  }

  async fillAddress(addr)
  {
    await this.page.fill(this.address, addr)
  }

  async selectCountry(ctry)
  {
    await this.page.locator(this.country).selectOption({value: ctry})
  }

  async fillState(state)
  {
    await this.page.fill(this.state, state)
  }

  async fillCity(city)
  {
    await this.page.fill(this.city, city)
  }

  async fillZipCode(code)
  {
    await this.page.fill(this.zipCode, code)
  }

  async fillMobileNumber(nmb)
  {
    await this.page.fill(this.mobileNumber, nmb)
  }

  async clickCreateAccount()
  {
    await this.page.click(this.btnCreateAccount)
  }

  async validateEmailAlreadyExist()
  {
    await expect(this.page.locator(this.textEmailAlreadyExist)).toBeVisible()
  }
}
