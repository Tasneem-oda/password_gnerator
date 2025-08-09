let passwordEle = document.querySelector(".password");
let passwordLengthSpan = document.querySelector(".password-lenght span");
let lengthInput = document.querySelector(".length-input");
let numberEle = document.getElementById("numbers");
let lowerEle = document.getElementById("lowercase");
let upperEle = document.getElementById("uppercase");
let symbolEle = document.getElementById("symbols");
let generateBtn = document.querySelector(".generat");
let copyBtn = document.querySelector(".copy");
let checkboxes = document.querySelectorAll(".options input");

let numbers = "1234567890";
let upperLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let lowerLetters = "abcdefghijklmnopqrstuvwxyz";
let symbols = "~!@#$%^&*()_+=-";

passwordLengthSpan.textContent = lengthInput.value;

lengthInput.addEventListener("input", function () {
  passwordLengthSpan.textContent = lengthInput.value;
});

function getRandomCharacterFromPool(pool) {
  return pool[Math.floor(Math.random() * pool.length)];
}

function generatePassword() {
  let password = "";
  let pool = "";

  if (numberEle.checked) {
    pool += numbers;
  }
  if (lowerEle.checked) {
    pool += lowerLetters;
  }
  if (upperEle.checked) {
    pool += upperLetters;
  }
  if (symbolEle.checked) {
    pool += symbols;
  }

  if (pool === "") {
    alert("Please select at least one character type.");
    return;
  }

  for (let i = 0; i < lengthInput.value; i++) {
    password += getRandomCharacterFromPool(pool);
  }

  return password;
}

generateBtn.addEventListener("click", function () {
  let password = generatePassword();
  if (password) {
    passwordEle.textContent = password;
  }
});

copyBtn.addEventListener("click", function () {
  const textarea = document.createElement("textarea");
  textarea.value = passwordEle.textContent;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
  alert("Password copied to clipboard!");
});
