const axios = require("axios");
const dotenv = require('dotenv').config();

const geoUser = process.env.GEO_USERNAME;
console.log(geoUser);

const weather = process.env.WEATHER_API;
console.log(weather);

const imagePixabay = process.env.PIXABAY_API;
console.log(imagePixabay);

// Belongs to the Geo Names query params that has value one, because we just want one single result
const maxRows = 1;

let latitude = "";
let longitude = "";

// Empty JS object to act as endpoint for all routes including as the API endpoint
let travelInfo = {};

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
app.get('/travel-info', async (request, response) => {
    
    // Empty to clean the last result
    travelInfo = {};

    // Info from the users inputs
    let city = request.query['city'];
    let date = request.query['departureDate'];

    // Call function to call Geonames API
    // Axios GET method
    let result = await axios ({
        method: 'GET',
        url: 'http://api.geonames.org/searchJSON',
        headers: {
            'Content-Type': 'application/json'
        },
        params: {
            q: city,
            maxRows: maxRows,
            username: geoUser
        }
    }).then((outcome) => {
        latitude = outcome.data.geonames[0].lat;
        longitude = outcome.data.geonames[0].lng; 

    }).catch((error) => {
        console.log(error);
    })
        console.log("Working")
        response.send('Filas e Bárbara');

    // Return 'envelope'
    // response.send(xx);
});



// let fetchGeoNames = () => {

// }

// let fetchWeatherAPI = () => {

// }

// let fetchPixabay = () => {

// }