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
const formData = document.querySelectorAll(".formData");
const closeModalBtn = document.getElementsByClassName("close")[0];

// inputs
const firstNameInput = document.getElementsByName("first")[0];
const lastNameInput = document.getElementsByName("last")[0];
const emailInput = document.getElementsByName("email")[0];
const quantityInput = document.getElementsByName("quantity")[0];
const cguCheckedInput = document.getElementById("checkbox1");
const birthdateInput = document.getElementById("birthdate")[0];

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

//close modal event
closeModalBtn.addEventListener("click", closeModal);

function closeModal() {
  modalbg.style.display = "none";
}

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

function insertAfter(newNode, referenceNode) {
  referenceNode.parentNode.insertBefore(
    newNode,
    referenceNode.nextElementSibling
  );
}

function errorMessage(id, input) {
  let message = document.createElement("p");
  if (input.nextElementSibling == null) {
    insertAfter(message, input);
  }
  message.classList.add("error");

  switch (id !== null) {
    case id == "first":
      message.innerHTML =
        "Veuillez entrer 2 caractères ou plus pour le champ du prénom.";
      break;
    case id == "last":
      message.innerHTML =
        "Veuillez entrer 2 caractères ou plus pour le champ du nom.";
      break;
    case id == "email":
      message.innerHTML = "Adresse email non valide";
      break;
    case id == "birthdate":
      message.innerHTML = "Vous devez entrer votre date de naissance.";
      break;
    case id == "quantity":
      message.innerHTML = "Veuillez saisir une donnée numérique";
      break;

    default:
      message.innerHTML =
        "Une erreure est survenue veuillez réessayer plus tard";
  }
}

function isInputValid(input, type, id) {
  const isEmail = type == "email";
  const isText = type == "text";

  input.addEventListener("input", function (e) {
    var value = e.target.value;
    if (isText) {
      if (value.length < 2) {
        input.classList.add("danger");
        errorMessage(id, input);
      } else {
        input.classList.remove("danger");
        if (input.nextElementSibling !== null) {
          input.nextElementSibling.remove();
        }
      }
    } else if (type !== "text") {
      var pattern = isEmail ? /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/ : /^\d+$/;
      if (pattern.test(value)) {
        input.classList.remove("danger");
        if (input.nextElementSibling !== null) {
          input.nextElementSibling.remove();
        }
      } else {
        console.log(id);
        errorMessage(id, input);
      }
    }
  });
}

isInputValid(firstNameInput, "text", "first");
isInputValid(lastNameInput, "text", "last");
isInputValid(emailInput, "email", "email");
isInputValid(quantityInput, "number", "quantity");

function validate(e) {
  e.preventDefault();
  if (!cguCheckedInput.checked) {
    return alert("yo tu dois sélectionner le truc");
  }
}

console.log(cguCheckedInput.checked);
