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

    addEventListeners() {
      this.lengthInput.addEventListener(
        "input",
        this.updateLengthLabel.bind(this)
      );

      this.generateBtn.addEventListener(
        "click",
        this.generatePassword.bind(this)
      );
    }

    updateLengthLabel() {
      const lengthLabel = document.getElementById("length-label");
      lengthLabel.textContent = this.lengthInput.value;
      // console.log(this.lengthInput);
    }

    generatePassword() {
      const isUppercaseChecked = this.uppercase.checked;
      const isLowercaseChecked = this.lowercase.checked;
      const isNumbersChecked = this.numbers.checked;
      const isSymbolsChecked = this.symbols.checked;
      const passwordLength = this.lengthInput.value;

      const password = this.createPassword(
        isUppercaseChecked,
        isLowercaseChecked,
        isNumbersChecked,
        isSymbolsChecked,
        passwordLength
      );

      this.passwordDisplay.textContent = password;

      // console.log("uppercase", isUppercaseChecked);
      // console.log("lowercase", isLowercaseChecked);
      // console.log("numbers", isNumbersChecked);
      // console.log("symbols", isSymbolsChecked);
      // console.log("length", passwordLength);
    }

    createPassword(
      isUppercaseChecked,
      isLowercaseChecked,
      isNumbersChecked,
      isSymbolsChecked,
      passwordLength
    ) {
      const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      const lowercase = "abcdefghijklmnopqrstuvwxyz";
      const numbers = "0123456789";
      const symbols = "!@#$%^&*()_+[]{}|;:,.<>?";

      let character = "";
      if (isUppercaseChecked) {
        character += uppercase;
      }
      if (isLowercaseChecked) {
        character += lowercase;
      }
      if (isNumbersChecked) {
        character += numbers;
      }
      if (isSymbolsChecked) {
        character += symbols;
      }

      let password = "";
      for (let i = 0; i < passwordLength; i++) {
        password += character.charAt(
          Math.floor(Math.random() * character.length)
        );
      }
      return password;
      // console.log(password);
    }
  }
  new PersonGenerator();
});
