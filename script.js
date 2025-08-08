document.addEventListener("DOMContentLoaded", async () => {
  const API_URL = "https://form-backend-me7c.onrender.com/api/form/forms";

  try {
    const res = await fetch(API_URL);
    const forms = await res.json();

    // Populate table
    const tableBody = document.querySelector("#messagesTable tbody");
    forms.forEach((form) => {
      const row = `
        <tr>
          <td>${form.name}</td>
          <td>${form.email}</td>
          <td>${form.message}</td>
          <td>${new Date(form.createdAt).toLocaleString()}</td>
        </tr>
      `;
      tableBody.insertAdjacentHTML("beforeend", row);
    });

    // Prepare chart data
    const countsByDate = {};
    forms.forEach((form) => {
      const date = new Date(form.createdAt).toLocaleDateString();
      countsByDate[date] = (countsByDate[date] || 0) + 1;
    });

    const labels = Object.keys(countsByDate);
    const data = Object.values(countsByDate);

    // Create Chart.js chart
    new Chart(document.getElementById("submissionsChart"), {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "Submissions per Day",
            data,
            borderColor: "#dc3545",
            backgroundColor: "rgba(220, 53, 69, 0.3)",
            tension: 0.3,
            fill: true,
            pointBackgroundColor: "#dc3545",
            pointRadius: 4,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: true },
        },
        scales: {
          y: { beginAtZero: true },
        },
      },
    });
  } catch (error) {
    console.error("Error loading dashboard data:", error);
  }
});
