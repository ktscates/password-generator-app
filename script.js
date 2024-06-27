document.addEventListener("DOMContentLoaded", () => {
  class PersonGenerator {
    constructor() {
      this.passwordDisplay = document.getElementById("password");
      this.copyIcon = document.getElementById("copy-icon");
      this.lengthInput = document.querySelector('input[type="range"]');
      this.uppercase = document.querySelector('input[value="uppercase"]');
      this.lowercase = document.querySelector('input[value="lowercase"]');
      this.numbers = document.querySelector('input[value="numbers"]');
      this.symbols = document.querySelector('input[value="symbols"]');
      this.strengthBar = document.querySelectorAll("strength-bar div");
      this.generateBtn = document.querySelector(".generate-btn");

      this.addEventListeners();
    }

    addEventListeners = () => {
      this.lengthInput.addEventListener(
        "input",
        this.updateLengthLabel.bind(this)
      );

      this.generateBtn.addEventListener(
        "click",
        this.generatePassword.bind(this)
      );

      this.copyIcon.addEventListener("click", this.copyToClipboard.bind(this));
    };

    updateLengthLabel = () => {
      const lengthLabel = document.getElementById("length-label");
      lengthLabel.textContent = this.lengthInput.value;
    };

    generatePassword = () => {
      const { uppercase, lowercase, numbers, symbols, lengthInput } = this;

      const passwordLength = lengthInput.value;

      const password = this.createPassword(
        uppercase.checked,
        lowercase.checked,
        numbers.checked,
        symbols.checked,
        passwordLength
      );

      this.passwordDisplay.textContent = `${password}`;
    };

    createPassword = (
      isUppercaseChecked = false,
      isLowercaseChecked = false,
      isNumbersChecked = false,
      isSymbolsChecked = false,
      passwordLength = 10
    ) => {
      const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      const lowercase = "abcdefghijklmnopqrstuvwxyz";
      const numbers = "0123456789";
      const symbols = "!@#$%^&*()_+[]{}|;:,.<>?";

      let character = "";
      if (isUppercaseChecked) character += uppercase;
      if (isLowercaseChecked) character += lowercase;
      if (isNumbersChecked) character += numbers;
      if (isSymbolsChecked) character += symbols;

      let password = "";
      for (let i = 0; i < passwordLength; i++) {
        password += character.charAt(
          Math.floor(Math.random() * character.length)
        );
      }
      return password;
    };

    copyToClipboard = () => {
      const password = this.passwordDisplay.textContent;
      navigator.clipboard.writeText(password);
      alert("Password copied to clipboard!");
    };

    calculatePasswordStrength = () => {
      const strengthBar = this.strengthBar;
      const strength = { weaker: 0, weak: 0, medium: 0, strong: 0 };

      if (/[a-z]/.test(password)) strength.weaker++;
      if (/[A-Z]/.test(password)) strength.weak++;
      if (/\d/.test(password)) strength.medium++;
      if (/[!@#$%^&*()_+[\]{}|;:,.<>?]/.test(password)) strength.strong++;

      const totalStrength = Object.values(strength).reduce((a, b) => a + b);

      strengthBar.forEach((bar, index) => {
        if (index < totalStrength) {
          bar.classList.add("filled");
        } else {
          bar.classList.remove("filled");
        }
      });
    };
  }
  new PersonGenerator();
});
