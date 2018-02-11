var http = require('http');
var fs = require('fs');

function onRequest(request, response) {
    response.writeHead(200, {'Content-type': 'text/html'});
    fs.readFile('./index.html', null, function (error, data) {
        if (error) {
            response.writeHead(404);
            response.write('File not found');
        } else {
            response.write(data);
        }
        response.end();
    });
    // Here may be an error because read of file in callback function
    // must be executed longer then outer response.end()
    // response.end();
}

http.createServer(onRequest).listen(8000);
