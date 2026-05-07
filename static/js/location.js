document.addEventListener("DOMContentLoaded", () => {

    const form = document.querySelector("form");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const payload = {
            city: document.getElementById("validationServer03").value,
            state: document.getElementById("validationServer04").value,
            zip_code: document.getElementById("validationServer05").value,
            date: new Date().toISOString().split("T")[0]
        };

        console.log("Submitting payload:", payload);

        const response = await fetch("https://calculate-accuracy-700897000697.us-central1.run.app", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (data.location_id) {
            window.location.href = `/results?location_id=${data.location_id}`;
        } else {
            alert("Error submitting location");
        }
    });

});