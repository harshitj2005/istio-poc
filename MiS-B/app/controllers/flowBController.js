"use strict";

/**
 * Module dependencies.
 */
let config = require("config/config");
const logger = require("config/winston");
const request = require("request");
const async = require("async");

var apiFunctions = {
    flowTwo: function(req,res){
        //FlowTwo - B(success)-D(success)-C(success)-A(success) - output = 200
        logger.info("req.headers",req.headers)
        let responseObj = {
            misA : "fail",
            misB : "success",
            misC : "fail",
            misD : "fail"
        };
        async.waterfall([
            //mis d
            (next) => {
                var requestJson = {
                    url:config.misD+"/return200"
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
                        responseObj.misC = "success";
                        next(null);
                    }
                });
            },
            //mis b
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
            },
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