var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/sign-up', function (req, res, next) {
  res.render('./partials/sign-up');
});

module.exports = router;
