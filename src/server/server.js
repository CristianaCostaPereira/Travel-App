const dotenv = require('dotenv').config();

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
const { response } = require('express');
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


// get route for travel info
app.get('/travel-info', function (req, res) {

    let city = "";
    let date = "";
    let dateDiff = "";
    
    let response = {
        "success":true,
        "trip": {
            "departDate":1593475200000,
            "city":"London",
            "country":"United Kingdom",
            "cityId":2643743,
            "days":-112,
            "weather":"No forecast for this city",
            "imageUrl":"https://pixabay.com/get/53e3d5434f57b10ff3d8992cc62e3f77173fd8ed4e507749762d7add914fc4_640.jpg"
        }
    }
    res.send(response);
})