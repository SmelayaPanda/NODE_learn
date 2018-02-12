var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'Form validation',
        success: req.session.success,
        errors: req.session.errors
    });
    req.session.errors = null;
    req.session.success = null;
});

router.post('/userSignIn', function (req, res, next) {
    // check validity
    // first param - name of form
    req.check('email', 'Invalid email address').isEmail();
    req.check('password', 'Invalid password').isLength({min: 4});
    req.check('confirmPassword', 'Password do not match').equals(req.body.password);

    var errors = req.validationErrors();
    if (errors) {
        req.session.errors = errors;
        req.session.success = false;
    } else {
        req.session.success = true;
    }
    res.redirect('/');
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