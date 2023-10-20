const { Browser, Page } = require('puppeteer');
const Joke = require('../models/Joke');
const fs = require('fs');
const { Model, Document } = require('mongoose');

/**
 * 
 * @param {Browser} browser 
 * @param {string} sub 
 * @param {number} votes 
 * @returns 
 */
const webscraping = async (browser, sub, votes) => {
    // const browser = await puppeteer.launch({
    //     headless: false,
    //     args: ["--disable-setuid-sandbox"],
    //     "ignoreHTTPSErrors": true});
    const pageURL = `${process.env.REDDIT_ROOT_URL + sub + process.env.REDDIT_POSTS_TOP_ALL_TIME}`
    const _browser = browser;
    const page = await _browser.newPage();
    await page.goto(pageURL);

    function getPageItems() {
        const visiblePosts = document.querySelectorAll('shreddit-post');
        let list = [];
        visiblePosts.forEach(post => {
            //const post = item.querySelector('shreddit-post');
            let id = post.id;
            let title = post.children.item(2).innerText;
            let body = post.children.item(3).innerText;
            let upvotes = parseInt(post.getAttribute('score'));
            const joke = new Joke({
                title_id: id,
                subreddit: sub,
                title: title,
                body: body,
                upvotes: upvotes
            });
            console.log(joke);
            list.push(joke);
        });
        currVotes = list.at(0).upvotes;
        console.log(list.at(-1).upvotes);
        return list;
    }

    // function scrollToEnd({
    //     page,
    //     distancePx,
    //     speedMs,
    //     scrollTimeoutMs,
    //     eltToScroll
    // }) {
    //     return page.evaluate(
    //         (distancePx, speedMs, scrollTimeoutMs, eltToScroll) => {
    //             return new Promise((resolve) => {
    //                 const elt = document.querySelector(eltToScroll);
    //                 let totalHeight = 0;
    //                 const timer = setInterval(() => {
    //                 const scrollHeight = elt.scrollHeight;
    //                 window.scrollBy(0, distancePx);
    //                     totalHeight += distancePx;

    //                     if(totalHeight >= scrollHeight) {
    //                         clearInterval(timer);
    //                         const mostRecentVotes = document.querySelector('shreddit-post:last-of-type');
    //                         const bottomPostVotes = parseInt(mostRecentVotes.getAttribute('score'));
    //                         return bottomPostVotes;
    //                         // resolve();
    //                     }
    //                 }, speedMs);
                    
    //                 setTimeout(() => {
    //                     clearInterval(timer);
    //                     resolve();
    //                 }, scrollTimeoutMs);
    //             });
    //         }, 
    //         distancePx,
    //         speedMs,
    //         scrollTimeoutMs,
    //         eltToScroll
    //     );
    // }

    // async function scrapePage() {
    //     let postList = [];
    //     try {
    //         let prevHeight;
    //         do {
    //             postList = await page.evaluate(getPageItems);
    //             prevHeight = await page.evaluate('document.body.scrollHeight');
    //             await page.evaluate('window.scrollTo(0, document.body.scrollHeight)');
    //             await page.waitForFunction(`document.body.scrollHeight > ${prevHeight}`);
    //             await page.waitForTimeout(7000);
    //             console.log(postList.at(-1).upvotes);
    //             currVotes = postList.at(-1).upvotes;
    //             console.log(currVotes)
    //         } while (currVotes >= _votes);
    //     } catch (err) {
    //         console.log(err);
    //     }
    //     return postList;
    // }
    async function scrollToEnd(_page, votes){
        try {
            let prevHeight;
            let bottomPostVotes;
            do {
                prevHeight = await _page.evaluate('document.body.scrollHeight');
                await _page.evaluate('window.scrollTo(0, document.body.scrollHeight)');
                await _page.waitForFunction(`document.body.scrollHeight > ${prevHeight}`);
                await _page.waitForTimeout(2000);
                bottomPostVotes = await _page.evaluate(() => {
                    let lPost = document.querySelectorAll('shreddit-post');
                    return parseInt(lPost.item(lPost.length - 1).getAttribute('score'));
                });
                console.log(bottomPostVotes);
            } while (bottomPostVotes > votes)
        } catch (err) {console.error(err)};
    }

    /**
     * 
     * @param { Page } _page 
     * @returns 
     */
    async function scrapePage(_page) {
        let rlist;
        try {

            await scrollToEnd(_page, votes);

            await _page.waitForNetworkIdle();

            const file = await _page.evaluate((sub, votes) => {

                const visiblePosts = document.querySelectorAll("shreddit-post");
                let list = [];

                for(let post of visiblePosts){

                    let p_votes = parseInt(post.getAttribute('score'));
    
                    if(p_votes < votes){
                        break;
                    }
    
                    let p_id = post.id;
    
                    let title = post.querySelector(`#post-title-${p_id}`).textContent;
                    title = title.split("\n").filter(function(value){
                        return value.trim().length > 0;
                    }).join("\n");
                    title = title.trim();
    
                    let body = post.querySelector('.mb-xs').textContent;
                    body = body.split("\n").filter(function(value){
                        return value.trim().length > 0;
                    }).join("\n");
                    body = body.trim();

                    const item = {
                        title_id: p_id,
                        subreddit: sub,
                        title: title,
                        body: body,
                        upvotes: p_votes
                    };

                    list.push(item);
                };

                return list;
            }, sub, votes);

            return file;

        } catch (err) {console.log(err);}

        return rlist;
    }

    const res = await scrapePage(page);
    browser.close();
    return res;
}

module.exports = (browser, sub, votes) => webscraping(browser, sub, votes)