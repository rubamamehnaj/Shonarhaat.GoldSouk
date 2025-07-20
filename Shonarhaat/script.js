document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("yourFormId").onsubmit = function (event) {
        event.preventDefault();
        connect();
    };
});

function connect() {
    var email = document.getElementById("emaddress").value.trim();
    var name = document.getElementById("name").value.trim();
    var venue = document.getElementById("venue").value.trim();
    var phone = document.getElementById("phonenumber").value.trim();
    var message = document.getElementById("messager_r").value.trim();

    // Check for empty fields
    if (email === "" || name === "" || phone === "" || venue === "" || message === "") {
        alert("Please fill in all fields.");
        return;
    }

    // Store the values in local storage
    localStorage.setItem("emaddress", email);
    localStorage.setItem("name", name);
    localStorage.setItem("venue", venue);
    localStorage.setItem("phonenumber", phone);
    localStorage.setItem("messager_r", message);

    alert("Form submitted successfully!");
}

function learnMore(productName) {
    alert(` ${productName}`);
}