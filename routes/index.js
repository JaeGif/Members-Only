const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Members Only' });
});

router.get('/home', homeController.home_get);
router.post('/home/new', homeController.home_new_post);
router.get('/home/membership', homeController.membership_get);

module.exports = router;
