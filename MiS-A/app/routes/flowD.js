"use strict";

var flowDController = require("app/controllers/flowDController");

module.exports = function(app) {
// Home route
    app.get("/flowfour", flowDController.flowFour);
};

