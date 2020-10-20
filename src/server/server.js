const axios = require("axios");
const dotenv = require('dotenv').config();

const geoUser = process.env.GEO_USERNAME;
console.log(geoUser);

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
    
    travelInfo = {};

    let city = request.query['city'];    
    let date = request.query['departureDate'];
    try {

        await fetchGeoName(city, 'buzica');
        
        // response.send(result);

        response.json({
            success: true,
            travelInfo: travelInfo
        });

    } catch(error) {
        response.send(error.message);
    }
});


const fetchGeoName = async (city, user) => {
    // const request = await fetch(`http://api.geonames.org/searchJSON?maxRows=1&q=${city}&username=${user}`);
    // const res = await request.json();

    const result = await axios ({
        method: 'GET',
        url: 'http://api.geonames.org/searchJSON',
        params: {
            q: city,
            username: user,
            maxRows: 10
        }
    });

    // const resu = await result.json();

    travelInfo.city = result;
    // travelInfo.city = result.geonames[0].name;
    // travelInfo.country = result.geonames[0].countryName;
    // travelInfo.cityId = result.geonames[0].geonameId;
}

