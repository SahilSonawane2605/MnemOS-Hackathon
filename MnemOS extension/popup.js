document.addEventListener("DOMContentLoaded", () => {

  const dashboardButton = document.getElementById("openDashboard");

  if (dashboardButton) {
    dashboardButton.addEventListener("click", () => {
      chrome.tabs.create({
        url: "https://mnem-os-hackathon.vercel.app/"
      });
    });
  }

  const toggleButton = document.getElementById("toggleTracking");
  const statusText = document.getElementById("trackingStatus");

  chrome.storage.local.get(["trackingEnabled"], (result) => {

    const enabled = result.trackingEnabled !== false;

    updateUI(enabled);

  });

  toggleButton?.addEventListener("click", () => {

    chrome.storage.local.get(["trackingEnabled"], (result) => {

      const enabled = result.trackingEnabled !== false;

      chrome.storage.local.set({
        trackingEnabled: !enabled
      });

      updateUI(!enabled);

    });

  });

  function updateUI(enabled) {

    if (enabled) {

      statusText.textContent = "Enabled";

      toggleButton.textContent = "Pause";

      toggleButton.style.background = "#ef4444";

    } else {

      statusText.textContent = "Paused";

      toggleButton.textContent = "Resume";

      toggleButton.style.background = "#10b981";

    }
  }

});