// external imports
const express = require('express');
const router = express.Router();
// internal imports
const { handleRefreshToken } = require('../controllers/tokenController');

router.get('/', handleRefreshToken);

module.exports = router;
