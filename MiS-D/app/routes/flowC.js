"use strict";

var flowCController = require("app/controllers/flowCController");

module.exports = function(app) {
// Home route
    app.get("/flowthree", flowCController.flowThree);
};

