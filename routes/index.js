const express = require('express');
const router = express.Router();
const Post = require('../models/post');
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Members Only' });
});

router.get('/home', (req, res, next) => {
  Post.find({})
    .populate('user')
    .exec(function (err, list_posts) {
      if (err) {
        return next(err);
      }
      res.render('index', {
        posts: list_posts,
        baseView: true,
      });
    });
});
router.post('/home/new', (req, res, next) => {
  console.log(req.body);
  const post = new Post({
    title: req.body.title,
    message: req.body.post,
    user: req.user,
  }).save((err) => {
    if (err) return next(err);
    res.redirect('/home');
  });
});

module.exports = router;
