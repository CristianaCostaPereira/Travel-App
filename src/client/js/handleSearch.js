const axios = require('axios');

async function getTravelInfo(event) {
    // Prevents the form submission action of clicking the "Search" button
    event.preventDefault();

    // Users input on city <input id="city">
    var city = document.getElementById("city").value;

    // Users input on city <input id="departure-date">
    var departureDate = document.getElementById("departure-date").value;

    // Axios GET request
    let response = await axios ({
        method: 'GET',
        url: '/travel-info',
        params: {
            city: city,
            departureDate: departureDate
        }
    });
}

export { getTravelInfo }