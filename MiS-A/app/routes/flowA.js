"use strict";

var flowAController = require("app/controllers/flowAController");

module.exports = function(app) {
// Home route
    app.get("/flowone", flowAController.flowOne);
};

