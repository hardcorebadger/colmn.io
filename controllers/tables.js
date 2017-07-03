var db = require('../services/db');

exports.createTable = function (req, res) {
	
	// query to create an entry in tables
	var query = "INSERT INTO tables VALUES (NULL, 1,'"+req.body.name+"')";
	db.getPool().query(query, 
	function (err, result) {
		// if that fails just quit
    	if (err) { 
			res.status(500).json(err);
	    } else {
		    // uery to make the new table
			db.getPool().query(getCreationQuery(result['insertId'], req.body), 
			function (err1, result1) {
				// if that fails delete the entry in tables
		    	if (err1) { 
					query = "DELETE FROM tables WHERE id="+result['insertId'];
					db.getPool().query(getCreationQuery(result['insertId'], req.body), 
					function (err1, result1) {
						// if that fails this is bad
				    	if (err1) { 
							res.status(500).json(err);
					    }
				  	});
				  	res.status(500).json(err);
			    } else {
				    // success
					res.status(201).json(result);
				}
		  	});
		}
  	});  	
}

exports.updateTable = function (req, res) {
	var query = "UPDATE tables SET name='" + req.body.name + "' WHERE id="+req.params.tableid;
	db.getPool().query(query, 
	function (err, result) {
		if (err) { 
			res.status(500).json(err);
	    } else {
		    res.status(200).json(result);
		}
	});
}

exports.getTable = function (req, res) {
	var query = "SELECT * FROM tables WHERE id=" + req.params.tableid;
	console.log(query);
	db.getPool().query(query, 
	function (err, result) {
		if (err) { 
			console.log(err);
			res.status(500).json(err);
	    } else {
		    console.log(result);
		    res.status(200).json(result);
		}
	});
};

exports.deleteTable = function (req, res) {
	var query = "DROP TABLE `UD-"+req.params.tableid+"`";
	db.getPool().query(query, 
	function (err, result) {
		if (err) { 
			res.status(500).json(err);
	    } else {
		    var query = "DELETE FROM tables WHERE id=" + req.params.tableid;
			db.getPool().query(query, 
			function (err, result) {
				if (err) { 
					res.status(500).json(err);
			    } else {
				    res.status(200).json(result);
				}
			});
		}
	});
};


function getCreationQuery(createdID, body) {
  	var query = "CREATE TABLE `UD-"+createdID+"` (id MEDIUMINT NOT NULL AUTO_INCREMENT,";
	for (var i = 0; i < body.fieldNames.length; i++) {
		query += "`" + body.fieldNames[i] + "` " + body.fieldTypes[i]
	    query += ",";
	}
	query += "PRIMARY KEY (id))";
	return query;
}