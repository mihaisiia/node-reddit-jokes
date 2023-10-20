const express = require('express');
const {smileView} = require('../controllers/smileController');
const router = express.Router();
router.get('/', smileView);

module.exports = router;
