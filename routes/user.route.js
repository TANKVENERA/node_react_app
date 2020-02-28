const express = require('express');
const router = express.Router();


const user_controller = require('../controllers/user.controller');


router.get('/:id', user_controller.user_get);
router.post('', user_controller.user_create);

module.exports = router;