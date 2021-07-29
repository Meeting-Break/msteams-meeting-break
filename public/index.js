var express = require("express");
var compression = require("compression");
var helmet = require("helmet");

var app = express();

var options = {
  index: "index.html",
};

app.use(compression());
app.use(helmet());
app.use("/", express.static("/home/site/wwwroot", options));
app.use("/api/health", (req, res, next) => {
  res.sendStatus(200);
  return next();
});
console.log("NODE_ENV=" + process.env.NODE_ENV);
console.log("Listening on port " + process.env.PORT + "...");
const server = app.listen(process.env.PORT);

process.on("SIGTERM", () => {
  console.debug("SIGTERM signal received: closing HTTP server");
  server.close(() => {
    console.log("HTTP server closed");
  });
});
