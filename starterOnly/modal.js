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

function isInputValid(input, type) {
  const isEmail = type == "email";

  input.addEventListener("input", function (e) {
    var value = e.target.value;
    if (type == "text") {
      if (value.length < 2) {
        input.classList.add("danger");
      } else {
        input.classList.remove("danger");
      }
    } else if (type !== "text") {
      var pattern = isEmail ? /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/ : /^\d+$/;
      if (pattern.test(value)) {
        input.classList.remove("danger");
      } else {
        input.classList.add("danger");
      }
    }
  });
}

isInputValid(firstNameInput, "text");
isInputValid(lastNameInput, "text");
isInputValid(emailInput, "email");
isInputValid(quantityInput, "number");

function validate(e) {
  e.preventDefault();
  if (!cguCheckedInput.checked) {
    alert("yo tu dois sélectionner le truc");
  }
}

console.log(cguCheckedInput.checked);
