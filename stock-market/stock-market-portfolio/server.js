const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 5000;

//bodyparser used for parsing request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());


// Database Address 
const url = "mongodb://localhost:27017/stockmarket"
  
// Connecting to database 
mongoose.connect(url).then((ans) => { 
  console.log("ConnectedSuccessful") 
}).catch((err) => { 
  console.log("Error in the Connection") 
}) 

// Calling Schema class 
const Schema = mongoose.Schema; 

// Creating Structure of the collection 
const stockSchema = Schema({
	company: String,
	description: String,
	initial_price: Number,
	price_2002: Number,
	price_2007: Number,
	symbol: String,
});

// Creating collection 
const collections = mongoose.model("stocks", stockSchema);

app.get("/api/stocks", async (req, res) => {
	try {
		const stocks = await collections.find();
		console.log(stocks.toString);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal Server Error" });
	}
});

app.post("/api/watchlist", async (req, res) => {
	try {
		const {
			company,
			description,
			initial_price,
			price_2002,
			price_2007,
			symbol,
		} = req.body;
		const stock = new collections({
			company,
			description,
			initial_price,
			price_2002,
			price_2007,
			symbol,
		});
		await stock.save();
		res.json({ message: "Stock added to watchlist successfully" });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal Server Error" });
	}
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
