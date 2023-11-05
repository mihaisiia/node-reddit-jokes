const JokeService = require('../services/jokes');

const smileView = (req, res) => {
    res.render("smile");
}

const getRandomJoke = async (req, res, next) => {
    try {
        let page = req.params.page ? req.params.page : 0;
        let limit = req.params.limit ? req.params.limit : 0;
        let joke = await JokeService.getRandomJoke();
        return res.status(200).json({ status: 200, data: joke, message: "Successfully sent random joke" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

module.exports = {
    smileView,
    getRandomJoke
};
