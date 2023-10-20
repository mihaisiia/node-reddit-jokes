const mongoose = require('mongoose');
const JokeSchema = new mongoose.Schema({
    title_id: { type: String, index: {unique: true}},
    subreddit: String,
    title: String,
    body: String,
    upvotes: Number,
});
JokeSchema.methods.getJoke = function getJoke() {
    const joke = this.title + "\n" + this.body;
    console.log(joke);
    return joke;
};
JokeSchema.methods.getSubreddit = function getSubreddit() {
    return this.subreddit;
};
JokeSchema.methods.getVotes = function getVotes() {
    return this.upvotes;
};
const Joke = mongoose.model("Joke", JokeSchema); 

module.exports = Joke;
