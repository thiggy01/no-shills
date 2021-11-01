// Initialize storage keys on extension installation.
chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.local.set({
    'cashAllowed': 3,
    'hashAllowed': 3
  })
})
