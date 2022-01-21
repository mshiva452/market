const WebSocketServer = require("ws").Server;
require("dotenv").config();
const app = require("./app");

const port = process.env.SERVER_PORT || 5000;
const server = app.listen(port);
const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
	console.log("A client was connected!");

	ws.on("close", () => {
		console.log("Client disconnected");
	});

	ws.on("message", (message) => {
		console.log(`${message} recieved!`);
	});
});
