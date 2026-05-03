import BasePage from './BasePage';

class CheckoutPage extends BasePage {
    get firstNameInput() {
        return this.byAccessibilityId('test-First Name');
    }

    get lastNameInput() {
        return this.byAccessibilityId('test-Last Name');
    }

    get postalCodeInput() {
        return this.byAccessibilityId('test-Zip/Postal Code');
    }

    get continueButton() {
        return this.byAccessibilityId('test-CONTINUE');
    }

    get finishButton() {
        return this.byAccessibilityId('test-FINISH');
    }

    get completeHeader() {
        // Fallback to accessibility id if text matching fails
        return this.byAccessibilityId('test-CHECKOUT: COMPLETE!');
    }

    get completeText() {
        return this.byAccessibilityId('test-THANK YOU FOR YOUR ORDER');
    }

    async enterInformation(firstName: string, lastName: string, zip: string) {
        await this.setValue(this.firstNameInput, firstName);
        await this.setValue(this.lastNameInput, lastName);
        await this.setValue(this.postalCodeInput, zip);
        await this.clickElement(this.continueButton);
    }

    async finishCheckout() {
        await this.clickElement(this.finishButton);
    }

    async isCheckoutComplete(): Promise<boolean> {
        try {
            // Wait for at least one of the indicators to be displayed
            const header = await this.completeHeader;
            await header.waitForDisplayed({ timeout: 10000 });
            return await header.isDisplayed();
        } catch (e) {
            // Secondary check for the sub-text
            try {
                const text = await this.completeText;
                return await text.isDisplayed();
            } catch (err) {
                return false;
            }
        }
    }
}

export default new CheckoutPage();
