document.addEventListener("DOMContentLoaded", () => {
    // get results from sessionStorage
    const results = JSON.parse(sessionStorage.getItem("results") || "[]");
    // add results into the table in html
    results.forEach((r, index) => {
        const rank = index + 1;
        document.getElementById(`name${rank}`).textContent = r.provider;
        document.getElementById(`accuracy${rank}`).textContent = `${r.accuracy.toFixed(2)}%`;
    });
});