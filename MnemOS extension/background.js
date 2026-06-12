let activeTabId = null;
let activeUrl = null;
let activeTitle = null;
let startTime = null;

const TRACKING_THRESHOLD = 10000; // 10 seconds

// Privacy Protection
const BLACKLIST = [
"localhost",
"banking",
"paypal",
"checkout",
"login",
"signin",
"password",
"accounts.google",
"incognito",
"bank"
];

function isBlacklisted(url) {
if (!url) return true;

return BLACKLIST.some(keyword =>
url.toLowerCase().includes(keyword)
);
}

function sendMemory(duration) {

chrome.storage.local.get(["trackingEnabled"], (result) => {

```
const trackingEnabled =
  result.trackingEnabled !== false;

if (!trackingEnabled) {
  console.log("⏸ Tracking Paused");
  return;
}

const telemetryData = {
  url: activeUrl,
  title: activeTitle,
  timestamp: new Date().toISOString(),
  duration_seconds: Math.round(duration / 1000)
};

fetch(
  "https://mnemos-hackathon.onrender.com/api/memories",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(telemetryData)
  }
)
  .then(res => res.json())
  .then(data => {
    console.log("✅ Memory Stored", data);
  })
  .catch(err => {
    console.error(
      "❌ Failed to store memory",
      err
    );
  });
```

});

}

function checkAndLogTime() {

if (
!startTime ||
!activeUrl ||
isBlacklisted(activeUrl)
) {
return;
}

const duration =
Date.now() - startTime;

if (duration >= TRACKING_THRESHOLD) {
sendMemory(duration);
}
}

// Track tab switching
chrome.tabs.onActivated.addListener(
activeInfo => {

```
checkAndLogTime();

chrome.tabs.get(
  activeInfo.tabId,
  tab => {

    if (
      chrome.runtime.lastError ||
      !tab
    ) {
      return;
    }

    activeTabId = tab.id;
    activeUrl = tab.url;
    activeTitle = tab.title;
    startTime = Date.now();

  }
);
```

}
);

// Track URL changes
chrome.tabs.onUpdated.addListener(
(tabId, changeInfo, tab) => {

```
if (
  tabId === activeTabId &&
  changeInfo.status === "complete"
) {

  checkAndLogTime();

  activeUrl = tab.url;
  activeTitle = tab.title;
  startTime = Date.now();

}
```

}
);

// Track window focus changes
chrome.windows.onFocusChanged.addListener(
windowId => {

```
if (
  windowId ===
  chrome.windows.WINDOW_ID_NONE
) {

  checkAndLogTime();
  startTime = null;

} else {

  chrome.tabs.query(
    {
      active: true,
      currentWindow: true
    },
    tabs => {

      if (tabs[0]) {

        checkAndLogTime();

        activeTabId = tabs[0].id;
        activeUrl = tabs[0].url;
        activeTitle = tabs[0].title;
        startTime = Date.now();

      }

    }
  );

}
```

}
);

// First-time setup
chrome.runtime.onInstalled.addListener(() => {

chrome.storage.local.get(
["trackingEnabled"],
result => {

```
  if (
    result.trackingEnabled ===
    undefined
  ) {

    chrome.storage.local.set({
      trackingEnabled: true
    });

  }

}
```

});

});
