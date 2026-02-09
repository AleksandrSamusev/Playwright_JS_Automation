import {test, expect} from '@playwright/test'
const json = JSON.parse(JSON.stringify(require('../testdata.json')))
import { HomePage } from '../pages/homepage'
import {ProductDetailsPage} from '../pages/productdetailspage'
import { CartPage } from '../pages/cartpage'

test("Verify Product quantity in Cart", async({page}) => {

    // 1. Launch browser
    // 2. Navigate to url 'http://automationexercise.com'
    
    await page.goto(json.url)

    // 3. Verify that home page is visible successfully
    const homePage = new HomePage(page)
    await homePage.verifyCarouselVisible()

    // 4. Click 'View Product' for any product on home page
    await homePage.clickViewFirstProduct()

    // 5. Verify product detail is opened
    const productDetailsPage = new ProductDetailsPage(page)
    await productDetailsPage.verifyWriteReviewVisible()

    // 6. Increase quantity to 4
    await productDetailsPage.setQuantity(json.product_quantity)

    // 7. Click 'Add to cart' button
    await productDetailsPage.clickAddToCart()

    // 8. Click 'View Cart' button
    await productDetailsPage.clickViewCart()

    // 9. Verify that product is displayed in cart page with exact quantity
    const cartPage = new CartPage(page)
    await cartPage.verifyProductQuantity()

})