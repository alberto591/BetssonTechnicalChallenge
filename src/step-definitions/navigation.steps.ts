import { When, Then } from '@wdio/cucumber-framework';
import CartPage from '../page-objects/CartPage';
import InventoryPage from '../page-objects/InventoryPage';
import LoginPage from '../page-objects/LoginPage';

Then(/^I should be on the Cart page$/, async () => {
    const isCart = await CartPage.isOnCartPage();
    expect(isCart).toBe(true);
});

When(/^I navigate back to the products page$/, async () => {
    await CartPage.continueShopping();
});

When(/^I open the side menu$/, async () => {
    await InventoryPage.openMenu();
});

When(/^I select logout$/, async () => {
    await InventoryPage.selectLogout();
});

Then(/^I should be redirected to the login page$/, async () => {
    const isLogin = await LoginPage.isLoginPage();
    expect(isLogin).toBe(true);
});
