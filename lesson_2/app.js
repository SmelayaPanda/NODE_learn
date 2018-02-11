var http = require('http');
var module1 = require('./module_1');
var module2 = require('./module_2');

function onRequest(request, response) {
    response.writeHead(200, {'Content-type': 'text/plain'});
    response.write(module1.myString);
    response.write(module2.myVar);
    module1.myFunction();
    module2.myFunc();
    response.end();
}

http.createServer(onRequest).listen(8000);
