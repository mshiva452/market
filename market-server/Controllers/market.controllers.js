const getMarketStats = require("../Services/getMarketStats");

exports.getStatusById = async (req, res) => {
	const indexId = req.params.indexId;
	const queryString = `getIndexByIds?pagesize=50&exchange=50&sortby=percentChange&sortorder=desc&indexid=${indexId}&company=true&marketcap=`;
	const response = await getMarketStats(queryString);

	if (response.status === 200 && response.data.hasOwnProperty("searchresult")) {
		const { indexName, advances, declines } = response.data.searchresult[0];
		const searchResults = [];
		searchResults.push({
			indexName,
			advances,
			declines,
		});
		res.json({ searchResults });
	} else {
		res.json({ status: 401, msg: "No results found" });
	}
};

exports.getAllIndices = async (req, res) => {
	const queryString = `getAllIndices?pagesize=100&exchange=nse&sortby=value&sortorder=desc&marketcap=`;
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
		res.json({ searchResults });
	} else {
		res.json({ status: 401, msg: "No results found" });
	}
};
