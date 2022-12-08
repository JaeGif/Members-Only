const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
/* GET home page. */
router.get('/', homeController.index_get);
router.get('/home', homeController.home_get);
router.post('/home/new', homeController.home_new_post);
router.get('/home/membership', homeController.membership_get);
router.post('/home/membership/update', homeController.membership_update);
router.get('/home/posts/:id/edit', homeController.post_edit_get);
router.post('/home/posts/:id/edit/submit', homeController.post_edit_post);
router.post('/home/posts/:id/delete/submit', homeController.post_delete_post);

module.exports = router;
