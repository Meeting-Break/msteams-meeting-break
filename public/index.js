var express = require("express");
var compression = require("compression");

var server = express();

var options = {
  index: "index.html",
};

server.use(compression());
server.use("/", express.static("/home/site/wwwroot", options));
server.use("/api/health", (req, res, next) => {
  res.sendStatus(200);
  return next();
});
server.listen(process.env.PORT);
