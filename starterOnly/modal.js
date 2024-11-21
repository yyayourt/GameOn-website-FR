function editNav() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const close = document.querySelector(".close");
const submit = document.querySelector(".btn-submit");

close.addEventListener("click", () => {
    modalbg.style.display = "none";
});

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
    modalbg.style.display = "block";
}
const form = document.querySelector("form");
const firstName = document.getElementById("first");
const lastName = document.getElementById("last");
const email = document.getElementById("email");
const birthdate = document.getElementById("birthdate");
const quantity = document.getElementById("quantity");
const checkbox1 = document.getElementById("checkbox1");

const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
const locations = document.querySelectorAll('input[name="location"]');

const errorMessages = {
    firstName: "Veuillez entrer 2 caractères ou plus pour le prénom.",
    lastName: "Veuillez entrer 2 caractères ou plus pour le nom.",
    email: "Veuillez entrer un email valide.",
    birthdate: "Veuillez entrer votre date de naissance.",
    quantity: "Veuillez entrer une valeur",
    location: "Veuillez choisir une option.",
    terms: "Vous devez accepter les conditions.",
};

function toggleErrorMessage(fieldContainer, hasError, errorMessage = "") {
    if (hasError) {
        fieldContainer.setAttribute("data-error", errorMessage);
        fieldContainer.setAttribute("data-error-visible", "true");
    } else {
        fieldContainer.removeAttribute("data-error");
        fieldContainer.removeAttribute("data-error-visible");
    }
}

function handleValidation(field, isValidCondition, errorMessage) {
    let fieldContainer;
    if (field.length) {
        fieldContainer = field[0];
        locations.forEach((location) => {
            location.addEventListener("change", validate);
            const isValid = isValidCondition();
            toggleErrorMessage(fieldContainer, !isValid, errorMessage);
        });
    }
    fieldContainer = field.closest(".formData");
    field.addEventListener("input", validate);
    const isValid = isValidCondition();
    toggleErrorMessage(fieldContainer, !isValid, errorMessage);
}

// function handleValidation(field, isValidCondition, errorMessage) {
//     const fieldContainer = field.closest(".formData");
//     field.addEventListener("input", validate);
//     const isValid = isValidCondition();
//     toggleErrorMessage(fieldContainer, !isValid, errorMessage);
// }

// function changeValidation(fields, isValidCondition, errorMessage) {
//     console.log(fields);

//     fields.forEach((field) => {
//         const fieldContainer = field.closest(".formData");
//         field.addEventListener("change", validate);
//         const isValid = isValidCondition();
//         toggleErrorMessage(fieldContainer, !isValid, errorMessage);
//     });
// }

function validate(event) {
    event.preventDefault();

    const firstNameValid = handleValidation(firstName, () => firstName.value.length >= 2, errorMessages.firstName);
    const lastNameValid = handleValidation(lastName, () => lastName.value.length >= 2, errorMessages.lastName);
    const emailValid = handleValidation(email, () => emailRegex.test(email.value), errorMessages.email);
    const birthdateValid = handleValidation(birthdate, () => birthdate.value, errorMessages.birthdate);
    const quantityValid = handleValidation(quantity, () => quantity.value, errorMessages.quantity);
    const locationsValid = handleValidation(locations, () => Array.from(locations).some((radio) => radio.checked), errorMessages.location);
    const checkbox1Valid = handleValidation(checkbox1, () => checkbox1.checked, errorMessages.terms);

    const isValid = firstNameValid && lastNameValid && emailValid && birthdateValid && quantityValid && locationsValid && checkbox1Valid;

    if (isValid) {
        modalbg.style.display = "none";
        alert("Merci! Votre réservation a été reçue.");
    }
}

form.onsubmit = validate;
