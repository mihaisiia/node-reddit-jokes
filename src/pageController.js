const { Browser } = require('puppeteer');
const readline = require('readline');
const Joke = require('../models/Joke.js');

const otherScraper = require("./otherScraper.js");

/**
 * @todo
 * Attach to backend routing for admins
 * 
 * @param { String } query 
 * @returns { Promise<String> }
 */
function askQuestion(query) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    return new Promise(resolve => rl.question(query, ans => {
        rl.close();
        resolve(ans);
    }))
}

/**
 * 
 * @param { Promise<Browser | undefined>} browserInstance 
 */
async function scrapeAll(browserInstance) {
    // const sub = await askQuestion("Which subreddit should be scraped? ");
    // const votes = await askQuestion("What should the minimum upvote count be? ");
    const sub = "Jokes";
    const votes = 80000;
    let browser;
    try {
        browser = await browserInstance;
        // const data = await feedScraper(browser,sub,votes);
        // await browser.close();
        const data = await otherScraper(browser, sub, votes);

        if(Joke.exists({title_id: data.at(-1).title_id}) === null){
            await Joke.insertMany(data);
        } else {
            let updates = [];
            data.forEach( item => {
                updates.push({
                    updateOne: {
                        filter: { title_id: item.title_id },
                        update: { $set: {title: item.title, body: item.body, upvotes: item.upvotes} },
                        upsert: false
                    }
                })
            });
            await Joke.collection.bulkWrite(updates);
        }
    }
    catch (err) {
        console.log("Could not resolve browser instance => : ", err)
    }
}

module.exports = (browserInstance) => scrapeAll(browserInstance)