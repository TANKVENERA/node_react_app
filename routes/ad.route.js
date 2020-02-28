const express = require('express');
const router = express.Router();


const ad_controller = require('../controllers/ad.controller');

router.post('', ad_controller.ad_create);

module.exports = router;