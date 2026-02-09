import { expect } from "@playwright/test";

export class PaymentPage {
  constructor(page) {
    this.page = page;
    this.inputName = "//input[@data-qa='name-on-card']";
    this.inputCardNumber = "//input[@data-qa='card-number']";
    this.inputCVC = "//input[@data-qa='cvc']";
    this.expiryMonth = "//input[@data-qa='expiry-month']";
    this.expiryYear = "//input[@data-qa='expiry-year']";
    this.btnPay = "//button[@data-qa='pay-button']";
    this.textSuccessOrdered = "//div[contains(text(),'Your order has been placed successfully!')]";
    this.linkDeleteAccount = "//a[@href='/delete_account']";
    this.textAccountDeleted = "//h2[@data-qa='account-deleted']/b";
    this.linkContinue = "//a[@data-qa='continue-button']";
    this.linkDownloadInvoice = "//a[contains(text(), 'Download Invoice')]";
  }

  async fillPaymentDetails(json) {
    // fill name on card
    await this.page.fill(this.inputName, json.name_on_card);
    // fill card number
    await this.page.fill(this.inputCardNumber, json.card_number);
    // fill CVC
    await this.page.fill(this.inputCVC, json.cvc);
    // fill expiration date
    await this.page.fill(this.expiryMonth, json.expiration_month);
    await this.page.fill(this.expiryYear, json.expiration_year);
  }

  async clickPay() {
    await this.page.click(this.btnPay);
    expect(this.page.locator(this.textAccountDeleted)).toBeVisible();
    expect(this.page.locator(this.textAccountDeleted)).toContainText(/Account Deleted!/i);
  }

  //   async verifySuccessfullOrder() {
  //     await expect(this.page.locator(this.textSuccessOrdered)).toBeVisible();
  //     await expect(this.page.locator(this.textSuccessOrdered)).toContainText(/Your order has been placed successfully!/i);
  //   }

  async clickDeleteAccount() {
    await this.page.click(this.linkDeleteAccount);
  }

  async verifyAccountDeletedVisible() {
    await expect(this.page.locator(this.textAccountDeleted)).toBeVisible();
    await expect(this.page.locator(this.textAccountDeleted)).toContainText(/Account Deleted!/i);
  }

  async clickContinue() {
    await this.page.click(this.linkContinue);
  }

  async clickDownloadInvoice() {
    await this.page.click(this.linkDownloadInvoice);
  }
}
