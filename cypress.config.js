const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
    baseUrl: 'https://letcode.in/',
    env: {
      'email': 'vivek@test.com',
      'password': 'Cypress123'
    },
    viewportHeight: 800,
    viewportWidth: 1200,
    video: false,
    trashAssetsBeforeRuns: true,
    reporter: 'cypress-mochawesome-reporter',
    reporterOptions: {
      reportDir: 'cypress/reports',
      charts: true,
      reportPageTitle: 'Cypress POC',
      embeddedScreenshots: true,
      inlineAssets: true
    }
  },
});
