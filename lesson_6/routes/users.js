var express = require('express');
var router = express.Router();

/* GET users listing. */
// here just /
// this is a relative path to path in app.js!
// ---------------------------------
// users - see app.js

// http://localhost:8000/users
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
// http://localhost:8000/users/detail
router.get('/detail', function(req, res, next) {
    res.send('user detail');
});
module.exports = router;
