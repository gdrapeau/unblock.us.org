/*** Generated by streamline 0.10.9 (callbacks) - DO NOT EDIT ***/ var __rt=require('streamline/lib/callbacks/runtime').runtime(__filename, false),__func=__rt.__func,__cb=__rt.__cb,__trap=__rt.__trap; (function main(_) { var __this = this; var __frame = { name: "main", line: 1 }; return __func(_, this, arguments, main, 0, __frame, function __$main() {
























    return (function ___closure(_) { var redis, redisClient, settings, util; util = require("util"); settings = require("../settings.js"); global.con = function() { return console.log(Array.prototype.concat(new Date().toISOString(), Array.prototype.slice.call(arguments, 0)).map(function(a) { return util.inspect(a); }).join(" ")); }; redis = require("redis"); redisClient = redis.createClient(); return redisClient.select(settings.redisDB, __cb(_, __frame, 17, 14, function __$___closure() { return redisClient.flushdb(__cb(_, __frame, 19, 14, function __$___closure() { redisClient.quit(); con("Done!"); _(); }, true)); }, true)); })(_); });}).call(this, __trap);
