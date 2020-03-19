"use strict";

var flowBController = require("app/controllers/flowBController");

module.exports = function(app) {
// Home route
    app.get("/flowtwo", flowBController.flowTwo);
};

