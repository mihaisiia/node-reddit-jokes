const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require("dotenv")
const browserObject = require("./src/browser")
const scraperController = require("./src/scraperController")
dotenv.config();
const database = process.env.MONGODB_URI;
mongoose.connect(database)
.then(() => console.log("mongoose has connected to database"))
.catch(err => console.log(err))

app.set("view engine", 'ejs');
app.engine('html', require('ejs').renderFile)
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use("/", require("./routes/smile"));
const PORT = process.env.PORT || 4111;
app.listen(PORT, console.log("Server starting for port: " + PORT));

// Comment out below lines if you want to npm run develop
// let browserInstance = browserObject.startBrowser()
// scraperController(browserInstance)