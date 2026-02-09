import {test, expect} from '@playwright/test'
const json = JSON.parse(JSON.stringify(require('../testdata.json')))
import {HomePage} from '../pages/homepage'
import {ProductsPage} from '../pages/productspage'

test("Search Product", async({page})=> {
    
    // 1. Launch browser
    // 2. Navigate to url 'http://automationexercise.com'
    await page.goto(json.url)

    // 3. Verify that home page is visible successfully
    const homePage = new HomePage(page)
    await homePage.verifyCarouselVisible()

    // 4. Click on 'Products' button
    await homePage.clickProducts()

    // 5. Verify user is navigated to ALL PRODUCTS page successfully
    const productsPage = new ProductsPage(page)
    await productsPage.verifyAllProductsVisible()

    // 6. Enter product name in search input and click search button
    await productsPage.fillSearchInput(json.product_name)
    await productsPage.clickSearchButton()

    // 7. Verify 'SEARCHED PRODUCTS' is visible
    await productsPage.verifySearchedProducts()

    //8. Verify all the products related to search are visible
    await productsPage.verifyProductsRelatedToSearch(json.product_name)

})