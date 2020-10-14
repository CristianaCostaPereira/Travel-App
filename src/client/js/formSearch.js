import { validateCity } from "./validateCity";
import { validateDate } from "./validateDate";

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
    

    let formDate = document.getElementById("departure-date").value

    if (!validateDate(formDate,)) {
        document.getElementById("error-message").innerHTML = "Please, enter a valid date";
        return;
        
    } else {
        document.getElementById("error-message").innerHTML = "";
        
    }


    // cHANGE PATH!!!!!!
    var result = await fetch('http://localhost:8081/evaluate-articles', {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({formUrl}),
    })

    var jsonResult = await result.json()

    updateUI(jsonResult)
}