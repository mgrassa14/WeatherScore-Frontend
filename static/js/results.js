document.addEventListener("DOMContentLoaded", async () => {
    const params = new URLSearchParams(window.location.search);
    const location_id = params.get("location_id");

    if (!location_id) return;

    const response = await fetch(`/api/results?location_id=${location_id}`);
    const data = await response.json();

    if (!data.results || data.results.length === 0) return;

    // Loop through results and fill table cells
    data.results.forEach((r, index) => {
        const rank = index + 1;

        const nameEl = document.getElementById(`name${rank}`);
        const accuracyEl = document.getElementById(`accuracy${rank}`);

        if (nameEl) nameEl.textContent = r.provider;
        if (accuracyEl) accuracyEl.textContent = `${r.accuracy.toFixed(2)}%`;
    });
});