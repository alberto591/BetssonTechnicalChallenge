import { When, Then } from '@wdio/cucumber-framework';
import CartPage from '../page-objects/CartPage';

Then(/^I should be on the Cart page$/, async () => {
    const isCart = await CartPage.isOnCartPage();
    expect(isCart).toBe(true);
});

When(/^I navigate back to the products page$/, async () => {
    await CartPage.continueShopping();
});
