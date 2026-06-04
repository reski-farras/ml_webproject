document.addEventListener("DOMContentLoaded", function () {
    // Submit Button Loading State
    const mainForm = document.getElementById("predictor-form");
    const submitButton = document.getElementById("submit-btn");

    if (mainForm && submitButton) {
        mainForm.addEventListener("submit", function () {
            submitButton.classList.add("loading");
            submitButton.innerHTML = '<i class="fa-solid fa-gear fa-spin"></i> Mengeksekusi Model FinOps...';
        });
    }

    // Auto-scroll ke hasil jika ada post request (hasil prediksi)
    const outputView = document.getElementById("output-focus");
    if (outputView) {
        setTimeout(() => {
            outputView.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 100);
    }
});