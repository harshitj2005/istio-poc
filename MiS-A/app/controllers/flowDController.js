"use strict";

/**
 * Module dependencies.
 */
const config = require("config/config");
const logger = require("config/winston");
const request = require("request");
const async = require("async");

var apiFunctions = {
    //FlowFour - A(success)-B(fail)-C(success)-D(fail)- output = 200
    flowFour: function(req,res){
        logger.info("req.headers",req.headers)
        let responseObj = {
            misA : "success",
            misB : "fail",
            misC : "fail",
            misD : "fail"
        };
        async.waterfall([
            //mis b
            (next) => {
                var requestJson = {
                    url:config.misB+"/return400"
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
                    url:config.misC+"/return200"
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
                    url:config.misD+"/return200"
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