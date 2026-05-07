document.querySelector("form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const city = document.getElementById("validationServer03").value;
    const state = document.getElementById("validationServer04").value;
    const zip = document.getElementById("validationServer05").value;
    const date = new Date().toISOString().split("T")[0];

    const payload = {
        city: city,
        state: state,
        zip_code: zip,
        date: date
    };

    const response = await fetch("/submit-location", {
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
