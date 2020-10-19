const dotenv = require('dotenv').config({
    path: '../../.env'
});

const geoUser = process.env.GEO_USERNAME;

console.log(geoUser);

var path = require("path");

// Express package to run the server and its routes
const express = require("express");

// Initiate an instance of app
const app = express();

// Dependencies - Middleware
const bodyParser = require("body-parser");

// Middleware - connection to app instance
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors origin allowance
const cors = require("cors");
app.use(cors());

// Direct app to connect the server-side code to the main project folder AKA the client-side code
app.use(express.static("dist"));

// Generate the home route page of the app to use the index file from dist
app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

// Server creation
const port = 3000;

// The port the app will listen to for incoming requests
const server = app.listen (port, () => {
    console.log(`Server is running on localhost:${port}`);
});


// Function to GET Geonames Web API Data (Async GET)
async function geoNames(req, res) {
    const username = process.env.GEO_USERNAME

    let url = `http://api.geonames.org/searchJSON?q=${req.body.destination}&maxRows=1&username=${username}`;

    const response = await fetch(url)

    try {
        const data = await response.json();
        return(data);

    } catch (error) {
        console.log({ "error": error });
    }
};