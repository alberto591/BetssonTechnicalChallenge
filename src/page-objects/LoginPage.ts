import BasePage from './BasePage';

class LoginPage extends BasePage {
    // Locators
    get usernameInput() {
        return this.byAccessibilityId('test-Username');
    }

    get passwordInput() {
        return this.byAccessibilityId('test-Password');
    }

    get loginButton() {
        return this.byAccessibilityId('test-LOGIN');
    }

    get errorMessage() {
        return this.byAccessibilityId('test-Error message');
    }

    // Actions
    async login(username: string, password?: string) {
        await this.setValue(this.usernameInput, username);
        if (password !== undefined) {
            await this.setValue(this.passwordInput, password);
        }
        await this.clickElement(this.loginButton);
    }

    async getErrorMessageText(): Promise<string> {
        const container = await this.errorMessage;
        await container.waitForDisplayed({ timeout: 15000 });
        
        // Try to find the TextView inside the container which actually holds the text
        const textView = await container.$('android.widget.TextView');
        if (await textView.isExisting()) {
            return await textView.getText();
        }
        
        return await container.getText();
    }
}

export default new LoginPage();
