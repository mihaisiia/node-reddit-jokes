const Jokes = require('../models/Joke');

exports.getRandomJoke = async function (page, limit) {
    try {
        let joke = await Jokes.aggregate([{ $sample: { size: 1 } }]);
        return joke[0];
    } catch (e) {
        throw Error('Error fetching random joke ')
    }
}