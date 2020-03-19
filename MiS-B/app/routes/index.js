"use strict";

var index = require("app/controllers/index");

module.exports = function(app) {
// Home route
    app.get("/", index.home);
    app.get("/return200", index.return200);
    app.get("/return400", index.return400);
    app.get("/return500", index.return500);
};

