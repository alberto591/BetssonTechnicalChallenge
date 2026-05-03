import BasePage from './BasePage';

class CartPage extends BasePage {
    get checkoutButton() {
        return this.byAccessibilityId('test-CHECKOUT');
    }

    get continueShoppingButton() {
        return this.byAccessibilityId('test-CONTINUE SHOPPING');
    }

    async proceedToCheckout() {
        await this.clickElement(this.checkoutButton);
    }

    async continueShopping() {
        await this.clickElement(this.continueShoppingButton);
    }
    
    async isOnCartPage(): Promise<boolean> {
        const btn = await this.checkoutButton;
        try {
            return await btn.isDisplayed();
        } catch (e) {
            return false;
        }
    }
}

export default new CartPage();
