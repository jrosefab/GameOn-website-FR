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
const birthdateInput = document.getElementById("birthdate");

const InputsArray = [
  firstNameInput,
  lastNameInput,
  birthdateInput,
  emailInput,
  quantityInput,
];

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

    case id == "quantity":
      message.innerHTML = "Veuillez saisir une donnée numérique";
      break;

    default:
      message.innerHTML =
        "Une erreure est survenue veuillez réessayer plus tard";
  }
}

function handleValueOnChange(input, type, id) {
  input.addEventListener("input", function (e) {
    console.log(e.target.value);
    var value = e.target.value;
    checkValue(input, value, type, id);
  });
}

function checkValue(input, value, type, id) {
  const isEmail = type == "email";
  const isText = type == "text";
  const isDate = type == "date";

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
  } else if (!isText) {
    var pattern = isEmail ? /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/ : /^\d+$/;
    if (value.length !== 0 && pattern.test(value)) {
      input.classList.remove("danger");
      if (input.nextElementSibling !== null) {
        input.nextElementSibling.remove();
      }
    } else {
      errorMessage(id, input);
    }
  }
}

InputsArray.map((input) => {
  handleValueOnChange(input, input.type, input.name);
});

function validate(e) {
  e.preventDefault();
  var isFormValid = true;
  if (!cguCheckedInput.checked) {
    return alert(
      "Veuillez valider les conditiions d'utilisations pour continuer"
    );
  }
  for (var input of InputsArray) {
    checkValue(input, input.value, input.type, input.name);
    if (input.value.length === 0) {
      isFormValid = false;
    }
  }
  if (isFormValid) {
    console.log("submit");
  } else {
    return console.log("no submit");
  }
}
