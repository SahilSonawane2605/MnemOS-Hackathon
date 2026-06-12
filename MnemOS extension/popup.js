document.addEventListener("DOMContentLoaded", () => {

  const dashboardButton = document.getElementById("openDashboard");

  if (dashboardButton) {
    dashboardButton.addEventListener("click", () => {
      chrome.tabs.create({
        url: "http://localhost:5173/"
      });
    });
  }

});