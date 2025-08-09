const passwordInput = document.querySelector(".password");
const copyBtn = document.querySelector(".copy");
const lengthInput = document.querySelector(".length-input");
const lengthValue = document.getElementById("length-value");
const generateBtn = document.querySelector(".generate");
const lowercaseCheckbox = document.getElementById("lowercase");
const uppercaseCheckbox = document.getElementById("uppercase");
const numbersCheckbox = document.getElementById("numbers");
const symbolsCheckbox = document.getElementById("symbols");
const strengthIndicator = document.querySelector(".strength-indicator");

const characters = {
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
  symbols: "~!@#$%^&*()_+=-",
};

// Update password length display
lengthInput.addEventListener("input", () => {
  lengthValue.textContent = lengthInput.value;
});

// Function to generate a password
function generatePassword() {
  let allChars = "";
  let generatedPassword = "";

  if (lowercaseCheckbox.checked) allChars += characters.lowercase;
  if (uppercaseCheckbox.checked) allChars += characters.uppercase;
  if (numbersCheckbox.checked) allChars += characters.numbers;
  if (symbolsCheckbox.checked) allChars += characters.symbols;

  // Handle case where no options are selected
  if (allChars === "") {
    passwordInput.value = "اختر خيارًا واحدًا على الأقل";
    return;
  }

  // Ensure at least one character from each selected category is included
  if (lowercaseCheckbox.checked) {
    generatedPassword +=
      characters.lowercase[
        Math.floor(Math.random() * characters.lowercase.length)
      ];
  }
  if (uppercaseCheckbox.checked) {
    generatedPassword +=
      characters.uppercase[
        Math.floor(Math.random() * characters.uppercase.length)
      ];
  }
  if (numbersCheckbox.checked) {
    generatedPassword +=
      characters.numbers[Math.floor(Math.random() * characters.numbers.length)];
  }
  if (symbolsCheckbox.checked) {
    generatedPassword +=
      characters.symbols[Math.floor(Math.random() * characters.symbols.length)];
  }

  // Fill the rest of the password length
  const passwordLength = lengthInput.value;
  for (let i = generatedPassword.length; i < passwordLength; i++) {
    generatedPassword += allChars[Math.floor(Math.random() * allChars.length)];
  }

  // Shuffle the password to randomize the order
  passwordInput.value = shufflePassword(generatedPassword);
  updateStrengthIndicator(passwordInput.value);
}

// Fisher-Yates shuffle algorithm for better randomness
function shufflePassword(password) {
  const arr = password.split("");
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.join("");
}

// Update strength indicator
function updateStrengthIndicator(password) {
  let score = 0;
  const length = password.length;
  const hasLowercase = /[a-z]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumbers = /[0-9]/.test(password);
  const hasSymbols = /[^a-zA-Z0-9]/.test(password);

  if (length > 8) score++;
  if (length > 12) score++;
  if (hasLowercase) score++;
  if (hasUppercase) score++;
  if (hasNumbers) score++;
  if (hasSymbols) score++;

  strengthIndicator.style.width = (score / 6) * 100 + "%";

  strengthIndicator.classList.remove("weak", "medium", "strong");
  if (score < 3) {
    strengthIndicator.classList.add("weak");
  } else if (score < 5) {
    strengthIndicator.classList.add("medium");
  } else {
    strengthIndicator.classList.add("strong");
  }
}

// Event listeners
generateBtn.addEventListener("click", generatePassword);

copyBtn.addEventListener("click", () => {
  passwordInput.select();
  document.execCommand("copy");
});

// Initial password generation on load
generatePassword();
