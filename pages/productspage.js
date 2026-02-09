import { expect } from "@playwright/test";

export class ProductsPage {
  constructor(page) {
    this.page = page;
    this.textAllProducts = "//h2[normalize-space()='All Products']";
    this.divProducts = "//div[@class='features_items']";
    this.linkViewFirstProduct = "//a[@href='/product_details/1']";
    this.inputSearch = "input#search_product";
    this.btnSubmitSearch = "button#submit_search";
    this.textSearchedProducts = "//h2[text()='Searched Products']";
    this.listOfProducts = "//div[@class='single-products']";
    this.linkAddToCartFirstProduct = "//div[@class='single-products']/div/a[@data-product-id='1']";
    this.linkAddToCartSecondProduct = "//div[@class='single-products']/div/a[@data-product-id='2']";
    this.btnContinueShopping = "//button[@data-dismiss='modal']";
    this.linkViewCart = "//p/a[@href='/view_cart']";
    this.textBrands = "//div[@class='brands_products']/h2";
    this.linkFirstBrand = "//div[@class='brands-name']/ul/li[1]/a";
    this.linkThirdBrand = "//div[@class='brands-name']/ul/li[3]/a";
    this.headingBrands = "//div[@class='features_items']/h2";
    this.listProducts = "//div[@class='features_items']//div[@class='single-products']";
    this.listProductsNames = "//div[@class='single-products']/div/p";
    this.linkLoginInHeader = "//p/a[@href='/login']";
    this.linkViewCartInModal = "//p/a[@href='/view_cart']";

    // this.firstProductName="//div[@class='features_items']/div[2]/div/div[@class='single-products']/div/p"
    // this.firstProductPrice="//div[@class='features_items']/div[2]/div/div[@class='single-products']/div/h2"
    // this.secondProductName="//div[@class='features_items']/div[3]/div/div[@class='single-products']/div/p"
    // this.secondProductPrice="//div[@class='features_items']/div[3]/div/div[@class='single-products']/div/h2"
  }

  async verifyAllProductsVisible() {
    await expect(this.page.locator(this.textAllProducts)).toBeVisible();
  }

  async verifyProductsVisible() {
    await expect(this.page.locator(this.divProducts)).toBeVisible();
  }

  async clickViewFirstProduct() {
    await this.page.click(this.linkViewFirstProduct);
  }
  async fillSearchInput(prod) {
    await this.page.fill(this.inputSearch, prod);
  }

  async clickSearchButton() {
    await this.page.click(this.btnSubmitSearch);
  }

  async verifySearchedProducts() {
    await expect(this.page.locator(this.textSearchedProducts)).toBeVisible();
  }

  async verifyProductsRelatedToSearch(prod) {
    const listProdNames = this.page.locator(this.listProductsNames);
    const count = await listProdNames.count();
    let alias = "";
    if (prod === "top") {
      alias = "shirt";
    }
    for (let i = 0; i < count; i++) {
      await expect(listProdNames.nth(i)).toBeVisible();
      let temp = await listProdNames.nth(i).textContent();
      temp = temp.toLowerCase();
      expect(temp.includes(prod) || temp.includes(prod + "s") || temp.includes(alias) || temp.includes(alias + "s")).toBeTruthy();
    }
  }

  async addFirstProductToCart() {
    await this.page.click(this.linkAddToCartFirstProduct);
  }

  async clickContinueShopping() {
    await this.page.click(this.btnContinueShopping);
  }

  async addSecondProductToCart() {
    await this.page.click(this.linkAddToCartSecondProduct);
  }

  async clickViewCart() {
    this.page.click(this.linkViewCart);
  }

  async verifyBrandsVisible() {
    await expect(this.page.locator(this.textBrands)).toBeVisible();
  }

  async clickFirstBrand() {
    await this.page.click(this.linkFirstBrand);
  }

  async verifySelectedBrand(brand) {
    await expect(this.page.locator(this.headingBrands)).toContainText("Brand - " + brand + " Products");
  }

  async clickThirdBrand() {
    await this.page.click(this.linkThirdBrand);
  }

  async verifyListProductsNotEmpty() {
    await expect(this.page.locator(this.listOfProducts)).not.toHaveCount(0);
  }

  async clickLoginInHeader() {
    await this.page.click(this.linkLoginInHeader);
  }

  async clickViewCartInModal() {
    await this.page.click(this.linkViewCartInModal);
  }
}
