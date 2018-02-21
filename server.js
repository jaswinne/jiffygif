// server.js
const express = require('express');
var https = require('https');
const app = express();
const path = require('path');
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
	bodyParser.urlencoded({
		// to support URL-encoded bodies
		extended: true
	})
);

// Run the app by serving the static files
// in the dist directory
app.use(express.static(__dirname + '/dist'));

// For all GET requests, send back index.html
// so that PathLocationStrategy can be used
app.get('/*', function(req, res) {
	res.sendFile(path.join(__dirname + '/dist/index.html'));
});

app.post('/gifs', (req, response) => {
	https.get(`https://api.giphy.com/v1/gifs/search${generateQueryString(req.body)}`, (res) => {
		let body = '';
		res.on('data', (d) => {
			body += d;
		});
		res.on('end', () => {
			response.send(JSON.parse(body));
		});
	});
});

var generateQueryString = (params) => {
	let queryString = '';
	Object.keys(params).forEach((key) => {
		if (params.hasOwnProperty(key)) {
			queryString += `${queryString.length > 0 ? '&' : '?'}${key}=${params[key]}`;
		}
	});
	return queryString;
};

// Start the app by listening on the default
// Heroku port
app.listen(process.env.PORT || 8080);
