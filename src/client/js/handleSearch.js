const axios = require('axios');

async function getTravelInfo() {

    // Users input on city <input id="city">
    var city = document.getElementById("city").value;

    // Users input on city <input id="departure-date">
    var departureDate = document.getElementById("departure-date").value;

    // Axios get: first parameter its the URL path and the second is the configuration
    let response = await axios.get('/travel-info', 
        {
            params: {
                city: city,
                departureDate: departureDate
            }
        }
    );

}


export { getTravelInfo }