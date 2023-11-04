const jokeColl = require('../models/Joke')

const smileView = (req, res) => {
    res.render("smile");
}

const fetchJoke = async (req, res) => {
    let joke = await jokeColl.aggregate([{ $sample: { size: 1 } }]);
    res.status(200).json(joke[0]);
}

module.exports = {
    smileView,
    fetchJoke
};
