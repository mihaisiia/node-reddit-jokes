const express = require('express');
const SmileContoller = require('../controllers/smileController');
const router = express.Router();
router.get('/', SmileContoller.smileView);
router.get('/joke', SmileContoller.getRandomJoke)

module.exports = router;
