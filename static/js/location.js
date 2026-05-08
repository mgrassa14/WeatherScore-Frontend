document.addEventListener("DOMContentLoaded", () => {
    // get form
    const form = document.querySelector("form");
    // form event listener
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        // payload to submit
        const payload = {
            city: document.getElementById("validationServer03").value,
            state: document.getElementById("validationServer04").value,
            zip_code: document.getElementById("validationServer05").value,
            // date: new Date().toISOString().split("T")[0]
            date: new Date(Date.now() - 86400000).toISOString().split("T")[0]
        };

        console.log("Submitting payload:", payload);
        // send payload to cloud funciton
        const response = await fetch("https://calculate-accuracy-700897000697.us-central1.run.app", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });
        // get results into data
        const data = await response.json();
        console.log("Cloud Function response:", data);
        // add results into sessionStorag for results.js/html to get
        if (data.results) {
            sessionStorage.setItem("results", JSON.stringify(data.results));
            window.location.href = "/results";
        } else {
            alert("Error submitting location");
        }

    });

});

