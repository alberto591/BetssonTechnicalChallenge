# Swag Labs Android Test Automation

> [!NOTE]
> **Senior QA Note:** For the purpose of this technical assessment, I have included the application APK in the `app/` directory and removed it from `.gitignore`. This ensures a "zero-setup" experience for the reviewer. In a production environment, binaries would be managed via artifact repositories (e.g., Nexus, Artifactory) or fetched dynamically during the CI/CD build process.

This project is a comprehensive test automation framework built to validate the core features of the [Swag Labs Android application](https://github.com/saucelabs/sample-app-mobile). It uses **WebdriverIO (v8+)**, **Appium**, **TypeScript**, and **Cucumber** (BDD).

## Key Features
- **Page Object Model (POM)**: Enhances code reusability and maintainability.
- **BDD with Cucumber**: Business-readable tests (`Given`, `When`, `Then`).
- **Allure Reporting**: Rich HTML reports with screenshots for failed steps.
- **Deterministic Selectors**: Avoids brittle XPaths, relying on Accessibility IDs and exact text.
- **Idling & Synchronization Strategies**: Employs WebdriverIO's `waitForDisplayed` and explicit Appium wait configurations to reduce flakiness.

---

## 🛠 Prerequisites & Environment Setup

Ensure you have the following installed before running the project:

1. **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
2. **Java Development Kit (JDK)** (v11 or higher) - Required for Appium Android testing.
   - Ensure `JAVA_HOME` is set in your environment variables.
3. **Android Studio** - Required to set up the Android Emulator and SDK tools.
   - Set the `ANDROID_HOME` environment variable to point to your Android SDK path.
   - Include `platform-tools` and `emulator` in your system `PATH`.
4. **Appium** (v2.x) - Installed locally via `package.json`. No global install is required!

---

## 📱 Device & Emulator Matrix

The project is currently configured to run on a local Android Emulator.

| Platform | Device Name         | OS Version     | Appium Driver  |
| -------- | ------------------- | -------------- | -------------- |
| Android  | Android Emulator    | 11.0+ (API 30+)| `UiAutomator2` |

*Note: You can override the device name in `config/wdio.android.conf.ts` if your emulator is named differently.*

---

## 🚀 Installation & Setup

1. **Clone the repository** and navigate to the project directory:
   ```bash
   cd swag-labs-automation
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Appium Driver Setup**:
   Since Appium 2.x requires manual driver installation, run:
   ```bash
   npx appium driver install uiautomator2
   ```

---

## 🧪 Running the Tests

Make sure you have an **Android Emulator currently running** before executing the tests.

1. **Run all tests**:
   ```bash
   npm test
   ```
   *(This shorthand command executes `wdio run config/wdio.android.conf.ts`. It starts the local Appium server automatically, installs the APK, and runs the Cucumber scenarios.)*

2. **Generate and Open Allure Report**:
   ```bash
   npm run report
   ```

---

## 📂 Test Scenarios Covered

### 1. Login Functionality
- **Positive**: Standard user login.
- **Negative**: Login with locked-out user (verifies error message).
- **Negative**: Login with invalid credentials (verifies error message).
- **Negative**: Login with empty fields (verifies error message).

### 2. E2E Checkout Flow
- **Feature**: Add multiple items to the cart.
- **Feature**: Validate cart contents.
- **Feature**: Complete the checkout information form.
- **Feature**: Review and finalize the purchase.
- **Verification**: Confirms the order completion screen and success message.

### 3. Navigation
- **Feature**: Seamless navigation between Product, Cart, and Checkout pages.
- **Persistence**: Ensures cart state is maintained during navigation.

---

## ⚠️ Known Limitations & Handling Flaky Tests

1. **Appium Initialization Delays**: Sometimes the first run might fail because Appium is installing the UIAutomator2 server on the emulator. Simply rerun the command if this happens.
2. **Scrolling to Elements**: Mobile UI tests often require scrolling to find elements. This framework uses native Android UIAutomator scroll commands (`new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(...)`) which are highly deterministic, but can be slightly flaky if the screen size is unusually small.
3. **Synchronization**: Emulators can sometimes hang or delay rendering. We've mitigated this by adding `waitForDisplayed` explicitly in the `BasePage` and setting `disableWindowAnimation: true` in the Appium capabilities.
