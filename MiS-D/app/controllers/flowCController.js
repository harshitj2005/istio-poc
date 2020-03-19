"use strict";

/**
 * Module dependencies.
 */
const config = require("config/config");
const logger = require("config/winston");
const request = require("request");
const async = require("async");

var apiFunctions = {
    //FlowThree - D(success)-C(success)-B(success)-A(success) - output = 200
    flowThree: function(req,res){
        logger.info("req.headers",req.headers)
        let responseObj = {
            misA : "fail",
            misB : "fail",
            misC : "fail",
            misD : "success"
        };
        async.waterfall([
            //mis c
            (next) => {
                var requestJson = {
                    url:config.misC+"/return200"
                }
                request(requestJson, (err,response) => {
                    if(err){
                        next(err);
                    } else {
                        logger.info("response mis c",response.body);
                        responseObj.misC = "success";
                        next(null);
                    }
                });
            },
            //mis b
            (next) => {
                var requestJson = {
                    url:config.misB+"/return200"
                }
                request(requestJson, (err,response) => {
                    if(err){
                        next(err);
                    } else {
                        logger.info("response mis b",response.body);
                        responseObj.misB = "success";
                        next(null);
                    }
                });
            },
            //mis a
            (next) => {
                var requestJson = {
                    url:config.misA+"/return200"
                }
                request(requestJson, (err,response) => {
                    if(err){
                        next(err);
                    } else {
                        logger.info("response mis a",response.body);
                        responseObj.misA = "success";
                        next(null);
                    }
                });
            }
        ],(err) => {
            if(err){
                return res.status(500).jsonp({ info: "This is home", err:err });
            } else {
                return res.status(200).jsonp({ info: "This is home",data:responseObj });
            }
        })
    }
}
module.exports = apiFunctions