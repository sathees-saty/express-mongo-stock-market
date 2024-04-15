// src/App.js

import React, { useState, useEffect } from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	NavLink,
} from "react-router-dom";
import "./App.css";


const Stocks = ({ addToWatchlist }) => {
	const [stocks, setStocks] = useState([]);

	useEffect(() => {
		// Fetch stock data from the backend
		fetch("http://localhost:5000/api/stocks")
			.then((res) => res.json())
			.then((data) => setStocks(data))
			.catch((error) => console.error("Error fetching stocks:", error));
	}, []);
	console.log(setStocks, "Stocksdata");

	const getRandomColor = () => {
		const colors = ["#FF0000", "#00FF00"]; // Red and Green
		return colors[Math.floor(Math.random() * colors.length)];
	};

	return (
		<div className="App">
			<h1>Stock Market MERN App</h1>
			<h2>Stocks</h2>
			<ul>
				{stocks.map((stock) => (
					<li key={stock.symbol}>
						{stock.company} ({stock.symbol}) - ({stock.description})
						<span style={{ color: getRandomColor() }}>
							{" "}
							${stock.initial_price}
						</span>
						<button onClick={() => addToWatchlist(stock)}>
							Add to My Watchlist
						</button>
					</li>
				))}
			</ul>
		</div>
	);
};

const Watchlist = ({ watchlist }) => {
	const getRandomColor = () => {
		const colors = ["#FF0000", "#00FF00"]; // Red and Green
		return colors[Math.floor(Math.random() * colors.length)];
	};

	return (
		<div className="App">
			<h1>Stock Market MERN App</h1>
			<h2>My Watchlist</h2>
			<ul>
				{watchlist.map((stock) => (
					<li key={stock.symbol}>
						{stock.company} ({stock.symbol}) - ({stock.description})
						<span style={{ color: getRandomColor() }}>
							{" "}
							${stock.initial_price}
						</span>
					</li>
				))}
			</ul>
		</div>
	);
};

const About = ({ about }) => {
	const getRandomColor = () => {
		const colors = ["#FF0000", "#00FF00"]; // Red and Green
		return colors[Math.floor(Math.random() * colors.length)];
	};

	return (
		<body>
			<div className="App">
				<h1>Stock Market MERN App</h1>
				<h2>About Us</h2>
				<h3>Our goal is to remove any technical or financial barriers that can prevent you from inverst. Our powerful tools empower individuals and business owners to buy stocks, sell online. Whether you're a beginner or expert, we're excited to help you on your journey!</h3>
				<br></br>
				<br></br>
				<br></br>
				<br></br>
				<br></br>
			</div>
		</body>
	);
};

const Contact = ({ contact }) => {
	const getRandomColor = () => {
		const colors = ["#FF0000", "#00FF00"]; // Red and Green
		return colors[Math.floor(Math.random() * colors.length)];
	};

	return (
		<body>
		<div className="App">
			<h1>Stock Market MERN App</h1>
			<h2>Contact Us</h2>
			<h3>BY PHONE</h3>
			<h3>Get telephone support by signing into your account.</h3>
			<br></br>
			<br></br>
		</div>
		</body>
	);
};

const LiveNews = ({ LiveNews }) => {
	const getRandomColor = () => {
		const colors = ["#FF0000", "#00FF00"]; // Red and Green
		return colors[Math.floor(Math.random() * colors.length)];
	};

	return (
		<body>
		<div className="App">
			<h1>Stock Market MERN App</h1>
			<h2>National Stock Exchange</h2>
			<a href="https://www.nseindia.com/market-data/live-equity-market" target="_blank">Live news</a>
			<br></br>
			<br></br>
			<br></br>
			<br></br>
			<br></br>
			<br></br>
			<br></br>
		</div>
		</body>
	);
};

const Account = ({ Account }) => {
	const getRandomColor = () => {
		const colors = ["#FF0000", "#00FF00"]; // Red and Green
		return colors[Math.floor(Math.random() * colors.length)];
	};

	return (
		<body>
		<div className="App">
			<h1>Stock Market MERN App</h1>
			User Name: <input type="text" id="name" name="name" required minlength="4" maxlength="8" size="30" />
			<br></br>
			<br></br>
			<br></br>
			Password:   <input type="password" id="pass" name="password" minlength="30" required />
			<br></br>
			<br></br>
			<br></br>
			<input type="submit" value="Submit" />
		</div>
		</body>
	);
};

function App() {
	const [watchlist, setWatchlist] = useState([]);

	const addToWatchlist = (stock) => {
		// Add stock to watchlist
		fetch("http://localhost:5000/api/watchlist", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(stock),
		})
			.then((res) => res.json())
			.then((data) => {
				// Show an alert with the message received from the server
				alert(data.message);
				setWatchlist([...watchlist, stock]);
			})
			.catch((error) =>
				console.error("Error adding to watchlist:", error)
			);
	};

	return (
		<Router>
			<nav>
				<NavLink to="/stocks">Stocks</NavLink>
				<NavLink to="/watchlist">Watchlist</NavLink>
				<NavLink to="/about">About</NavLink>
				<NavLink to="/contact">Contact</NavLink>
				<NavLink to="/marketwatch">Market Watch</NavLink>
				<NavLink to="/account">My Account</NavLink>
			</nav>
			<Routes>
				<Route
					path="/stocks"
					element={<Stocks addToWatchlist={addToWatchlist} />}
				/>
				<Route
					path="/watchlist"
					element={<Watchlist watchlist={watchlist} />}
				/>
				<Route
					path="/about"
					element={<About about={About} />}
				/>
				<Route
					path="/contact"
					element={<Contact about={Contact} />}
				/>	
				<Route
					path="/marketwatch"
					element={<LiveNews LiveNews={LiveNews} />}
				/>
				<Route
					path="/account"
					element={<Account Account={Account} />}
				/>	
			</Routes>
		</Router>
	);
}

export default App;
