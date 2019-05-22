"use strict";
var server, service,
    system = require('system'),
    port = 4242
    ;

var query, queryLine, queryItem;

var i;

server = require('webserver').create();
service = server.listen(port, function (request, response) {

	console.log('Request: ' + request.url);

	// parse request

	if (request.url.substr(1,1) != '?'){
		console.log('Response: 400 Bad Request');
		response.statusCode = 400;
		response.headers = { 'Cache': 'no-cache', 'Content-Type': 'text/plain'};
		response.write('400 Bad Request');
		response.close();
		return false;
	}

	// parse query

	query = {};
	queryLine = request.url.substr(2).split('&');
	for (i = 0; i < queryLine.length ; i++){
		queryItem = queryLine[i].split('=', 2);
		if (queryItem[0] == 'version'){
			query.version = queryItem[1];
		}
		if (queryItem[0] == 'method'){
			query.method = queryItem[1];
		}
		if (queryItem[0] == 'params'){
			query.params = queryItem[1];
		}
		if (queryItem[0] == 'id'){
			query.id = queryItem[1];
		}
	}

	console.log('Request-Method: '+query.method);

	query.methods = query.method.split('.', 2);

	// object phantom

	if (query.methods[0] == 'phantom'){

		if (query.methods[1] == 'exit'){
			response.statusCode = 200;
			response.headers = { 'Cache': 'no-cache', 'Content-Type': 'text/plain' };
			response.write('200 OK');
			response.close();
			phantom.exit();
		}
	}

	response.statusCode = 200;
	response.headers = { 'Cache': 'no-cache', 'Content-Type': 'text/plain' };
	response.write('200 OK');
	response.close();

});

if (service) {
	console.log('Web server running on port ' + port);
} else {
	console.log('Error: Could not create web server listening on port ' + port);
	phantom.exit();
}
