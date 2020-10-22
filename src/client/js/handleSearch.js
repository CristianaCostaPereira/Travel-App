const axios = require('axios');

// Function to get the Form Info
const getTravelInfo = async (event) => {
    // Prevents the form submission action of clicking the "Search" button
    event.preventDefault();

    // Users input on city <input id="city">
    const city = document.getElementById("city").value;

    // Users input on city <input id="departure-date">
    const departureDate = document.getElementById("departure-date").value;

    // Axios GET request
    let response = await axios ({
        method: 'GET',
        url: '/travel-info',
        params: {
            city: city,
            departureDate: departureDate
        }
    });

    document.getElementById("city-image").src = response.data.pictureURL;

}

export { getTravelInfo }

