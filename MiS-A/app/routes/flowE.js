"use strict";

var flowEController = require("app/controllers/flowEController");

module.exports = function(app) {
// Home route
    app.get("/flowfive", flowEController.flowFive);
};

