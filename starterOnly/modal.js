// Fonction pour gérer le menu hamburger en mode responsive
function editNav() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

// Sélection des éléments du DOM nécessaires pour la modal
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const close = document.querySelector(".close");
const submit = document.querySelector(".btn-submit");

// Fermeture de la modal lors du clic sur le bouton de fermeture
close.addEventListener("click", () => {
    modalbg.style.display = "none";
});

// Ajout des écouteurs d'événements pour ouvrir la modal sur chaque bouton
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// Fonction pour afficher la modal
function launchModal() {
    modalbg.style.display = "block";
}

// Sélection des éléments du formulaire
const form = document.querySelector("form");
const firstName = document.getElementById("first");
const lastName = document.getElementById("last");
const email = document.getElementById("email");
const birthdate = document.getElementById("birthdate");
const quantity = document.getElementById("quantity");
const checkbox1 = document.getElementById("checkbox1");

// Expression pour valider le format de l'email
const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
const locations = document.querySelectorAll('input[name="location"]');

// Messages d'erreur pour chaque champ du formulaire
const errorMessages = {
    firstName: "Veuillez entrer 2 caractères ou plus pour le prénom.",
    lastName: "Veuillez entrer 2 caractères ou plus pour le nom.",
    email: "Veuillez entrer un email valide.",
    birthdate: "Veuillez entrer votre date de naissance.",
    quantity: "Veuillez entrer une valeur",
    location: "Veuillez choisir une option.",
    terms: "Vous devez accepter les conditions.",
};

// Fonction pour afficher/masquer les messages d'erreur
function toggleErrorMessage(fieldContainer, hasError, errorMessage = "") {
    if (hasError) {
        fieldContainer.setAttribute("data-error", errorMessage);
        fieldContainer.setAttribute("data-error-visible", "true");
    } else {
        fieldContainer.removeAttribute("data-error");
        fieldContainer.removeAttribute("data-error-visible");
    }
}

// Fonction pour gérer la validation des champs
function handleValidation(field, isValidCondition, errorMessage) {
    let fieldContainer;
    if (field instanceof NodeList || Array.isArray(field)) {
        fieldContainer = field[0].closest(".formData");
        locations.forEach((location) => {
            location.addEventListener("change", () => {
                const isValid = isValidCondition();
                toggleErrorMessage(fieldContainer, !isValid, errorMessage);
            });
        });
    } else {
        fieldContainer = field.closest(".formData");
        field.addEventListener("input", () => {
            const isValid = isValidCondition();
            toggleErrorMessage(fieldContainer, !isValid, errorMessage);
        });
    }
    const isValid = isValidCondition();
    toggleErrorMessage(fieldContainer, !isValid, errorMessage);

    return isValid;
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
// Fonction principale de validation du formulaire
function validate(event) {
    event.preventDefault();

    // Validation de chaque champ du formulaire
    const firstNameValid = handleValidation(firstName, () => firstName.value.trim().length >= 2, errorMessages.firstName);
    const lastNameValid = handleValidation(lastName, () => lastName.value.trim().length >= 2, errorMessages.lastName);
    const emailValid = handleValidation(email, () => emailRegex.test(email.value), errorMessages.email);
    const birthdateValid = handleValidation(birthdate, () => birthdate.value, errorMessages.birthdate);
    const quantityValid = handleValidation(quantity, () => quantity.value, errorMessages.quantity);
    const locationsValid = handleValidation(locations, () => Array.from(locations).some((radio) => radio.checked), errorMessages.location);
    const checkbox1Valid = handleValidation(checkbox1, () => checkbox1.checked, errorMessages.terms);

    // Vérification globale de la validité du formulaire
    const isValid = firstNameValid && lastNameValid && emailValid && birthdateValid && quantityValid && locationsValid && checkbox1Valid;

    // Si le formulaire est valide, fermer la modal et afficher un message de confirmation
    if (isValid) {
        const modalBody = document.querySelector(".modal-body");
        modalBody.innerHTML = `
            <div class="confirmation-message">
                <h2 class="confirmation-title">Merci pour votre inscription</h2>
                <button class="btn-close">Fermer</button>
            </div>
        `;

        const closeBtn = document.querySelector(".btn-close");
        closeBtn.addEventListener("click", () => {
            modalbg.style.display = "none";
        });
    }
}

// Attribution de la fonction de validation à l'événement de soumission du formulaire
form.onsubmit = validate;
