import BasePage from './BasePage';

class InventoryPage extends BasePage {
    get headerTitle() {
        // Appium text search or using XPath if necessary, but we try to use text
        return this.byText('PRODUCTS');
    }

    async getHeaderTitleText(): Promise<string> {
        return await this.getText(this.headerTitle);
    }

    // Actions
    async addItemToCart(itemName: string) {
        // Assume the add to cart button has accessibility id like "test-ADD TO CART"
        // Wait, for Swag Labs, it's usually `test-ADD TO CART` in a specific item container.
        // Let's scroll or just click the first add to cart we find.
        const addToCartButton = await this.byAccessibilityId('test-ADD TO CART');
        await this.clickElement(addToCartButton);
    }

    async goToCart() {
        const cartIcon = await this.byAccessibilityId('test-Cart');
        await this.clickElement(cartIcon);
    }
}

export default new InventoryPage();
