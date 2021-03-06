const axios = require('axios');

// Variable that shows or hides the history cards
let showHistory = false;

// Make request to server
// response.data is my array
const travelHistory = async () => {
    if (showHistory == true) {
        document.getElementById("travel-history-container").innerHTML = "";
        showHistory = false

    } else {
        let response = await axios ({
            method: 'GET',
            url: '/travel-history'
        });
    
        let historyCards = "";
    
        response.data.forEach(envelope => {
    
            historyCards += 
                `<div class="history-card">
                    <h2>${envelope.cityName}</h2>
                    <div class="history-card-image">
                        <img src="${envelope.tinyURL}" >
                    </div>
                    <span>${envelope.daysAway}</span>
                    <span><strong>${envelope.temperature}</strong></span>
                    <span>${envelope.weather}
                        <i class="fas fa-cloud-sun"></i>
                    </span>
                </div>`;
        });
    
        document.getElementById("travel-history-container").innerHTML = historyCards;
        showHistory = true;
    }
}

export { travelHistory }