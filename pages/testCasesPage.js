import {expect} from '@playwright/test'

export class TestCasesPage
{
    constructor(page)
    {
        this.page=page
        this.textTestCases = "//h2/b[text()='Test Cases']"
    }

    async verifyTestCasesVisible()
    {
        await expect(this.page.locator(this.textTestCases)).toBeVisible()
        await expect(this.page.locator(this.textTestCases)).toContainText(/test cases/i)
    }
}