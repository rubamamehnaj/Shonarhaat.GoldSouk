document.addEventListener("DOMContentLoaded", function () {
    const goldPriceElement = document.getElementById("goldPrice");

    async function fetchGoldPrice() {
        try {
            const response = await fetch("https://api.exchangerate.host/latest?base=XAU&symbols=USD");
            const data = await response.json();

            // Price per XAU (1 XAU = 31.1035 grams) in USD
            const usdPerOunce = data.rates.USD;
            const usdPerGram = usdPerOunce / 31.1035;

            const usdToBdt = 118; // adjust if needed
            const bdtPerGram = usdPerGram * usdToBdt;

            goldPriceElement.textContent = `৳ ${bdtPerGram.toFixed(2)} per gram (Live)`;
        } catch (error) {
            console.error("Gold price fetch error:", error);
            goldPriceElement.textContent = "৳ 7,500 per gram (approx)";
        }
    }

    if (goldPriceElement) {
        fetchGoldPrice();
        setInterval(fetchGoldPrice, 10 * 60 * 1000);
    }

    // Contact Form
    const inquiryForm = document.getElementById("yourFormId");
    if (inquiryForm) {
        inquiryForm.addEventListener("submit", function (e) {
            e.preventDefault();
            connect();
        });
    }

    // Payment Form
    const paymentForm = document.getElementById("paymentForm");
    const paymentMessage = document.getElementById("paymentMessage");

    if (paymentForm) {
        paymentForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const method = document.getElementById("method").value.trim();
            const number = document.getElementById("number").value.trim();
            const pin = document.getElementById("pin").value.trim();

            if (!method || !number || !pin) {
                alert("Please fill in all fields.");
                return;
            }

            paymentMessage.innerText = `Payment via ${method} successful! Thank you for purchasing from ShonarHaat.`;
            paymentForm.reset();

            setTimeout(() => {
                window.location.href = "delivery.html";
            }, 2500);
        });
    }

    // Delivery Form
    const deliveryForm = document.getElementById("deliveryForm");
    if (deliveryForm) {
        deliveryForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const address = document.getElementById("deliveryAddress").value.trim();
            const phone = document.getElementById("deliveryPhone").value.trim();
            const transactionId = document.getElementById("transactionId").value.trim();
            const otpCode = document.getElementById("otpCode").value.trim();

            if (!address || !phone || !transactionId || !otpCode) {
                alert("Please fill in all fields.");
                return;
            }

            localStorage.setItem("shonarhat_delivery_address", address);
            localStorage.setItem("shonarhat_delivery_phone", phone);
            localStorage.setItem("shonarhat_transaction_id", transactionId);
            localStorage.setItem("shonarhat_otp_code", otpCode);

            alert("Delivery details submitted successfully! We will contact you for confirmation.");
            window.location.href = "index.html";
        });
    }

    // --- NEW: Sell Gold Page Script ---
    const video = document.getElementById("video");
    const fileInput = document.getElementById("fileInput");
    const previewImg = document.getElementById("preview");
    const priceText = document.getElementById("predicted-price");

    if (video) {
        // Open camera stream
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                video.srcObject = stream;
            })
            .catch(err => {
                console.error("Camera access error:", err);
            });
    }

    if (fileInput) {
        fileInput.addEventListener("change", function (event) {
            const reader = new FileReader();
            reader.onload = function () {
                previewImg.src = reader.result;
                previewImg.style.display = "block";
            };
            reader.readAsDataURL(event.target.files[0]);
        });
    }

    window.captureImage = function () {
        if (!video) return;

        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext("2d").drawImage(video, 0, 0);

        const dataUrl = canvas.toDataURL("image/png");
        previewImg.src = dataUrl;
        previewImg.style.display = "block";
    };

    window.predictGoldPrice = function () {
        const estimated = (Math.random() * 100000).toFixed(2);
        if (priceText) {
            priceText.textContent = `Estimated Price: ৳${estimated}`;
        }
    };
});

// Contact handler
function connect() {
    const email = document.getElementById("emaddress")?.value.trim();
    const name = document.getElementById("name")?.value.trim();
    const venue = document.getElementById("venue")?.value.trim();
    const phone = document.getElementById("phonenumber")?.value.trim();
    const message = document.getElementById("messager_r")?.value.trim();

    if (!email || !name || !venue || !phone || !message) {
        alert("Please fill in all fields.");
        return;
    }

    localStorage.setItem("shonarhat_email", email);
    localStorage.setItem("shonarhat_name", name);
    localStorage.setItem("shonarhat_venue", venue);
    localStorage.setItem("shonarhat_phone", phone);
    localStorage.setItem("shonarhat_message", message);

    alert("Message sent successfully! We will contact you soon.");
    document.getElementById("yourFormId").reset();
}

// Learn More handler
function learnMore(productName) {
    const lowerName = productName.trim().toLowerCase();
    let page = "";

    if (lowerName.includes("necklace")) page = "necklace.html";
    else if (lowerName.includes("bangles")) page = "bangles.html";
    else if (lowerName.includes("earrings")) page = "earrings.html";
    else if (lowerName.includes("rings")) page = "rings.html";
    else if (lowerName.includes("head jewellery")) page = "head_jewellery.html";
    else if (lowerName.includes("chain")) page = "chain.html";
    else if (lowerName.includes("bracelet")) page = "bracelet.html";
    else if (lowerName.includes("nose pin") || lowerName.includes("nosepin")) page = "nosepin.html";
    else if (lowerName.includes("utensils")) page = "gold_utensils.html";
    else if (lowerName.includes("show pieces") || lowerName.includes("showpieces")) page = "gold_showpieces.html";
    else {
        alert(`Learn more about ${productName} coming soon!`);
        return;
    }
    window.location.href = page;
}

// Redirect for old payment button
function initiatePayment() {
    alert("Payment successful! Thank you for purchasing from ShonarHaat.");
    window.location.href = "index.html";
}

// Buy Now redirection
function buyNow(productName) {
    alert(`Thank you for choosing ${productName}. Redirecting to payment...`);
    window.location.href = "payment.html";
}
