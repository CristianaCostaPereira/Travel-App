import './modal.js'
import { openModal } from './modal.js';

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

// windou.print();

export { getTravelInfo }

