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

// Server creation
const port = 8000;
const server = app.listen (port, () => {
    console.log(`Server is running on localhost:${port}`)
});