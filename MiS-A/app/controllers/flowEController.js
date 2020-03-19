"use strict";

/**
 * Module dependencies.
 */
const config = require("config/config");
const logger = require("config/winston");
const request = require("request");
const async = require("async");

var apiFunctions = {
    //FlowFive - A(success)-B(fail)-C(fail)-D(fail)- output = 500
    flowFive: function(req,res){
        logger.info("req.headers",req.headers)
        let responseObj = {
            misA : "fail",
            misB : "fail",
            misC : "fail",
            misD : "fail"
        };
        async.waterfall([
            //mis b
            (next) => {
                var requestJson = {
                    url:config.misB+"/return500"
                }
                request(requestJson, (err,response) => {
                    if(err){
                        next(err);
                    } else {
                        logger.info("response mis b",response.body);
                        if(response.statusCode == 200){
                            responseObj.misB = "success";
                        } else {
                            responseObj.misB = "fail";
                        }
                        next(null);
                    }
                });
            },
            //mis c
            (next) => {
                var requestJson = {
                    url:config.misC+"/return500"
                }
                request(requestJson, (err,response) => {
                    if(err){
                        next(err);
                    } else {
                        logger.info("response mis c",response.body);
                        if(response.statusCode == 200){
                            responseObj.misC = "success";
                        } else {
                            responseObj.misC = "fail";
                        }
                        next(null);
                    }
                });
            },
            //mis b
            (next) => {
                var requestJson = {
                    url:config.misD+"/return500"
                }
                request(requestJson, (err,response) => {
                    if(err){
                        next(err);
                    } else {
                        logger.info("response mis d",response.body);
                        if(response.statusCode == 200){
                            responseObj.misD = "success";
                        } else {
                            responseObj.misD = "fail";
                        }
                        next(null);
                    }
                });
            },
            (next) => {
                let allFailed = true;
                for(var key in responseObj){
                    if(responseObj[key] == "success"){
                        allFailed = false;
                    }
                }
                if(allFailed){
                    next("all failed");
                } else {
                    next(null);
                }
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