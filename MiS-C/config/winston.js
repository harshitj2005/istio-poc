"use strict";

var winston = require("winston");
var logger = new (winston.Logger)();

logger.add(winston.transports.Console, {
    level: "verbose",
    prettyPrint: true,
    colorize: false,
    silent: false,
    timestamp: false
});

logger.stream = {
    write: function(message){
        logger.info(message);
    }
};

module.exports = logger;
