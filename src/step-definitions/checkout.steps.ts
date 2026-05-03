import { Given, When, Then } from '@wdio/cucumber-framework';
import InventoryPage from '../page-objects/InventoryPage';
import CartPage from '../page-objects/CartPage';
import CheckoutPage from '../page-objects/CheckoutPage';

Given(/^I add an item to the cart$/, async () => {
    // Scroll action could be added if needed, clicking the first item for now
    await InventoryPage.addItemToCart('item');
});

Given(/^I navigate to the cart$/, async () => {
    await InventoryPage.goToCart();
});

When(/^I proceed to checkout$/, async () => {
    await CartPage.proceedToCheckout();
});

When(/^I enter my shipping information: "([^"]*)", "([^"]*)", "([^"]*)"$/, async (firstName, lastName, zip) => {
    await CheckoutPage.enterInformation(firstName, lastName, zip);
});

When(/^I finish the checkout$/, async () => {
    // Perform a simple scroll to find the finish button in case it's off-screen
    // Using UIAutomator scroll
    await $(`android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().description("test-FINISH"))`);
    await CheckoutPage.finishCheckout();
});

Then(/^I should see the checkout complete message$/, async () => {
    const isComplete = await CheckoutPage.isCheckoutComplete();
    expect(isComplete).toBe(true);
});
