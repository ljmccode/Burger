var express = require("express");
// Import the model burger.js to use its database functions
var burger = require("../models/burger.js");

var router = express.Router();

// Create all routes and set up logic within routes

// Grab all burgers from database
router.get("/", function(request, response) {
    burger.selectAll(function(data) {
        // console.log("data " + data)
        var hbsObject = {
            burgers: data
        }
    
        // console.log("hbs object: " + hbsObject)
        response.render("index", hbsObject)
    });
});

// Post new burger to database
router.post("/api/burgers", function(request, response) {
    burger.insertOne(["burger_name", "devoured"], [request.body.burger_name, request.body.devoured], function(result) {
        // sending back id of new burger
        console.log(request.body.burger_name)
        console.log(request.body.devoured)
        response.json({id: result.insertId});
    });
});

// trash a burger
router.delete("/api/burgers/:id", function(request, response) {
    var condition = "id = " + request.params.id;
    console.log("condition", condition);
    burger.deleteOne(condition, function(result) {
        if (result.changedRows === 0) {
            return response.status(404).end();
        } else {
            repsonse.status(200).end()
        }
    });
});

// change status of burger
router.put("/api/burgers/:id", function(request, response) {
    var condition = "id = " + request.params.id;
    console.log("condition", condition);
    burger.updateOne({devoured: request.body.devoured } , condition, function(result) {
        if (result.changedRows === 0) {
            return response.status(404).end();
        } else {
            response.status(200).end()
        }
    })
    
})
module.exports = router;