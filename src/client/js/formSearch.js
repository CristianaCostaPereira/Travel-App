import { validateCity } from "./validateCity";

// The form function
export async function handleSearch(event) {
    event.preventDefault();

    // Verifies the city and date that the user typed into the form
    let formCity = document.getElementById("city").value;
    
    if (!validateCity(formCity,)) {
        document.getElementById("error-message").innerHTML = "City could not be found";
        return;
        
    } else {
        document.getElementById("error-message").innerHTML = "";
        
    }

    var result = await fetch('http://localhost:3000/travel-app', {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({formCity}),
    })

    var jsonResult = await result.json()

    updateUI(jsonResult)
}

// Dynamic UI
const updateUI = async () => {
    const request = await fetch("/all");

    try {
        const allData = await request.json();

        document.getElementById("city").innerHTML = `${allData.city}`;


    } catch(error) {
        console.log("error", error);
    }
}