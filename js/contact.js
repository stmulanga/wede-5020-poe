function submitContactForm() {

    // Get values
    const name = document.getElementById("contactName").value.trim();
    const email = document.getElementById("contactEmail").value.trim();
    const contact = document.getElementById("contactContact").value.trim();
    const message = document.getElementById("contactMessage").value.trim();

    // Error elements
    const nameErr = document.getElementById("nameErr");
    const emailErr = document.getElementById("emailErr");
    const contactErr = document.getElementById("contactErr");
    const msgErr = document.getElementById("msgErr");

    // Clear previous errors
    nameErr.textContent = "";
    emailErr.textContent = "";
    contactErr.textContent = "";
    msgErr.textContent = "";

    let isValid = true;

    // Name validation
    const nameRegex = /^[A-Za-z\s]{2,50}$/;

    if (!nameRegex.test(name)) {
        nameErr.textContent =
            " Please enter a valid name.";
        isValid = false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        emailErr.textContent =
            " Please enter a valid email.";
        isValid = false;
    }

    // Contact validation
    const contactRegex = /^[0-9]{10}$/;

    if (!contactRegex.test(contact)) {
        contactErr.textContent =
            " Enter a valid phone number.";
        isValid = false;
    }

    // Message validation
    if (message.length < 10) {
        msgErr.textContent =
            " Message must be at least 10 characters.";
        isValid = false;
    }

    // If everything passes
    if (isValid) {
        alert("Message sent successfully!");

        // Optional: clear form
        document.getElementById("contactForm").reset();
    }
}