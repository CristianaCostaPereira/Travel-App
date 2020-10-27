import './modal.js'
import { openModal } from './modal.js';
// To include a custom regenerator runtime that will allow me to use async, await with (ES6 or ES Next)!
import "@babel/polyfill";

const axios = require('axios');

// Function to get the Form Info
const getTravelInfo = async (event) => {

    // Users input on city <input id="city">
    const city = document.getElementById("city").value;

    // Users input on city <input id="departure-date">
    const departureDate = document.getElementById("departure-date").value;

    if (departureDate =='' || city =='') {
        return
    }

    // Axios GET request to the server
    let response = await axios ({
        method: 'GET',
        url: '/travel-info',
        params: {
            city: city,
            departureDate: departureDate
        }
    });

    // Display error message if invalid results returned from server
    if (response.data.errorMessage) {
        document.getElementById("error-message").innerHTML = response.data.errorMessage;

    } else {
        document.getElementById("error-message").innerHTML = "";

        document.getElementById("modal-city-name").innerHTML = response.data.cityName;
        document.getElementById("modal-city-image").src = response.data.pictureURL;
        document.getElementById("modal-days-away").innerHTML = "<strong>Days until trip: </strong>" + response.data.daysAway;
        document.getElementById("modal-temperature").innerHTML = "<strong>Temperature: </strong>" + response.data.temperature;
        document.getElementById("modal-weather").innerHTML = "<strong>Weather: </strong>" + response.data.weather;

        openModal();
    }
}

// Blocks past dates
// Unables users to pick a date date that already passed
let today = new Date().toISOString().split('T')[0];
document.getElementsByName("setTodaysDate")[0].setAttribute('min', today);

// Get the input field by using the 'enter' key on the keyboard
var searchEnter = document.getElementById("departure-date");
var searchEnterVal = "";

if (searchEnter) {
    // Execute a function when the user releases a key on the keyboard
    searchEnter.addEventListener("keyup", function(event) {
        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
          // Cancel the default action, if needed
          event.preventDefault();
          // Trigger the button element with a click
          document.getElementById("departure-date").click();
        }
    });
    searchEnterVal = searchEnter.value;
}


export { getTravelInfo }

