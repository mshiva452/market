const express = require("express");
const bodyParser = require("body-parser");

const marketRoutes = require("./Routes/market.routes");

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

app.use("/market", marketRoutes);

app.use((err, req, res, next) => {
	console.log(err);
	next();
});

module.exports = app;
