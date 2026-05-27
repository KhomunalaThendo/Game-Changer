// ================================
// TECHLYNK AI TRADING CHECKOUT JS
// ================================

// SELECT ELEMENTS
const checkoutBtn = document.querySelector("button");
const inputs = document.querySelectorAll("input");

// CREATE ERROR MESSAGE
function showError(message) {
    alert(message);
}

// VALIDATE EMAIL
function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// VALIDATE CARD NUMBER
function validateCardNumber(cardNumber) {
    return /^[0-9]{16}$/.test(cardNumber.replace(/\s/g, ""));
}

// VALIDATE CVV
function validateCVV(cvv) {
    return /^[0-9]{3,4}$/.test(cvv);
}

// FORMAT CARD NUMBER
const cardInput = document.querySelector('input[placeholder="Card Number"]');

cardInput.addEventListener("input", (e) => {

    let value = e.target.value.replace(/\D/g, "");

    value = value.substring(0, 16);

    const formatted = value.match(/.{1,4}/g);

    e.target.value = formatted ? formatted.join(" ") : "";
});

// FORMAT EXPIRY DATE
const expiryInput = document.querySelector('input[placeholder="MM/YY"]');

expiryInput.addEventListener("input", (e) => {

    let value = e.target.value.replace(/\D/g, "");

    if (value.length >= 3) {
        value = value.substring(0, 2) + "/" + value.substring(2, 4);
    }

    e.target.value = value;
});

// CHECKOUT BUTTON
checkoutBtn.addEventListener("click", () => {

    // GET VALUES
    const firstName = document.querySelector('input[placeholder="First Name"]').value.trim();

    const lastName = document.querySelector('input[placeholder="Last Name"]').value.trim();

    const email = document.querySelector('input[placeholder="Email Address"]').value.trim();

    const phone = document.querySelector('input[placeholder="Phone Number"]').value.trim();

    const cardName = document.querySelector('input[placeholder="Card Holder Name"]').value.trim();

    const cardNumber = document.querySelector('input[placeholder="Card Number"]').value.trim();

    const expiry = document.querySelector('input[placeholder="MM/YY"]').value.trim();

    const cvv = document.querySelector('input[placeholder="CVV"]').value.trim();

    // VALIDATION
    if (
        !firstName ||
        !lastName ||
        !email ||
        !phone ||
        !cardName ||
        !cardNumber ||
        !expiry ||
        !cvv
    ) {
        showError("Please fill in all fields.");
        return;
    }

    if (!validateEmail(email)) {
        showError("Please enter a valid email address.");
        return;
    }

    if (!validateCardNumber(cardNumber)) {
        showError("Invalid card number.");
        return;
    }

    if (!validateCVV(cvv)) {
        showError("Invalid CVV.");
        return;
    }

    // BUTTON LOADING STATE
    checkoutBtn.innerHTML = "Processing Payment...";
    checkoutBtn.disabled = true;

    // SIMULATE PAYMENT
    setTimeout(() => {

        // GENERATE LICENSE KEY
        const licenseKey =
            "TL-" +
            Math.random().toString(36).substring(2, 8).toUpperCase() +
            "-" +
            Math.random().toString(36).substring(2, 8).toUpperCase();

        // SAVE ORDER
        const order = {
            customer: {
                firstName,
                lastName,
                email,
                phone
            },

            payment: {
                cardName,
                cardNumber: "**** **** **** " + cardNumber.slice(-4)
            },

            product: "NASDAQ Sniper AI",
            amount: "$179",
            licenseKey,
            purchaseDate: new Date().toLocaleString()
        };

        // SAVE TO LOCAL STORAGE
        localStorage.setItem("techlynkOrder", JSON.stringify(order));

        // SUCCESS MESSAGE
        alert(`
Payment Successful!

Thank you for your purchase.

Your License Key:
${licenseKey}

A confirmation email will be sent to:
${email}
        `);

        // RESET FORM
        inputs.forEach(input => {
            input.value = "";
        });

        // RESET BUTTON
        checkoutBtn.innerHTML = "Complete Purchase";
        checkoutBtn.disabled = false;

        // OPTIONAL REDIRECT
        // window.location.href = "dashboard.html";

    }, 2500);

});

// ================================
// AUTO LOAD SAVED ORDER
// ================================

const savedOrder = JSON.parse(localStorage.getItem("techlynkOrder"));

if (savedOrder) {

    console.log("Previous Order Found:");
    console.log(savedOrder);

}