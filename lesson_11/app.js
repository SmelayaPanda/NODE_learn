var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var hbs = require('express-handlebars');
var expressValidator = require('express-validator');
var expressSession = require('express-session');

var index = require('./routes/index');
// var users = require('./routes/users');

var app = express();

// view engine setup
app.engine('hbs', hbs(
    {
        extname: 'hbs',
        defaultLayout: 'layout',
        layoutsDir: __dirname + '/views/layouts/'
    })
);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
// very important use validation after bodyParser
// because validator use bodyParser
// and called as function right now
app.use(expressValidator());
app.use(cookieParser());
// directory for static files, may be more than one
// app.use(express.static(path.join(__dirname, 'files')));
// you can access to any file in directory by using
// for example http://localhost:8000/images/img1.jpg
// __dirname in URI not needed
app.use(express.static(path.join(__dirname, 'public')));
// setup memory storage (not recommended for production)
app.use(expressSession({secret: 'panda', saveUninitialized: false, resave: false}));

app.use('/', index);
// app.use('/users', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    // if method don't finished as response
    // You must use next method to avoid infinitive loading
    // and transfer management of the app request
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
