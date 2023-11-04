describe.skip('foo', () => {});
it.skip('foo', () => {});
test.skip('foo', () => {});
// const puppeteer = require('puppeteer');
// const {resolve} = require('path');
// const dotenv = require('dotenv');

// /**
//  * @typedef {Object} Joke
//  * @property {string} title_id - post_id assigned by reddit
//  * @property {string} subreddit - name of scraped subreddit
//  * @property {string} title - post title
//  * @property {string} body - post content
//  * @property {number} upvotes - # of upvotes at time of crawling
// */

// /**
//  * @typedef {Object} PostArray
//  * @property {Array<Joke>} feed
// */


// /**
//  * 
//  * @param {puppeteer.Browser} _browser 
//  * @param {String} _url 
//  * @param {String} _sub 
//  * @param {Number} _votes 
//  * @returns {Promise<PostArray>}
//  */
// const testScraping = async (_browser,_url,_sub,_votes) => {
//     const browser = _browser;
//     const url = _url;
    
//     const page = await browser.newPage();
//     await page.goto(url);
//     let res = {};
//     try {
//         const sub = _sub;
//         const votes = _votes;
//         const low = await page.evaluate(() => {
//             const lastPost = document.querySelectorAll("shreddit-post");
//             return parseInt(lastPost.item(lastPost.length - 1).getAttribute('score'));
//         })
//         const feed = await page.evaluate((sub,votes) => {
//             const visiblePosts = document.querySelectorAll("shreddit-post");
//             let list = [];
//             for(let post of visiblePosts){
//                 let p_votes = parseInt(post.getAttribute('score'));

//                 if(p_votes < votes){break};

//                 let p_id = post.id;

//                 let title = post.querySelector(`#post-title-${p_id}`).textContent;
//                 title = title.split("\n").filter(function(value){
//                     return value.trim().length > 0;
//                 }).join("\n");

//                 let body = post.querySelector('.mb-xs').textContent;
//                 body = body.split("\n").filter(function(value){
//                     return value.trim().length > 0;
//                 }).join("\n");
//                 const joke = {
//                     title_id: p_id,
//                     subreddit: sub,
//                     title: title,
//                     body: body,
//                     upvotes: p_votes
//                 }
//                 list.push(joke);
//             };
//             return list;
//         }, sub, votes);
//         console.log(low);
//         res = {
//             feed
//         };

//     } catch (e) {
//         console.log(e);
//     }
//     return res;
// }

// module.exports = (_browser, _url, _sub, _votes) => testScraping(_browser, _url, _sub, _votes);