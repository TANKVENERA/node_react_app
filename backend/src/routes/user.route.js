const express = require('express');
const router = express.Router();


const user_controller = require('../controllers/user.controller');


router.get('/:id', user_controller.user_get);
router.get('', user_controller.start);
router.post('', user_controller.user_create);
router.post('/login', user_controller.user_login);

module.exports = router;