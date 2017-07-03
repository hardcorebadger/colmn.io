var db = require('../services/db');

exports.createRow = function (req, res) {
	//TODO this only supports inserting strings - doesn't figure out correct data type
	var query = "INSERT INTO "+tableName(req)+"(";
	
	var fieldsSub = "";
	var valuesSub = "";
	var length = Object.keys(req.body.fields).length;

	var i = 0;
	for (var key in req.body.fields) {
		fieldsSub += "`" + key + "`";
		valuesSub += "'" + req.body.fields[key] + "'";
		i++;
		if (i < length) {
	    	fieldsSub += ",";
	    	valuesSub += ",";
	    }
	}
	
	query += fieldsSub + ") VALUES(" + valuesSub + ")";
	
	db.getPool().query(query, 
	function (err, result) {
		if (err) { 
			res.status(500).json(err);
	    } else {
		    res.status(200).json(result);
		}
	});
};

exports.updateRow = function (req, res) {
	var query = "UPDATE "+tableName(req)+" SET ";
	
	var length = Object.keys(req.body.fields).length;

	var i = 0;
	for (var key in req.body.fields) {
		query += "`" + key + "`=";
		query += "'" + req.body.fields[key] + "'";
		i++;
		if (i < length)
	    	query += ",";
	}
	
	query += " WHERE id=" + req.params.rowid + "";
	
	db.getPool().query(query, 
	function (err, result) {
		if (err) { 
			res.status(500).json(err);
	    } else {
		    res.status(200).json(result);
		}
	});
};

exports.getRow = function (req, res) {
	var query = "SELECT * FROM "+tableName(req)+" WHERE id=" + req.params.rowid;
	db.getPool().query(query, 
	function (err, result) {
		if (err) { 
			res.status(500).json(err);
	    } else {
		    res.status(200).json(result);
		}
	});
};

exports.deleteRow = function (req, res) {
	
};

function tableName(req) {
	return "`UD-"+req.params.tableid+"`";
}