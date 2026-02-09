import { expect } from "@playwright/test";

export class HomePage {
  constructor(page) {
    this.page = page;
    this.btnLogin = "//a[@href='/login']";
    this.btnDeleteAccount = "//a[@href='/delete_account']";
    this.carousel = "//div[@id='slider-carousel']";
    this.usernameText = "//ul[@class='nav navbar-nav']/li[10]/a/b";
    this.btnLogout = "//a[@href='/logout']";
    this.btnHome = "//li/a[@href='/']";
    this.linkContactUs = "//a[@href='/contact_us']";
    this.btnTestCasesInNavbar = "//ul[@class='nav navbar-nav']/li/a[@href='/test_cases']";
    this.linkProducts = "//a[@href='/products']";
    this.textSubscription = "//div[@class='single-widget']/h2";
    this.inputSubscribeEmail = "input#susbscribe_email";
    this.btnSubscribe = "button#subscribe";
    this.textSuccessSubscribed = "//div[@id='success-subscribe']/div";
    this.linkCart = "//li/a[@href='/view_cart']";
    this.linkViewCartInModal = "//p/a[@href='/view_cart']";
    this.linkViewFirstProduct = "//a[@href='/product_details/1']";
    this.linkAddFirstProductToCart = "//div[@class='features_items']/div[2]/div/div/div/a[@data-product-id='1']";
    this.linkAddSecondProductToCart = "//div[@class='features_items']/div[3]/div/div/div/a[@data-product-id='2']";
    this.btnContinueShopping = "//button[text()='Continue Shopping']";
    this.categories = "//div[@class='left-sidebar']/div[@id='accordian']/div/div/h4/a";
    this.linkFirstCategory = "//div[@class='left-sidebar']/div[@id='accordian']/div[1]/div/h4/a";
    this.linkFirstSubcategory = "//div[@id='Women']//a[contains(text(), 'Dress')]";
    this.linkSecondCategory = "//div[@class='left-sidebar']/div[@id='accordian']/div[2]/div/h4/a";
    this.linkSecondSubcategory = "//div[@id='Men']//a[contains(text(), 'Jeans')]";
    this.textRecommendedItems = "//div[@class='recommended_items']/h2";
    this.listOfLinksAddToCartForRecommendedItems = "//div[@id='recommended-item-carousel']//a";
    this.divRecommendedItems = "//div[@class='recommended_items']";
    this.textCopyright = "//div[@class='footer-bottom']//p";
    this.btnScrollUp = "a#scrollUp";
    this.textInCarousel = "//div[@class='item active']//h2[text()='Full-Fledged practice website for Automation Engineers']";
    this.logo = "//*[contains(@class, 'logo')]";
  }

  async clickOnLoginBtn() {
    await this.page.click(this.btnLogin);
  }

  async verifyCarouselVisible() {
    await expect(this.page.locator(this.carousel)).toBeVisible();
  }

  async verifyLoggedInUser(username) {
    await expect(this.page.locator(this.usernameText)).toContainText(username);
  }

  async clickOnDeleteAccount() {
    await this.page.click(this.btnDeleteAccount);
  }

  async clickLogout() {
    await this.page.click(this.btnLogout);
  }

  async clickHome() {
    await this.page.click(this.btnHome);
  }

  async clickContactUs() {
    await this.page.click(this.linkContactUs);
  }

  async clickTestCasesInNavbar() {
    await this.page.click(this.btnTestCasesInNavbar);
  }

  async clickProducts() {
    await this.page.click(this.linkProducts);
  }

  async verifyTextSubscription() {
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

  async clickCart() {
    await this.page.click(this.linkCart);
  }

  async clickViewFirstProduct() {
    await this.page.click(this.linkViewFirstProduct);
  }

  async addProductsToCart() {
    await this.page.click(this.linkAddFirstProductToCart);
    await this.page.click(this.btnContinueShopping);
    await this.page.click(this.linkAddSecondProductToCart);
  }

  async clickViewCartInModal() {
    await this.page.click(this.linkViewCartInModal);
  }

  async verifyCategoriesVisible() {
    for (const category of await this.page.locator(this.categories).all()) {
      await expect(category).toBeVisible();
    }
  }

  async clickFirstCategory() {
    await this.page.click(this.linkFirstCategory);
  }

  async clickFirstSubcategory() {
    await this.page.click(this.linkFirstSubcategory);
  }

  async clickSecondCategory() {
    await this.page.click(this.linkSecondCategory);
  }

  async clickSecondSubcategory() {
    await this.page.click(this.linkSecondSubcategory);
  }

  async verifyRecommendedItemsVisible() {
    //await this.page.locator(this.textRecommendedItems).scrollIntoViewIfNeeded();
    await expect(this.page.locator(this.textRecommendedItems)).toBeVisible();
  }

  async addToCartItemFromRecommended() {
    const links = await this.page.locator(this.listOfLinksAddToCartForRecommendedItems);
    const cnt = await this.page.locator(this.listOfLinksAddToCartForRecommendedItems).count();
    for (let i = 0; i < cnt; i++) {
      if (links.nth(i).isVisible()) {
        await links.nth(i).click();
        console.log(`Clicked on link # ${i}`);
        break;
      }
    }
  }

  async scrollToRecommendedItems() {
    await this.page.locator(this.divRecommendedItems).scrollIntoViewIfNeeded();
  }

  async scrollToCopyright() {
    await this.page.locator(this.textCopyright).scrollIntoViewIfNeeded();
  }

  async scrollToSubscription() {
    await this.page.locator(this.textSubscription).scrollIntoViewIfNeeded();
  }

  async verifySubscriptionTextInViewport() {
    await expect(this.page.locator(this.textSubscription)).toBeInViewport();
  }

  async clickScrollUp() {
    await this.page.click(this.btnScrollUp);
  }

  async verifySuccessfullScrollUp() {
    await expect(this.page.locator(this.textInCarousel)).toBeInViewport();
  }

  async scrollToLogo() {
    await this.page.locator(this.logo).scrollIntoViewIfNeeded();
  }

  async verifyLogoInViewport() {
    await expect(this.page.locator(this.logo)).toBeInViewport();
  }
}
