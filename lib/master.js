/*** Generated by streamline 0.10.9 (callbacks) - DO NOT EDIT ***/ var __rt=require('streamline/lib/callbacks/runtime').runtime(__filename, false),__func=__rt.__func,__cb=__rt.__cb; (function() {
  var Bottleneck, cluster, cpus, createWorker, i, interval, limiter, nbWorkers, redis, redisClient, resetKeys, settings, stats, statsLast, statsStart, timeouts, workers, _i;

  cluster = require("cluster");

  cpus = require("os").cpus().length;

  redis = require("redis");

  settings = require("../settings");

  nbWorkers = Math.min(4, cpus);

  Bottleneck = require("bottleneck");

  limiter = new Bottleneck(nbWorkers, 3000);

  if (cluster.isMaster) {
    redisClient = redis.createClient();
    redisClient.select(settings.redisDB);
    statsStart = ["https.fail.start","https.start","udp.fail.start","udp.start","tcp.fail.start","tcp.start",];
    stats = ["https.fail","https","udp.fail","udp","tcp.fail","tcp",];
    statsLast = ["https.fail.last","https.last","udp.fail.last","udp.last","tcp.fail.last","tcp.last",];
    resetKeys = function resetKeys__1(keys, _) { var __frame = { name: "resetKeys__1", line: 24 }; return __func(_, this, arguments, resetKeys__1, 1, __frame, function __$resetKeys__1() {
        return keys.forEach_(__cb(_, __frame, 1, 18, _, true), -1, function __1(_, k) { var __frame = { name: "__1", line: 25 }; return __func(_, this, arguments, __1, 0, __frame, function __$__1() {
            return _(null, redisClient.set(k, 0)); }); }); }); };


    resetKeys(statsStart.concat(stats, statsLast), function() {  });
    interval = function interval__2(_) { var __frame = { name: "interval__2", line: 30 }; return __func(_, this, arguments, interval__2, 0, __frame, function __$interval__2() {
        return (redisClient.mget(stats, __cb(_, __frame, 1, 26, function ___(__0, __3) { return __3.forEach_(__cb(_, __frame, 1, 42, _, true), -1, function __1(_, s, i) { var __frame = { name: "__1", line: 31 }; return __func(_, this, arguments, __1, 0, __frame, function __$__1() {
              return redisClient.mset((stats[i] + ".last"), s, stats[i], 0, __cb(_, __frame, 1, 27, _, true)); }); }); }, true))); }); };


    setInterval(function() {
      return interval(function() {  });
    }, (60 * 1000)); } ;


  workers = { };

  timeouts = { };

  createWorker = function() {
    var id, timeout, worker;
    worker = cluster.fork();
    id = worker.id;
    timeout = setTimeout(function() {
      console.log((("worker " + id) + " took too long to start, killing it"));
      return ((worker != null) ? worker.kill() : void 0);
    }, 3000);
    worker.on("message", function(message) {
      if ((message.cmd && (message.cmd === "online"))) {
        clearTimeout(timeout);
        workers[id] = worker;
        return console.log(("online " + id)); } ; });


    console.log(("forked " + id));
    return worker.on("exit", function(code, signal) {
      worker = null;
      console.log((((((("worker crashed " + id) + "\nCode: ") + code) + "\nSignal: ") + signal) + "\nRestarting it..."));
      return limiter.submit(createWorker, null); }); };



  if (cluster.isMaster) {
    for (i = _i = 1; ((1 <= nbWorkers) ? (_i <= nbWorkers) : (_i >= nbWorkers)); i = ((1 <= nbWorkers) ? ++_i : --_i)) {
      createWorker(); }; }

   else {
    require("./worker"); } ;


}).call(this);
