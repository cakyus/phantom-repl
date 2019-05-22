"use strict";
var server, service,
    system = require('system'),
    port = 4242
    ;

var query, queryLine, queryItem;

var i;

server = require('webserver').create();
service = server.listen(port, function (request, response) {

	// parse request

	query = JSON.parse(request.postRaw);

	console.log('Request-Data: '+JSON.stringify(query));

	// object phantom

	if (query.method == 'phantom.exit'){
		response.statusCode = 200;
		response.headers = { 'Cache': 'no-cache', 'Content-Type': 'text/plain' };
		response.write('200 OK');
		response.close();
		phantom.exit();
	}

	response.statusCode = 400;
	response.headers = { 'Cache': 'no-cache', 'Content-Type': 'text/plain' };
	response.write('400 Bad Request');
	response.close();

});

if (service) {
	console.log('Web server running on port ' + port);
} else {
	console.log('Error: Could not create web server listening on port ' + port);
	phantom.exit();
}
