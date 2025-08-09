document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  const messageDiv = document.getElementById("message");

  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      messageDiv.textContent = "Logging in...";
      messageDiv.style.color = "#333";

      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;

      try {
        const response = await fetch(
          "https://form-backend-me7c.onrender.com/api/admin/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
          }
        );

        const data = await response.json();

        if (response.ok) {
          messageDiv.textContent = "Login successful! Redirecting...";
          messageDiv.style.color = "green";
          // === CHANGE THIS LINE ===
          window.location.href = "dashboard.html";
        } else {
          messageDiv.textContent =
            data.message || "Invalid username or password.";
          messageDiv.style.color = "red";
        }
      } catch (error) {
        messageDiv.textContent = "Network error. Please try again.";
        messageDiv.style.color = "red";
        console.error("Login error:", error);
      }
    });
  }
});
