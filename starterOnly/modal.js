// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeModalBtn = document.querySelectorAll(".close");
const submitedError = document.getElementsByClassName("submited_error");

// inputs
const firstNameInput = document.getElementsByName("first")[0];
const lastNameInput = document.getElementsByName("last")[0];
const emailInput = document.getElementsByName("email")[0];
const quantityInput = document.getElementsByName("quantity")[0];
const birthdateInput = document.getElementById("birthdate");
const cguCheckedInput = document.getElementById("checkbox1");
const newsCheckedInput = document.getElementById("checkbox2");

// radio buttons
const radioBtns = document.getElementsByName("location");

//form
const formContainer = document.getElementsByTagName("form");
const successContainer = document.getElementsByClassName("modal-success");

const InputsArray = [
  firstNameInput,
  lastNameInput,
  birthdateInput,
  emailInput,
  quantityInput,
];

// object formField maintain each value in validation process
var formField = {
  first: null,
  last: null,
  email: null,
  birthdate: null,
  quantity: null,
  city: null,
  isCguChecked: false,
  newsletter: false,
};

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

//close modal event
closeModalBtn.forEach((btn) => btn.addEventListener("click", closeModal));

// edit nav
function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

function closeModal() {
  modalbg.style.display = "none";
}

// insert error message after each field in case of bad value
function insertAfter(newNode, referenceNode) {
  referenceNode.parentNode.insertBefore(
    newNode,
    referenceNode.nextElementSibling
  );
}

// switch case to attribute the right error message depend on fields
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

//listen input value to check value each time it changed
function handleValueOnChange(input, type, id) {
  input.addEventListener("input", function (e) {
    var value = e.target.value;
    formField[id] = e.target.value;
    checkFieldValue(input, value, type, id);
  });
}

//handle each field to check if its fit the right Regex or condition
function checkFieldValue(input, value, type, id) {
  const isEmail = type == "email";
  const isText = type == "text";
  const isDate = type == "date";

  if (isText || isDate) {
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

//listen cgu value to check value if it checked or not
function handleCguChecked() {
  cguCheckedInput.addEventListener("click", function () {
    isCguChecked();
  });
}

//handle cgu value to check value if it checked or not
function isCguChecked() {
  if (cguCheckedInput.checked) {
    submitedError[1].style.display = "none";
    formField.isCguChecked = true;
  } else {
    submitedError[1].style.display = "block";
    formField.isCguChecked = false;
  }
}

//handle if at least one radio is selected
function isRadioChecked() {
  var radioChecked = false;
  for (var radio of radioBtns) {
    if (radio.checked) {
      radioChecked = true;
      formField.city = radio.value;
    }
  }

  if (radioChecked) {
    submitedError[0].style.display = "none";
  } else {
    submitedError[0].style.display = "block";
  }
}

//map over each input to apply the same function
InputsArray.map((input) => {
  handleValueOnChange(input, input.type, input.name);
});
handleCguChecked();

// submitted value
function validate(e) {
  e.preventDefault();

  for (var input of InputsArray) {
    checkFieldValue(input, input.value, input.type, input.name);
  }

  isRadioChecked();
  isCguChecked();

  // facultative newsletter field
  if (newsCheckedInput.checked) {
    formField.newsletter = true;
  }

  // if at least one field has error, return this function
  for (let [key, value] of Object.entries(formField)) {
    if (value == null || value.length == 0) {
      return;
    }
  }

  // final validation
  if (formField.isCguChecked) {
    formContainer[0].classList.add("hidden");
    successContainer[0].style.display = "flex";
    return;
  } else {
    return;
  }
}
