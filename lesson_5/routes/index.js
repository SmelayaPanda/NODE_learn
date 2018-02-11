var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index',
        {
            title: 'Express',
            condition: true
        }
    );
});


router.get('/news/1', function (req, res, next) {
    res.send('First news');
});

router.get('/test', function (req, res, next) {
    res.render('test',
        {
            title: 'Panda, hello! =) ',
            condition: true
        }
    );
});
module.exports = router;
