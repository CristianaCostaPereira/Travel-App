const axios = require("axios");
const dotenv = require('dotenv').config();

const GEO_USERNAME = process.env.GEO_USERNAME;
console.log(GEO_USERNAME);

const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
console.log(WEATHER_API_KEY);

const PIXABAY_API_KEY = process.env.PIXABAY_API_KEY;
console.log(PIXABAY_API_KEY);

// Belongs to the Geo Names query params that has value one, because we just want one single result
const MAX_ROWS = process.env.MAX_ROWS;

// Belongs to the Pixabay query params that has value photo
const IMAGE_TYPE = process.env.IMAGE_TYPE;

const TEMPERATURE_SYMBOL = process.env.TEMPERATURE_SYMBOL;

let latitude = "";
let longitude = "";

// Empty JS object to act as endpoint for all routes including as the API endpoint
// What the client will receive
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
    let departureDate = request.query['departureDate'];

    daysToTrip(departureDate);

    // Because let city is outside of fetchGeoNames method scope, we need to pass it as a parameter
    await fetchGeoNames(city);

    await fetchWeatherAPI();

    await fetchPixabay(city);

    // Return my 'envelope'
    response.send(travelInfo);
});

let fetchGeoNames = async (city) => {
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
            maxRows: MAX_ROWS,
            username: GEO_USERNAME
        }
    }).then((outcome) => {
        latitude = outcome.data.geonames[0].lat;
        longitude = outcome.data.geonames[0].lng;
        travelInfo.cityName = outcome.data.geonames[0].name; // To be shown in to my client

    }).catch((error) => {
        console.log(error);
    })
}

let fetchWeatherAPI = async () => {
    let result = await axios ({
        method: 'GET',
        url: 'http://api.weatherbit.io/v2.0/current',
        headers: {
            'Content-Type': 'application/json'
        },
        params: {
            key: WEATHER_API_KEY,
            lat: latitude,
            lon: longitude
        }
    }).then((outcome) => {
        travelInfo.temperature = outcome.data.data[0].temp + TEMPERATURE_SYMBOL;
        travelInfo.weather = outcome.data.data[0].weather.description;

    }).catch((error) => {
        console.log(error);
    })
}

let fetchPixabay = async (city) => {
    let result = await axios ({
        method: 'GET',
        url: 'https://pixabay.com/api/',
        headers: {
            'Content-Type': 'application/json'
        },
        params: {
            key: PIXABAY_API_KEY,
            q: encodeURI(city),
            image_type: IMAGE_TYPE
        }
    }).then((outcome) => {
        travelInfo.pictureURL = outcome.data.hits[0].webformatURL;

    }).catch((error) => {
        console.log(error);
    })
}

// Function that calculates the days until travel
let daysToTrip = (departureDate) => {
    let today = new Date();
    let day = String(today.getDate()).padStart(2, '0');
    let month = String(today.getMonth() + 1).padStart(2, '0'); // Because January is 0!
    let year = today.getFullYear();

    today = day + '/' + month + '/' + year;
    console.log(today)

    // Send actual date to client
    // travelInfo.dateToday = today

    // Set two dates to two variables    
    let dateNow = new Date();
    let travelDate = new Date("2020/11/22"); 

    // To calculate the time difference of two dates 
    var DifferenceInTime = travelDate.getTime() - dateNow.getTime(); 

    // To calculate the no. of days between two dates 
    var DifferenceInDays = DifferenceInTime / (1000 * 3600 * 24); 

    //To display the final no. of days (result) 
    console.log('Your trip is ' + DifferenceInDays + ' days away.');

    let response = 'Your trip is ' + DifferenceInDays + ' days away 😄.';

    // Send to client
    travelInfo.daysAway = response;
}