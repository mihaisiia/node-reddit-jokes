const { resolve } = require('path');
module.exports = {
    preset: "jest-puppeteer",
    globals: {
        SMALL_HTML_URL: `file:///${ resolve('./tests/sites/test.html') }`,
        LARGE_HTML_URL: `file:///${ resolve('./tests/sites/longerTest.html') }`
    },
    testMatch: [
        "**/test/**/*.test.js"
    ],
    verbose: true
}