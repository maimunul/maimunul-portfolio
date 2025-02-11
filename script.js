// Initialize Skills Radar Chart
document.addEventListener("DOMContentLoaded", () => {
  const ctx = document.getElementById("skillsRadarChart").getContext("2d");
  new Chart(ctx, {
    type: "radar",
    data: {
      labels: ["Python", "ML", "Deep Learning", "Statistics", "AWS", "MLOps"],
      datasets: [
        {
          label: "Skill Level",
          data: [95, 90, 88, 85, 50, 70],
          backgroundColor: "rgba(2, 58, 118, 0.2)",
          borderColor: "#023a76",
          pointBackgroundColor: "#023a76",
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        r: {
          beginAtZero: true,
          max: 100,
          ticks: {
            color: "#333",
            backdropColor: "transparent",
          },
          grid: { color: "rgba(0,0,0,0.1)" },
          pointLabels: { color: "#333" },
        },
      },
      plugins: {
        legend: { display: false },
      },
    },
  });

  // Initialize EmailJS with your account ID
  // (function() {
  //   emailjs.init({
  //     publicKey: "I3sOX017xkO8yxosnQ1hm", // Get this from EmailJS dashboard
  //   });
  // })();

  document
    .getElementById("contact-form")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      const submitBtn = document.getElementById("submit-btn");
      const messages = document.getElementById("form-messages");

      // Clear previous messages
      messages.innerHTML = "";
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending...";

      // Form validation (your existing code)
      const name = this.name.value.trim();
      const email = this.email.value.trim();
      const message = this.message.value.trim();

      if (!name || !email || !message) {
        showError("Please fill in all required fields");
        submitBtn.disabled = false;
        submitBtn.textContent = "Send Message";
        return;
      }

      if (!validateEmail(email)) {
        showError("Please enter a valid email address");
        submitBtn.disabled = false;
        submitBtn.textContent = "Send Message";
        return;
      }

      // Send email using EmailJS
      emailjs
        .sendForm("service_glodf1v", "template_yuz31yf", this)
        .then(() => {
          messages.innerHTML = `
          <div class="success-message">
            Message sent successfully! I'll get back to you soon.
          </div>
        `;
          this.reset();
        })
        .catch((error) => {
          messages.innerHTML = `
          <div class="error-message">
            Failed to send message. Please try again later.
          </div>
        `;
        })
        .finally(() => {
          submitBtn.disabled = false;
          submitBtn.textContent = "Send Message";
        });
    });

  // Keep your existing validateEmail and showError functions

  // function validateEmail(email) {
  //   const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   return re.test(email);
  // }

  function showError(message) {
    const errorDiv = document.createElement("div");
    errorDiv.className = "form-error";
    errorDiv.textContent = message;
    document.getElementById("contact-form").prepend(errorDiv);
  }
});
