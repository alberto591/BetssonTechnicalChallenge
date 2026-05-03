import { join } from 'path';

export const config: WebdriverIO.Config = {
    // Runner Configuration
    runner: 'local',
    port: 4723,

    // Specify Test Files
    specs: [
        '../src/features/**/*.feature'
    ],
    exclude: [],

    // Capabilities
    maxInstances: 1,
    capabilities: [{
        platformName: 'Android',
        'appium:deviceName': 'Android Emulator',
        'appium:automationName': 'UiAutomator2',
        'appium:app': join(process.cwd(), './app/Android.SauceLabs.Mobile.Sample.app.2.7.1.apk'),
        'appium:appPackage': 'com.swaglabsmobileapp',
        'appium:appActivity': '.MainActivity',
        'appium:appWaitActivity': 'com.swaglabsmobileapp.*',
        'appium:autoGrantPermissions': true,
        'appium:newCommandTimeout': 240,
        'appium:systemPort': 8200,
        'appium:disableWindowAnimation': true,
    }],

    // Log Level
    logLevel: 'error',
    bail: 0,
    baseUrl: 'http://localhost',
    waitforTimeout: 15000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,

    // Services
    services: [
        ['appium', {
            args: {
                relaxedSecurity: true,
                logLevel: 'error'
            },
            waitStartTime: 60000
        }]
    ],

    // Framework
    framework: 'cucumber',
    reporters: [
        'spec',
        ['allure', {
            outputDir: 'allure-results',
            disableWebdriverStepsReporting: true,
            disableWebdriverScreenshotsReporting: false,
        }]
    ],

    // Cucumber configuration
    cucumberOpts: {
        require: ['./src/step-definitions/**/*.ts'],
        backtrace: false,
        requireModule: [],
        dryRun: false,
        failFast: false,
        format: ['pretty'],
        snippets: true,
        source: true,
        profile: [],
        strict: false,
        tagExpression: '',
        timeout: 60000,
        ignoreUndefinedDefinitions: false
    },

    // Hooks
    afterStep: async function (step, scenario, result, context) {
        // Take a screenshot if a test fails
        if (!result.passed) {
            await browser.takeScreenshot();
        }
    }
};
