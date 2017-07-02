// Requires
var express = require('express');
var bodyParser = require('body-parser');
var db = require('./services/db');
var tables = require('./controllers/tables');

// Globals
var app = express();    
var port = 3000;
var TEMP_userID =1;

// Initializers
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Startup
db.connect(db.MODE_TEST, function(err) {
	if (err) {
		console.log('Failed to connect to MySQL, shutting down.');
		process.exit(1);
	} else {
		console.log('connected to MySQL, listening on port ' + port);
		db.drop(['tables']);
		app.listen(port);
	}
});

// Routes

// Users

app.post('/users',function(req, res){
	// Create a new user (signup)
});

app.put('/users/:userid', function(req, res){
	// Update a user's info
});

app.get('/users/:userid', function(req, res){
	// Get a user's info
});

app.delete('/users/:userid', function(req, res){
	// Delete a user
});


// Tables

app.post('/tables', tables.createTable);

app.put('/tables/:tableid', tables.updateTable);

app.get('/tables/:tableid', function(req, res){
	// Get a table's info
});

app.delete('/tables/:tableid', function(req, res){
	// Delete a table
});

// Rows

app.post('/tables/:tableid', function(req, res){
	// Add a new row
});

app.put('/tables/:tableid/:rowid', function(req, res){
	// Update a row
});

app.get('/tables/:tableid/:rowid', function(req, res){
	// Get range of rows starting at the index, default range is 1
});

app.delete('/tables/:tableid/:rowid', function(req, res){
	// Delete a row
});

