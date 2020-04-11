var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {}
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;
handle["/first"] = requestHandlers.first;
handle["/second"] = requestHandlers.second;
handle["/third"] = requestHandlers.third;

server.start(router.route, handle);