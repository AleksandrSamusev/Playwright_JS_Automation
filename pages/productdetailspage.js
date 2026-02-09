import { expect } from "@playwright/test";

export class ProductDetailsPage {
  constructor(page) {
    this.page = page;
    this.divQuantity = "div#text-field-container";
    this.productName = "//div[@class='product-information']/h2";
    this.productCategory = "//div[@class='product-information']/p[1]";
    this.productPrice = "//div[@class='product-information']/span/span";
    this.productAvailability = "//div[@class='product-information']/p[2]";
    this.productCondition = "//div[@class='product-information']/p[3]";
    this.productBrand = "//div[@class='product-information']/p[4]";
    this.linkWriteReview = "//a[contains(text(), 'Write Your Review')]";
    this.inputQuantity = "input#quantity";
    this.btnAddToCart = "//div[@class='product-information']/*/button";
    this.linkViewCart = "//p/a[@href='/view_cart']";
    this.inputName = "//input[@placeholder='Your Name']";
    this.inputEmail = "//input[@placeholder='Email Address']";
    this.inputReview = "textarea#review";
    this.btnSubmitReview = "button#button-review";
    this.textThankYou = "//span[text()='Thank you for your review.']";
  }

  async verifyProductPriceVisible() {
    await expect(this.page.locator(this.productPrice)).toBeVisible();
  }

  async verifyProductInformation() {
    await expect(this.page.locator(this.productName)).toBeVisible();
    await expect(this.page.locator(this.productCategory)).toBeVisible();
    await expect(this.page.locator(this.productPrice)).toBeVisible();
    await expect(this.page.locator(this.productAvailability)).toBeVisible();
    await expect(this.page.locator(this.productCondition)).toBeVisible();
    await expect(this.page.locator(this.productBrand)).toBeVisible();
  }

  async verifyWriteReviewVisible() {
    await expect(this.page.locator(this.linkWriteReview)).toBeVisible();
  }

  async setQuantity(qty) {
    await this.page.fill(this.inputQuantity, qty);
  }

  async clickAddToCart() {
    await this.page.click(this.btnAddToCart);
  }

  async clickViewCart() {
    await this.page.click(this.linkViewCart);
  }

  async fillReviewName(nm) {
    await this.page.fill(this.inputName, nm);
  }

  async fillReviewEmail(em) {
    await this.page.fill(this.inputEmail, em);
  }

  async fillReviewContent(rv) {
    await this.page.fill(this.inputReview, rv);
  }

  async clickSubmitReview() {
    await this.page.click(this.btnSubmitReview);
  }

  async verifyTextThankYou() {
    await expect(this.page.locator(this.textThankYou)).toBeVisible();
  }
}
