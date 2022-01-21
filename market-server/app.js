const express = require("express");
const bodyParser = require("body-parser");
const WebSocketServer = require("ws").Server;
const router = express.Router();
const axios = require("axios");
const marketRoutes = require("./Routes/market.routes");
const getMarketStats = require("./Services/getMarketStats");
require("dotenv").config();

const app = express();

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE, PATCH");
	next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.SERVER_PORT || 5000;
const server = app.listen(port);
const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
	console.log("SERVER: Client connected!");
	let interval = 2000;
	ws.on("message", async (message) => {
		console.log(`${message}`);
		const queryString = `getAllIndices?pagesize=100&exchange=nse&sortby=value&sortorder=desc&marketcap=`;
		setInterval(async () => {
			const response = await getMarketStats(queryString);
			if (response.status === 200 && response.data.searchresult.length !== 0) {
				const searchResults = [];
				response.data.searchresult.map((indices) => {
					searchResults.push({
						indexId: indices.indexId,
						indexName: indices.indexName,
						advances: indices.advances,
						declines: indices.declines,
					});
				});
				ws.send(JSON.stringify(searchResults));
			} else {
				ws.send("No results found");
			}
		}, interval);
	});
	ws.on("close", () => {
		console.log("Client disconnected");
	});

	ws.onerror = function () {
		console.log("Some Error occurred");
	};
});

/* app.use("/market", marketRoutes); */

app.use((err, req, res, next) => {
	console.log(err);
	next();
});
