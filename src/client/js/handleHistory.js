const axios = require('axios');

// Make request to server
const travelHistory = async () => {
    let response = await axios ({
        method: 'GET',
        url: '/travel-history'
    });

    let historyCards = 
        `<div class="history-card">
            <span>City: ${response.data[0].cityName}</span>
            <span>Temperature: ${response.data[0].temperature}</span>
            <span>Weather: ${response.data[0].weather}</span>
        </div>`;

        document.getElementById("travel-history-container").innerHTML = historyCards;
    //foreach travel in response


}

export { travelHistory }