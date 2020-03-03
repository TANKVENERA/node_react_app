const express = require('express');
const router = express.Router();
const ad_controller = require('../controllers/ad.controller');

router.post('', ad_controller.ad_create);
// router.delete('/:id', ad_controller.ad_delete);

module.exports = router;