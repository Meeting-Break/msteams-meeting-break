var express = require("express");
var compression = require("compression");
var helmet = require("helmet");

var server = express();

var options = {
  index: "index.html",
};

server.use(compression());
server.use(helmet());
server.use("/", express.static("/home/site/wwwroot", options));
server.use("/api/health", (req, res, next) => {
  res.sendStatus(200);
  return next();
});
console.log("NODE_ENV=" + process.env.NODE_ENV);
console.log("Listening on port " + process.env.PORT + "...");
server.listen(process.env.PORT);
