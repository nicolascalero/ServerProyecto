require("dotenv");
const { Console } = require("console");
const express = require("express");
var app = express();
var http = require("http").createServer(app);
var io = require("socket.io")(http, { pingInterval: 2000, pingTimeout: 5000 });
const net = require("./modules/network");
const PORT = 3000;

//cuando alguien abre el index de la build
//app.use(express.static('public'));



io.on("connection", net);

//http.listen(3000, () => {
//  console.log("Servidor iniciado");
//});

//listen to the port 3000
http.listen(PORT, function () {
  console.log("listening on *:" + PORT);
});
//create a web application that uses the express frameworks and socket.io to communicate via http (the web protocol)
