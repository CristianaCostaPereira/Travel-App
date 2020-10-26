// Get the modal
var modal = document.getElementById("myModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal with the information wanted
const openModal = () => {
    modal.style.display = "block";
}
const closeModal = () => {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        closeModal();
    }
}

// When the user clicks on <span> (x), close the modal
// Could simply be: span.onclick = closeModal;
span.addEventListener('click', () => {
    closeModal();
});

export {openModal, closeModal}