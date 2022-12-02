const Post = require('../models/post');
const User = require('../models/user');

exports.home_get = (req, res, next) => {
  Post.find({})
    .populate('user')
    .exec(function (err, list_posts) {
      if (err) {
        return next(err);
      }
      res.render('index', {
        posts: list_posts,
      });
    });
};

exports.home_new_post = (req, res, next) => {
  console.log(req.body);
  const post = new Post({
    title: req.body.title,
    message: req.body.post,
    user: req.user,
  }).save((err) => {
    if (err) return next(err);
    res.redirect('/home');
  });
};

exports.membership_get = (req, res, next) => {
  res.render('membership-application.ejs');
};

exports.membership_update = (req, res, next) => {
  User.findOneAndUpdate({ _id: req.user._id }, { member: true }).then(
    res.redirect('/home')
  );
};
