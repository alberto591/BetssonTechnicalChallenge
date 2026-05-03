import { Given, When, Then } from '@wdio/cucumber-framework';
import LoginPage from '../page-objects/LoginPage';
import InventoryPage from '../page-objects/InventoryPage';

Given(/^I launch the application$/, async () => {
    // Terminate and reactivate to ensure we are back at the login screen for each scenario
    await driver.terminateApp('com.swaglabsmobileapp');
    await driver.activateApp('com.swaglabsmobileapp');
    
    // Wait for login screen to be ready
    const username = await $('~test-Username');
    await username.waitForDisplayed({ timeout: 15000 });
});

When(/^I attempt to login with username "([^"]*)" and password "([^"]*)"$/, async (username, password) => {
    await LoginPage.login(username, password);
});

Then(/^I should be redirected to the "([^"]*)" page$/, async (expectedTitle) => {
    const titleText = await InventoryPage.getHeaderTitleText();
    expect(titleText).toEqual(expectedTitle);
});

Then(/^I should see the error message "([^"]*)"$/, async (expectedError) => {
    const errorText = await LoginPage.getErrorMessageText();
    expect(errorText).toContain(expectedError);
});
