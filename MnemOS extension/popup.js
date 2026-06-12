document.addEventListener("DOMContentLoaded", () => {

  const dashboardButton = document.getElementById("openDashboard");

  if (dashboardButton) {
    dashboardButton.addEventListener("click", () => {
      chrome.tabs.create({
        url: "https://mnem-os-hackathon.vercel.app/"
      });
    });
  }

});