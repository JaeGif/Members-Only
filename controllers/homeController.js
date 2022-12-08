const Post = require('../models/post');
const User = require('../models/user');
const relativeTime = require('dayjs/plugin/relativeTime');
const dayjs = require('dayjs');
const async = require('async');
const { body, validationResult } = require('express-validator');

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
              ...{
                createdAt: createdFormatted,
                updatedAt: updatedFormatted,
                url: list_posts[i].url, // making a copy doesn't persist the url, so the url needs to be manually readded to your local copy
              },
            };
          } catch (error) {
            console.log('error', error);
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
exports.post_edit_get = (req, res, next) => {
  Post.findById(req.params.id).exec(function (err, post_details) {
    if (err) {
      return next(err);
    }

    res.render('edit-post.ejs', {
      title: post_details.title,
      message: post_details.message,
      url: post_details.url,
    });
  });

  // stuff is going here fer sure, sends back the
};

exports.post_edit_post = (req, res, next) => {
  console.log(req.body);
  console.log('looking for doc');
  try {
    Post.findOneAndUpdate(
      { _id: req.params.id },
      {
        title: req.body.title,
        message: req.body.post,
      }
    ).then(res.redirect('/home'));
  } catch (error) {
    console.log('error: ', error);
  }
};

exports.post_delete_get = (req, res, next) => {
  // display an "are you sure?" for the post.
};
exports.post_delete_post = (req, res, next) => {
  // find the post and update the doc in Mongod.
};

exports.membership_get = (req, res, next) => {
  res.render('membership-application.ejs');
};

exports.membership_update = (req, res, next) => {
  User.findOneAndUpdate({ _id: req.user._id }, { member: true }).then(
    res.redirect('/home')
  );
};
