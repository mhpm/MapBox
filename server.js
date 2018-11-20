const express = require("express");
const port = process.env.PORT || 3030;

const app = express();

app.use(express.static(__dirname + "/dist/"));

app.get(/.*/, function(req, res) {
  res.sendfile(__dirname + "/dist/index.html");
});

app.listen(port);

console.log("server started...");
