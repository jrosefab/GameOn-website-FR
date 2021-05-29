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

// add error message at DdOM
function insertAfter(newNode, referenceNode) {
  referenceNode.parentNode.insertBefore(
    newNode,
    referenceNode.nextElementSibling
  );
}

// config error message
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

//handler on listner
function handleValueOnChange(input, type, id) {
  input.addEventListener("input", function (e) {
    var value = e.target.value;
    formField[id] = e.target.value;
    checkFieldValue(input, value, type, id);
  });
}

function handleCguChecked() {
  cguCheckedInput.addEventListener("click", function () {
    isCguChecked();
  });
}

// checking function
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

function isCguChecked() {
  if (cguCheckedInput.checked) {
    submitedError[1].classList.add("hidden");
    formField.isCguChecked = true;
  } else {
    submitedError[1].classList.remove("hidden");
    formField.isCguChecked = false;
  }
}

function isRadioChecked() {
  var radioChecked = false;

  for (var radio of radioBtns) {
    if (radio.checked) {
      radioChecked = true;
      formField.city = radio.value;
    }
  }

  if (radioChecked) {
    submitedError[0].classList.add("hidden");
  } else {
    submitedError[0].classList.remove("hidden");
  }
}

// function trigger
InputsArray.map((input) => {
  handleValueOnChange(input, input.type, input.name);
});
handleCguChecked();

// on form submit
function validate(e) {
  e.preventDefault();

  for (var input of InputsArray) {
    checkFieldValue(input, input.value, input.type, input.name);
  }

  isRadioChecked();
  isCguChecked();

  // factulative field
  if (newsCheckedInput.checked) {
    formField.newsletter = true;
  }

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
