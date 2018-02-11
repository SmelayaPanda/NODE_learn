var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/news/1', function(req, res, next) {
  res.send('First news');
});

module.exports = router;
