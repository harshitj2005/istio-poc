"use strict";

/**
 * Module dependencies.
 */
const config = require("config/config");
const logger = require("config/winston");
const request = require("request");
const async = require("async");

var apiFunctions = {
    //FlowOne - A(success)-B(success)-C(success)-D(success) - output = 200
    flowOne: function(req,res){
        logger.info("req.headers",req.headers);
        var xReqId = req.headers["x-request-id"];
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
                    url:config.misB+"/return200",
                    headers:{
                        "Content-Type":"application/json",
                        "x-request-id":xReqId
                    }
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
            //mis c
            (next) => {
                var requestJson = {
                    url:config.misC+"/return200",
                    headers:{
                        "Content-Type":"application/json",
                        "x-request-id":xReqId
                    }
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
                    url:config.misD+"/return200",
                    headers:{
                        "Content-Type":"application/json",
                        "x-request-id":xReqId
                    }
                }
                request(requestJson, (err,response) => {
                    if(err){
                        next(err);
                    } else {
                        logger.info("response mis d",response.body);
                        responseObj.misD = "success";
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