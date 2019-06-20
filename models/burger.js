var orm = require("../config/orm.js");

var burger = {
    selectAll: function(callback) {
        orm.selectAll("burgers", function(response) {
            callback(response)
        })
    },

    insertOne: function(columns, values, callback) {
        orm.insertOne("burgers", columns, values, function(response) {
            callback(response)
        })
    },

    deleteOne: function(condition, callback) {
        orm.deleteOne("burgers", condition, function(response) {
            callback(response)
        })
    },
    updateOne: function(columnValue, condition, callback) { 
        orm.updateOne("burgers", columnValue, condition, function(response) {
            callback(response)
        })
    }

}


module.exports = burger;
