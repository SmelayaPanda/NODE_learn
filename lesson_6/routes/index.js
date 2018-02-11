var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'Cool, huh!',
        condition: false,
        anyArray: [1, 2, 3]
    });
});

router.get('/test/:id', function (req, res, next) {
    res.render('test', {
        outputId: req.params.id
    });
});

router.post('/test/submit', function (req, res, next) {
    // in POST request all parameters concatenated
    // and you will access to it by using .body
    var id = req.body.id;
    res.redirect('/test/' + id);
});
module.exports = router;