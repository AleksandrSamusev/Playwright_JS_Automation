import { expect } from "@playwright/test";

export class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.textDeliveryName = "//ul[@id='address_delivery']/li[2]";
    this.textDeliveryCompany = "//ul[@id='address_delivery']/li[3]";
    this.textDeliveryStreet = "//ul[@id='address_delivery']/li[4]";
    this.textDeliveryCity = "//ul[@id='address_delivery']/li[6]";
    this.textDeliveryCountry = "//ul[@id='address_delivery']/li[7]";
    this.textDeliveryPhone = "//ul[@id='address_delivery']/li[8]";

    this.textInvoiceName = "//ul[@id='address_invoice']/li[2]";
    this.textInvoiceCompany = "//ul[@id='address_invoice']/li[3]";
    this.textInvoiceStreet = "//ul[@id='address_invoice']/li[4]";
    this.textInvoiceCity = "//ul[@id='address_invoice']/li[6]";
    this.textInvoiceCountry = "//ul[@id='address_invoice']/li[7]";
    this.textInvoicePhone = "//ul[@id='address_invoice']/li[8]";

    this.textareaMessage = "//textarea[@name='message']";
    this.linkPlaceOrder = "//a[text()='Place Order']";
    this.linkDeleteAccount = "//a[@href='/delete_account']";
  }

  async verifyDeliveryAddressDetails(json) {
    // verify name
    await expect(this.page.locator(this.textDeliveryName)).toContainText(json.delivery_address_name);
    // verify company name
    await expect(this.page.locator(this.textDeliveryCompany)).toContainText(json.delivery_address_company);
    // verify street
    await expect(this.page.locator(this.textDeliveryStreet)).toContainText(json.address);
    // verify city
    await expect(this.page.locator(this.textDeliveryCity)).toContainText(json.city + " " + json.state + " " + json.zipCode);
    // verify country
    await expect(this.page.locator(this.textDeliveryCountry)).toContainText(json.delivery_address_country);
    // verify phone
    await expect(this.page.locator(this.textDeliveryPhone)).toContainText(json.mobileNumber);
  }

  async verifyInvoiceAddressDetails(json) {
    // verify name
    await expect(this.page.locator(this.textInvoiceName)).toContainText(json.invoice_address_name);
    // verify company name
    await expect(this.page.locator(this.textInvoiceCompany)).toContainText(json.invoice_address_company);
    // verify street
    await expect(this.page.locator(this.textInvoiceStreet)).toContainText(json.address);
    // verify city
    await expect(this.page.locator(this.textInvoiceCity)).toContainText(json.city + " " + json.state + " " + json.zipCode);
    // verify country
    await expect(this.page.locator(this.textInvoiceCountry)).toContainText(json.invoice_address_country);
    // verify phone
    await expect(this.page.locator(this.textInvoicePhone)).toContainText(json.mobileNumber);
  }

  async fillMessage(message) {
    await this.page.fill(this.textareaMessage, message);
  }
  async clickPlaceOrder() {
    await this.page.click(this.linkPlaceOrder);
  }

  async clickDeleteAccount() {
    await this.page.click(this.linkDeleteAccount);
  }
}
