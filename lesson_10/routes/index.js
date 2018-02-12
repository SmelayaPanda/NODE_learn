let express = require('express');
let router = express.Router();
const mongo = require('mongodb').MongoClient;
const objectId = require('mongodb').ObjectID; // transform id to correct type which mongo used
let assert = require('assert'); // build in package for check db connection is right and other comparisons check

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'test';

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index');
});

router.get('/get-data', function (req, res, next) {
    let resultArray = [];
    mongo.connect(url, function (err, client) {
        assert.equal(null, err);
        console.log("Connected successfully to server");
        const db = client.db(dbName);
        let cursor = db.collection('user-data').find();
        cursor.forEach(function (doc, err) {
            assert.equal(null, err);
            resultArray.push(doc);
        }, function (mongoError) { // another callback.
            // If you type it below, code will be executed immediately
            // not waiting retrieving data from database
            client.close();
            res.render('index', {items: resultArray});
        })
    });
});

router.post('/insert', function (req, res, next) {
    console.log(req.body);
    let item = {
        title: req.body.title,
        content: req.body.content,
        author: req.body.author
    };

    mongo.connect(url, function (err, client) {
        assert.equal(null, err);
        const db = client.db(dbName);
        db.collection('user-data').insertOne(item, function (err, result) {
            assert.equal(null, err);
            console.log('data will be inserted!');
            client.close();
        })
    });

    res.redirect('/');
});

router.post('/update', function (req, res, next) {
    console.log(req.body);
    let item = {
        title: req.body.title,
        content: req.body.content,
        author: req.body.author
    };

    let id = req.body.id;

    mongo.connect(url, function (err, client) {
        assert.equal(null, err);
        const db = client.db(dbName);
        db.collection('user-data')
            .updateOne({"_id": objectId(id)}, {$set: item}, function (err, result) {
                assert.equal(null, err);
                console.log('data will be updated!');
                client.close();
            })
    });

    res.redirect('/');
});

router.post('/delete', function (req, res, next) {
});


module.exports = router;