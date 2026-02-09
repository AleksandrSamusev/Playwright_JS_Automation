import {expect} from '@playwright/test'

export class AccountCreatedPage
{
    constructor(page)
    {
        this.page=page
        this.textAccountCreated = "//h2[@data-qa='account-created']/b"
        this.btnContinue = "//a[@data-qa='continue-button']"
    }

    async verifyAccountCreatedVisible()
    {
        await expect(this.page.locator(this.textAccountCreated)).toBeVisible()
    }

    async clickContinue()
    {
        await this.page.click(this.btnContinue)
    }
}