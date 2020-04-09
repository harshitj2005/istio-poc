"use strict";

/**
 * Module dependencies.
 */
var fs = require("fs");
let config = require("config/config");
const logger = require("config/winston");

var apiFunctions = {
    home: function(req,res){
        if (req.accepts("html")) {
            // Respond with html page.
            fs.readFile(config.root + "/public/views/" + "index.html", "utf-8", function(err, page) {
                res.writeHead(200, { "Content-Type": "text/html" });
                res.write(page);
                res.end();
            });
        } else {
            if (req.accepts("json")) {
                // Respond with json.
                res.status(200).jsonp({ info: "This is home "+config.app.name });
            } else {
                // Default to plain-text. send()
                res.status(200).type("txt").send("This is home");
            }
        }
        return;
    },
    return200: function(req,res){
        logger.info("return200 req.headers",req.headers);
        return res.status(200).jsonp({ info: "This is return 200 "+config.app.name });
    },
    return400: function(req,res){
        logger.info("return400 req.headers",req.headers);
        return res.status(400).jsonp({ info: "This is return 400 "+config.app.name });
    },
    return500: function(req,res){
        logger.info("return500 req.headers",req.headers);
        return res.status(500).jsonp({ info: "This is return 500 "+config.app.name });
    },
}
module.exports = apiFunctions