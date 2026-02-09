import {test, expect} from '@playwright/test'
const json = JSON.parse(JSON.stringify(require('../testdata.json')))
import {HomePage} from '../pages/homepage'
import {generateEmailAddress} from '../util/functions.js'

test("Verify Subscription in home page", async({page}) => {

    const emailAddr = generateEmailAddress()
    
    // 1. Launch browser
    // 2. Navigate to url 'http://automationexercise.com'
    
    await page.goto(json.url)

    // 3. Verify that home page is visible successfully
    const homePage = new HomePage(page)
    await homePage.verifyCarouselVisible()

    // 4. Scroll down to footer
    // 5. Verify text 'SUBSCRIPTION'
    await homePage.verifyTextSubscription()

    // 6. Enter email address in input and click arrow button
    await homePage.fillSubscribeEmail(emailAddr)
    await homePage.clickSubscribeButton()

    // 7. Verify success message 'You have been successfully subscribed!' is visible
    await homePage.verifySuccessSubscribeVisible()
    


})