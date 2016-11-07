/*var http = require('http');

function handleRequest(request, response) {
	console.log("==method: ", request.method);
	console.log("==headers: " request.headers)
}

var server = http.createServer(handleRequest);

server.listen(8000);

console.log("==Server listening on port 8000"); */

/*
 * Here, you should write a simple server to serve files statically.
 */
var http = require('http');
var fs = require('fs');
var path = require('path');

function handleRequest(request, response) {
	console.log("requesting shit");
	
	var filePath = '.' + request.url;
	if (filePath == './')
		filePath = './index.html';
	var extname = path.extname(filePath);
	var contentType = 'text/html';
	switch (extname) {
		case '.js':
			contentType = 'text/javascript';
			break;
		case '.css':
			contentType = 'text/css';
			break;
		case '.json':
			contentType = 'application/json';
			break;
	}
	
	fs.readFile(filePath, function(error, content) {
		if (error) {
			if (error.code == 'ENOENT'){
				fs.readFile(notFoundFilename, function(error, content) {
					response.writeHead(200, { 'Content-Type': contentType });
					response.end(content, 'utf-8');
				});
			}
			else {
				response.writeHead(500);
				response.end('Sorry, site bork: '+error.code+'..\n');
				response.end();
			}
		}
		else {
			response.writeHead(200, { 'Content-Type': contentType });
			response.end(content, 'utf-8');
		}
	});
}
http.createServer(handleRequest);

var staticDir = path.join(__dirname, 'public');
var indexFilename = 'index.html';
var notFoundFilename = '404.html';
var port = process.env.PORT || 3000;