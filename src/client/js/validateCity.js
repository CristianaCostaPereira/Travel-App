// import { request } from "express";

// document.getElementById("city").addEventListener("click", performAction);

// function performAction (event) {
//     // Select the actual value of an HTML input to include in POST, what the user enter themselfes
//     const validateCity = document.getElementById("city").value;
    
//      //API call
//      geoNames(url, validateCity).then(function(data) {
//         console.log(data)

//         // Adds data to POST Request
//         postData("/add", {
//             country: request.body.destination,
//         })

//         updateUI();
//     })
// };

// // Trigger a Button Click on Enter
// // Get the input field
// var cityInput = document.getElementById("city");

// // Execute a function when the user releases a key on the keyboard
// cityInput.addEventListener("keyup", function(event) {
//   // Number 13 is the "Enter" key on the keyboard
//   if (event.keyCode === 13) {
//     // Cancel the default action, if needed
//     event.preventDefault();

//     performAction();
//   }
// });

// export { validateCity }