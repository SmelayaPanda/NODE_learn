let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test');

let Schema = mongoose.Schema;

// creating layout for schema
let userDataScheme = new Schema({
    title: {type: String, required: true},
    content: String,
    author: String
}, {collection: 'user-data'});

// creating model to instantiate object with database working
let UserData = mongoose.model('UserData', userDataScheme);

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index');
});

router.get('/get-data', function (req, res, next) {
    UserData
        .find()
        .then(function (docs) {
            res.render('index', {items: docs})
        })
});

router.post('/insert', function (req, res, next) {
    let item = {
        title: req.body.title,
        content: req.body.content,
        author: req.body.author
    };
    let data = new UserData(item);
    data.save();
    res.redirect('/');
});

router.post('/update', function (req, res, next) {
    let id = req.body.id;
    UserData.findById(id, function (err, doc) {
        if (err) {
            console.log('error, no entry found');
        }
        doc.title = req.body.title;
        doc.content = req.body.content;
        doc.author = req.body.author;
        doc.save();
    });
    res.redirect('/');
});

router.post('/delete', function (req, res, next) {
    let id = req.body.id;
    UserData.findByIdAndRemove(id).exec();
    res.redirect('/');
});


module.exports = router;