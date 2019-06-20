var connection = require("./connection.js");

// Helper function for SQL syntax.
function printQuestionMarks(num) {
    var arr = [];
    for (var i = 0; i < num; i++) {
        // creates an array of question marks
      arr.push("?");
    }
    // // Turns array of question marks to string["?", "?", "?"].toString() => "?,?,?";
    return arr.toString();
  }

//   converts object key/value pairs to SQL syntax
  function objToSql(ob) {
    var arr = [];
    for (var key in ob) {
      var value = ob[key];
      // check to skip hidden properties
      if (Object.hasOwnProperty.call(ob, key)) {
        // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
        if (typeof value === "string" && value.indexOf(" ") >= 0) {
          value = "'" + value + "'";
        }
        arr.push(key + "=" + value);
      }
    }
    return arr.toString()
}


var orm = {
    selectAll: function(table, callback) {
        var queryString = "SELECT * FROM " + table + ";";
        connection.query(queryString, function(error, result) {
            if (error) {
                throw error;
            }
            // console.log("result" + result)
            callback(result)
        });
    },

    insertOne: function(table, columns, values, callback) {
        var queryString = "INSERT INTO " + table;

        queryString += " (";
        queryString += columns.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += printQuestionMarks(values.length);
        queryString += ") ";

        console.log(queryString);

        connection.query(queryString, values, function(error, result) {
            if (error) {
                throw err;
            }

            callback(result);
        })
    },

    deleteOne: function(table, condition, callback) {
        var queryString = "DELETE FROM " + table;
        queryString += " WHERE ";
        queryString += condition

        console.log(queryString);

        connection.query(queryString, function(error, result) {
            if (error) {
                throw err;
            }

            callback(result);
        })
    },
    updateOne: function(table, columnValue, condition, callback) {
        var queryString = "UPDATE " + table;

        queryString += " SET ";
        queryString += objToSql(columnValue);
        queryString += " WHERE ";
        queryString += condition;

        console.log(queryString);
        connection.query(queryString, function(error, result) {
            if (error) {
                throw err;
            }
            callback(result);
        });
    }
}


module.exports = orm;