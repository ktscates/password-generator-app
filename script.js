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
      this.strengthBar = document.querySelectorAll(".strength-bar div");
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
      this.calculatePasswordStrength(password);
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
      const password = this.passwordDisplay.textContent;
      const strengthBar = this.strengthBar;
      const strength = { weaker: 0, weak: 0, medium: 0, strong: 0 };

      if (/[a-z]/.test(password)) strength.weaker++;
      if (/[A-Z]/.test(password)) strength.weak++;
      if (/\d/.test(password)) strength.medium++;
      if (/[!@#$%^&*()_+[\]{}|;:,.<>?]/.test(password)) strength.strong++;

      const totalStrength = Object.values(strength).reduce((a, b) => a + b, 0);
      console.log(totalStrength);

      strengthBar.forEach((bar, index) => {
        bar.className = "";
        bar.classList.add("strength-block"); // Reset class
        if (index < totalStrength) {
          bar.classList.add("filled");
          switch (totalStrength) {
            case 1:
              bar.classList.add("too-weak");
              break;
            case 2:
              bar.classList.add("weak");
              break;
            case 3:
              bar.classList.add("medium");
              break;
            case 4:
              bar.classList.add("strong");
              break;
          }
        }
      });

      const strengthLabel = document.querySelector(".strength h6");
      switch (totalStrength) {
        case 1:
          strengthLabel.textContent = "Too Weak";
          break;
        case 2:
          strengthLabel.textContent = "Weak";
          break;
        case 3:
          strengthLabel.textContent = "Medium";
          break;
        case 4:
          strengthLabel.textContent = "Strong";
          break;
        default:
          strengthLabel.textContent = "";
      }
    };
  }
  new PersonGenerator();
});
