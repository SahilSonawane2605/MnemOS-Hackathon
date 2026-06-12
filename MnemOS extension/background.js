let activeTabId = null;
let activeUrl = null;
let activeTitle = null;
let startTime = null;
const TRACKING_THRESHOLD = 10000; // 10 seconds in milliseconds

// Blacklist to protect user privacy
const BLACKLIST = [
  'localhost', 'banking', 'paypal', 'checkout', 'login', 'signin', 
  'password', 'accounts.google', 'incognito', 'bank'
];

function isBlacklisted(url) {
  if (!url) return true;
  return BLACKLIST.some(keyword => url.toLowerCase().includes(keyword));
}

function checkAndLogTime() {
  if (startTime && activeUrl && !isBlacklisted(activeUrl)) {
    const duration = Date.now() - startTime;
    
    // Only log if user spent more than 10 seconds on the page
    if (duration >= TRACKING_THRESHOLD) {
      const telemetryData = {
        url: activeUrl,
        title: activeTitle,
        timestamp: new Date().toISOString(),
        duration_seconds: Math.round(duration / 1000)
      };

      fetch("https://mnemos-hackathon.onrender.com/api/memories", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(telemetryData)
})
.then(res => res.json())
.then(data => {
  console.log("✅ Memory Stored", data);
})
.catch(err => {
  console.error("❌ Failed to store memory", err);
});
      
      // HACKATHON STEP 3 NOTE: 
      // Member 3 will replace this console.log with a fetch() POST request 
      // to send 'telemetryData' straight to your Supabase/Lovable database.
    }
  }
}

// Track when a user switches tabs
chrome.tabs.onActivated.addListener(activeInfo => {
  checkAndLogTime();
  chrome.tabs.get(activeInfo.tabId, (tab) => {
    if (chrome.runtime.lastError || !tab) return;
    activeTabId = tab.id;
    activeUrl = tab.url;
    activeTitle = tab.title;
    startTime = Date.now();
  });
});

// Track when a tab changes its URL (e.g., clicking a link on the same tab)
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tabId === activeTabId && changeInfo.status === 'complete') {
    checkAndLogTime();
    activeUrl = tab.url;
    activeTitle = tab.title;
    startTime = Date.now();
  }
});

// Track when browser window loses focus or closes
chrome.windows.onFocusChanged.addListener(windowId => {
  if (windowId === chrome.windows.WINDOW_ID_NONE) {
    checkAndLogTime();
    startTime = null;
  } else {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        checkAndLogTime();
        activeTabId = tabs[0].id;
        activeUrl = tabs[0].url;
        activeTitle = tabs[0].title;
        startTime = Date.now();
      }
    });
  }
});