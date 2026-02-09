import { expect } from "@playwright/test";
const json = JSON.parse(JSON.stringify(require("../testdata.json")));

export class CartPage {
  constructor(page) {
    this.page = page;
    this.textSubscription = "//div[@class='single-widget']/h2";
    this.inputSubscribeEmail = "input#susbscribe_email";
    this.btnSubscribe = "button#subscribe";
    this.textSuccessSubscribed = "//div[@id='success-subscribe']/div";
    this.tableProducts = "tbody>tr";
    this.linkProdOneName = "//a[@href='/product_details/1']";
    this.productOnePrice = "//tr[@id='product-1']/td[@class='cart_price']/p";
    this.linkProdTwoName = "//a[@href='/product_details/2']";
    this.productTwoPrice = "//tr[@id='product-2']/td[@class='cart_price']/p";
    this.productOneTotalPrice = "//tr[@id='product-1']/td[@class='cart_total']/p";
    this.productTwoTotalPrice = "//tr[@id='product-2']/td[@class='cart_total']/p";
    this.btnQuantity = "//td[@class='cart_quantity']/button";
    this.textShoppingCart = "//li[text()='Shopping Cart']";
    this.linkProceedToCheckout = "//a[text()='Proceed To Checkout']";
    this.linkLoginInModal = "//p/a[@href='/login']";
    this.btnDeleteFirstProduct = "//td[@class='cart_delete']/a[@data-product-id='1']";
    this.btnDeleteSecondProduct = "//td[@class='cart_delete']/a[@data-product-id='2']";
    this.rowSecondProduct = "tr#product-2";
    this.linkLoginInHeader = "//li/a[@href='/login']";
  }

  async verifySubscriptionText() {
    await expect(this.page.locator(this.textSubscription)).toBeVisible();
    await expect(this.page.locator(this.textSubscription)).toContainText(/Subscription/i);
  }

  async fillSubscribeEmail(email) {
    await this.page.fill(this.inputSubscribeEmail, email);
  }

  async clickSubscribeButton() {
    await this.page.click(this.btnSubscribe);
  }

  async verifySuccessSubscribeVisible() {
    await expect(this.page.locator(this.textSuccessSubscribed)).toBeVisible();
    await expect(this.page.locator(this.textSuccessSubscribed)).toContainText(/You have been successfully subscribed!/i);
  }

  async verifyNumberOfProducts(n) {
    await expect(this.page.locator(this.tableProducts)).toHaveCount(n);
  }

  async verifyProductsInformation() {
    await expect(this.page.locator(this.linkProdOneName)).toHaveText(json.first_product_name);
    await expect(this.page.locator(this.linkProdTwoName)).toHaveText(json.second_product_name);
    await expect(this.page.locator(this.productOnePrice)).toHaveText(json.first_product_price);
    await expect(this.page.locator(this.productTwoPrice)).toHaveText(json.second_product_price);
    await expect(this.page.locator(this.productOneTotalPrice)).toHaveText(json.first_product_total_price);
    await expect(this.page.locator(this.productTwoTotalPrice)).toHaveText(json.second_product_total_price);
  }

  async verifyProductQuantity() {
    await expect(this.page.locator(this.btnQuantity)).toContainText(json.product_quantity);
  }

  async verifyShoppingCartVisible() {
    await expect(this.page.locator(this.textShoppingCart)).toBeVisible();
  }

  async clickProceedToCheckout() {
    await this.page.click(this.linkProceedToCheckout);
  }

  async clickLoginFromModal() {
    await this.page.click(this.linkLoginInModal);
  }

  async deleteFirstProduct() {
    await this.page.click(this.btnDeleteFirstProduct);
  }

  async deleteSecondProduct() {
    await this.page.click(this.deleteSecondProduct);
  }

  async verifySecondProductOnCart() {
    await expect(this.page.locator(this.rowSecondProduct)).toBeVisible();
    await expect(this.page.locator(this.linkProdTwoName)).toContainText(json.second_product_name);
  }

  async clickLoginInHeader() {
    await this.page.click(this.linkLoginInHeader);
  }
}
