const express = require('express');
const {smileView, fetchJoke} = require('../controllers/smileController');
const router = express.Router();
router.get('/', smileView);
router.get('/joke', fetchJoke)

module.exports = router;
