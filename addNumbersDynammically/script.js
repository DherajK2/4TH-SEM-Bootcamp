function addNumber() {
    const inputField = document.getElementById("number");
    const numberList = document.getElementById("numberList");
    const number = inputField.value;

    if (number) {
        const numberBox = document.createElement("div");
        numberBox.classList.add("number-box");
        numberBox.textContent = number;

        numberList.appendChild(numberBox);
        inputField.value = '';
    } else {
        alert("Please enter a number.");
    }
}

document.getElementById("addButton").addEventListener("click", addNumber);
