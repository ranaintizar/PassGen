const lengthSlider = document.querySelector(".passLength input");
const copyBtn = document.querySelector(".copyIcon");
const passLength = document.querySelector(".length");
const passInput = document.querySelector(".inputBox input");
const passIndicator = document.querySelector(".passIndicator");
const options = document.querySelectorAll(".option input");
const btn = document.querySelector(".btn");

const chars = {
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
  specialChars: "!#$%&( )*+,-./:;<>?=@[]^_`{|}~",
};

const generatePassword = () => {
  let staticPass = "";
  let randomPass = "";
  let excDuplicate = false;
  let passLength = lengthSlider.value;

  options.forEach((option) => {
    if (option.checked) {
      if (option.id !== "excDuplicate") {
        staticPass += chars[option.id];
      } else {
        excDuplicate = true;
      }
    }
  });

  for (let i = 0; i < passLength; i++) {
    let randomChar = staticPass[Math.floor(Math.random() * staticPass.length)];
    if (excDuplicate) {
      if (!randomPass.includes(randomChar)) {
        randomPass += randomChar;
      } else {
        i--;
      }
    } else {
      randomPass += randomChar;
    }
  }

  passInput.value = randomPass;
};

const updateIndicator = () => {
  passIndicator.id =
    lengthSlider.value <= 8
      ? "weak"
      : lengthSlider.value <= 16
      ? "medium"
      : "strong";
};

const updateLength = () => {
  passLength.innerText = lengthSlider.value;
  generatePassword();
  updateIndicator();
};

updateLength();

const copyPassword = () => {
  navigator.clipboard.writeText(passInput.value);
  copyBtn.innerText = "check";
  copyBtn.id = "check";

  setTimeout(() => {
    copyBtn.innerText = "copy_all";
    copyBtn.id = "copy";
  }, 1500);
};

lengthSlider.addEventListener("input", updateLength);
btn.addEventListener("click", generatePassword);
copyBtn.addEventListener("click", copyPassword);
