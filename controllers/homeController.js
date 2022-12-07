const Post = require('../models/post');
const User = require('../models/user');
const relativeTime = require('dayjs/plugin/relativeTime');
const dayjs = require('dayjs');
const { Dayjs } = require('dayjs');
const async = require('async');

dayjs.extend(relativeTime);
exports.index_get = (req, res, next) => {
  res.redirect('/home');
};

exports.home_get = (req, res, next) => {
  async.series(
    Post.find({})
      .populate('user')
      .exec(function (err, list_posts) {
        if (err) {
          return next(err);
        }
        // Convert DateTime.

        for (let i = 0; i < list_posts.length; i++) {
          try {
            let createdFormatted = dayjs().to(dayjs(list_posts[i].createdAt));
            let updatedFormatted = dayjs().to(dayjs(list_posts[i].updatedAt));
            list_posts[i] = {
              ...list_posts[i]._doc,
              ...{ createdAt: createdFormatted, updatedAt: updatedFormatted },
            };
          } catch (error) {
            console.log(error);
          }
        }

        res.render('index', {
          posts: list_posts,
        });
      })
  );
};

exports.home_new_post = (req, res, next) => {
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
