export default class BasePage {
    /**
     * Reusable wait and click method
     * @param element WebdriverIO element
     */
    async clickElement(element: any) {
        const el = await element;
        await el.waitForDisplayed({ timeout: 15000 });
        await el.waitForEnabled({ timeout: 15000 });
        await el.click();
    }

    /**
     * Reusable wait and set value method
     * @param element WebdriverIO element
     * @param value string to set
     */
    async setValue(element: any, value: string) {
        const el = await element;
        await el.waitForDisplayed({ timeout: 15000 });
        await el.clearValue();
        await el.setValue(value);
    }

    /**
     * Reusable wait and get text method
     * @param element WebdriverIO element
     * @returns text of the element
     */
    async getText(element: any): Promise<string> {
        const el = await element;
        await el.waitForDisplayed({ timeout: 15000 });
        return await el.getText();
    }

    /**
     * Get an element by accessibility ID (deterministic selector)
     * @param id accessibility ID
     */
    byAccessibilityId(id: string) {
        return $(`~${id}`);
    }

    /**
     * Get an element by UIAutomator description
     * @param description content-desc attribute
     */
    byDescription(description: string) {
        return $(`android=new UiSelector().description("${description}")`);
    }

    /**
     * Get an element by its text
     * @param text exact text
     */
    byText(text: string) {
        return $(`android=new UiSelector().text("${text}")`);
    }
}
