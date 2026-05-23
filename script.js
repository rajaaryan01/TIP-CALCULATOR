const billInput = document.getElementById("bill");
const peopleInput = document.getElementById("people");
const customTipInput = document.getElementById("customTip");

const tipButtons = document.querySelectorAll(".tip-btn");

const tipAmountText = document.getElementById("tipAmount");
const grandTotalText = document.getElementById("grandTotal");
const perPersonText = document.getElementById("perPerson");

const billError = document.getElementById("billError");
const peopleError = document.getElementById("peopleError");
const tipError = document.getElementById("tipError");

const resetBtn = document.getElementById("resetBtn");

let selectedTip = 10;

function validateInputs(bill, people, tip) {

  let valid = true;


  if (bill <= 0 || bill === "") {
    billError.textContent = "Enter a valid bill amount";
    valid = false;
  } else {
    billError.textContent = "";
  }


  if (people < 1 || people === "") {
    peopleError.textContent = "People must be at least 1";
    valid = false;
  } else {
    peopleError.textContent = "";
  }


  if (tip < 0 || tip > 100) {
    tipError.textContent = "Tip must be between 0 and 100";
    valid = false;
  } else {
    tipError.textContent = "";
  }

  return valid;
}

function calculateTip() {

  const bill = Number(billInput.value);
  const people = Number(peopleInput.value);

  const customTip = customTipInput.value;

  const tip =
    customTip !== ""
      ? Number(customTip)
      : selectedTip;

  const isValid = validateInputs(
    bill,
    people,
    tip
  );

  if (!isValid) {

    tipAmountText.textContent = "Rs 0.00";
    grandTotalText.textContent = "Rs 0.00";
    perPersonText.textContent = "Rs 0.00";

    return;
  }

  const tipAmount =
    (bill * tip) / 100;

  const grandTotal =
    bill + tipAmount;

  const perPerson =
    grandTotal / people;

  tipAmountText.textContent =
    `Rs ${tipAmount.toFixed(2)}`;

  grandTotalText.textContent =
    `Rs ${grandTotal.toFixed(2)}`;

  perPersonText.textContent =
    `Rs ${perPerson.toFixed(2)}`;
}

// Live Input Events

billInput.addEventListener(
  "input",
  calculateTip
);

peopleInput.addEventListener(
  "input",
  calculateTip
);

customTipInput.addEventListener(
  "input",
  () => {

    tipButtons.forEach((btn) => {
      btn.classList.remove("active");
    });

    calculateTip();
  }
);

// Tip Buttons

tipButtons.forEach((button) => {

  button.addEventListener(
    "click",
    () => {

      customTipInput.value = "";

      tipButtons.forEach((btn) => {
        btn.classList.remove("active");
      });

      button.classList.add("active");

      selectedTip =
        Number(button.dataset.tip);

      calculateTip();
    }
  );

});

// Reset Button

resetBtn.addEventListener(
  "click",
  () => {

    billInput.value = "";
    peopleInput.value = "";
    customTipInput.value = "";

    selectedTip = 10;

    tipButtons.forEach((btn) => {
      btn.classList.remove("active");
    });

    tipButtons[0].classList.add("active");

    billError.textContent = "";
    peopleError.textContent = "";
    tipError.textContent = "";

    tipAmountText.textContent = "Rs 0.00";
    grandTotalText.textContent = "Rs 0.00";
    perPersonText.textContent = "Rs 0.00";

  }
);