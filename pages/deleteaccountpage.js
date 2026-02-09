import {expect} from '@playwright/test'

export class DeleteAccountPage
{
    constructor(page)
    {
        this.page = page
        this.textAccountDeleted = "//h2[@data-qa='account-deleted']/b"
        this.btnContinue = "//a[@data-qa='continue-button']"
    }

    async verifyAccountDeletedVisible()
    {
        await expect(this.page.locator(this.textAccountDeleted)).toBeVisible()
    }

    async clickContinue()
    {
        await this.page.click(this.btnContinue)
    }


}