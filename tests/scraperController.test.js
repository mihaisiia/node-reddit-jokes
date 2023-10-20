const puppeteer = require('puppeteer');
const {resolve} = require('path');
const dotenv = require('dotenv');
const testScraper = require('./feedScraper.test.js');
const fs = require('fs');
const sub = "Jokes";
const votes = 500;

dotenv.config();
// const absFilePath = resolve('./tests/test.html');
const testURLS = [
    `file:///${ resolve('./tests/sites/test.html') }`,
    `file:///${ resolve('./tests/sites/longerTest.html') }`,
    `file:///${ resolve('./tests/sites/jokesWeekly.html') }`
    //process.env.REDDIT_TEST_URL
];
main().catch(err => console.log(err));
main().then(console.log("Test Successful"));
async function main(){
    const urlList = testType(true,false);
    
    let tList = [];

    const browser = await puppeteer.launch({
        headless: false,
        args: ["--disable-setuid-sandbox"],
        "ignoreHTTPSErrors": true
    });

    // const urlList = testType(true,false);
    console.log(urlList);

    for(let url of testURLS){
        let testResult = await testScraper(browser, url, sub, votes);
        tList.push(testResult);
        // console.log(testResult);
    }



    // console.log(first)
    for(let i = 0; i < tList.length; i++){
        if(tList.at(i).feed.length > 0){
            let writeVal = tList.at(i).feed.map(JSON.stringify).reduce((prev,next) => `${prev}\n${next}`);

            fs.writeFile(`./tests/results/res${i}.txt`, writeVal, 'utf8', (err) => err && console.error(err));
        }
    };

    await browser.close()

}

/**
 * 
 * @param {Boolean} offline 
 * @param {Boolean} online 
 * @returns {Array<String>}
 */
function testType(offline, online) {
    let tList;
    if(offline && online){
        tList = testURLS;
    } else if(offline) {
        tList = testURLS.slice(0,3);
    } else {
        tList = testURLS.slice(3,4);
    }
    return tList;
}