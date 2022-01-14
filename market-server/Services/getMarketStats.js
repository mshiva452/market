const axios = require("axios");

const getMarketStats = (queryString) => {
	const response = axios.get(`${process.env.API}/${queryString}`);
	return response
		.then((data) => {
			return data;
		})
		.catch((error) => {
			return error;
		});
};

module.exports = getMarketStats;
