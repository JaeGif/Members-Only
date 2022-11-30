var express = require('express');
const userController = require('../controllers/userController');
var router = express.Router();

/* GET users listing. */
router.post('/log-in', userController.user_log_in);
router.get('/log-out', userController.log_out);

router.get('/sign-up', userController.sign_up_form_get);
router.post('/sign-up', userController.user_sign_up);

module.exports = router;
