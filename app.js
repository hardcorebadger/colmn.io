// Requires
var express = require('express');
var bodyParser = require('body-parser');
var db = require('./services/db');
var tables = require('./controllers/tables');
var userTable = require('./controllers/userTable');

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

app.get('/tables/:tableid', tables.getTable);

app.delete('/tables/:tableid', tables.deleteTable);

// Rows

app.post('/tables/:tableid', userTable.createRow);

app.put('/tables/:tableid/:rowid', userTable.updateRow);

app.get('/tables/:tableid/:rowid', userTable.getRow);

app.delete('/tables/:tableid/:rowid', userTable.deleteRow);

