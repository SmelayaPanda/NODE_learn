function myFunction() {
    console.log('myFunction was called');
}

var myString = 'My string called';

// first export way
module.exports.myFunction = myFunction;
module.exports.myString = myString;
