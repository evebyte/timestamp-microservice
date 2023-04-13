// where your node app starts

// imports express and creates an express app
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (req, res) => {
	res.sendFile(__dirname + "/views/index.html");
});

app.get("/api/:date?", (req, res) => {
	const { date } = req.params;

	if (!date) {
		// handle empty date parameter
		const now = new Date();
		return res.json({
			unix: now.getTime(),
			utc: now.toUTCString(),
		});
	}

	// if date is not a number, then create a new Date object from the date string
	const parsedDate = isNaN(date) ? new Date(date) : new Date(parseInt(date));

	if (isNaN(parsedDate.getTime())) {
		// handle invalid date string
		return res.json({
			error: "Invalid Date",
		});
	}

	// handle valid date string
	return res.json({
		unix: parsedDate.getTime(),
		utc: parsedDate.toUTCString(),
	});
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
	console.log("Your app is listening on port " + listener.address().port);
});
