import {expect} from '@playwright/test'

export class CategoriesPage
{
    constructor(page)
    {
        this.page=page
        this.textCategory="//div[@class='features_items']/h2"
    }

    async verifyMenTitle(subcategory)
    {
        await expect(this.page.locator(this.textCategory)).toContainText("Men - " + subcategory + " Products")
    }

     async verifyWomenTitle(subcategory)
    {
        await expect(this.page.locator(this.textCategory)).toContainText("Women - " + subcategory + " Products")
    }
}