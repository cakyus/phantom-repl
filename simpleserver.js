"use strict";
var server, service,
    system = require('system'),
    port = 4242
    ;

server = require('webserver').create();
service = server.listen(port, function (request, response) {

	// parse request

	var query = JSON.parse(request.postRaw);

	console.log('Request-Data: '+JSON.stringify(query));

	/**
	 * @method phantom.exit
	 **/

	if (query.method == 'phantom.exit'){
		response.statusCode = 200;
		response.headers = { 'Cache': 'no-cache', 'Content-Type': 'text/plain' };
		response.write('200 OK');
		response.close();
		phantom.exit();
	}

	/**
	 * @method page.content
	 * @param $url
	 * @param $settings http://phantomjs.org/api/webpage/property/settings.html
	 **/

	if (query.method == 'page.content'){
		var webpage = require('webpage');
		var page = webpage.create();
		page.open(query.params.url, query.params.settings, function(status){
			if (status == 'success'){
				response.statusCode = 200;
				response.headers = { 'Cache': 'no-cache', 'Content-Type': 'text/plain' };
				response.write(page.content);
				response.close();
				return true;
			}
			response.statusCode = 500;
			response.headers = { 'Cache': 'no-cache', 'Content-Type': 'text/plain' };
			response.write(page.content);
			response.close();
			return true;
		});
		return true;
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
