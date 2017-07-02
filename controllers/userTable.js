var db = require('../services/db');

exports.createRow = function (req, res) {
	//TODO this only supports inserting strings - doesn't figure out correct data type
	var query = "INSERT INTO "+tableName(req)+"(";
	
	var columnsSub = "";
	var valuesSub = "";
	var length = Object.keys(req.body.fields).length;

	var i = 0;
	for (var key in req.body.fields) {
		columnsSub += "`" + key + "`";
		valuesSub += "'" + req.body.fields[key] + "'";
		i++;
		if (i < length) {
	    	columnsSub += ",";
	    	valuesSub += ",";
	    }
	}
	
	query += columnsSub + ") VALUES(" + valuesSub + ")";
	
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
	
};

exports.getRow = function (req, res) {
	
};

exports.deleteRow = function (req, res) {
	
};

function tableName(req) {
	return "`UD-"+req.params.tableid+"`";
}