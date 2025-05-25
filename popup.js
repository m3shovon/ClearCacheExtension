document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("clean").addEventListener("click", async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    if (!tab?.url) return;

    const url = new URL(tab.url);
    const domain = url.hostname;

    chrome.browsingData.remove({
      origins: [`https://${domain}`, `http://${domain}`]
    }, {
      "cache": true,
      "cookies": true,
      "localStorage": true,
      "indexedDB": true
    }, () => {
      document.getElementById("status").textContent = `Cleared data for ${domain}`;
    });
  });
});
