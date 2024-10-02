// background.js
console.log("Background service worker running.");

// Listen for changes in the storage
chrome.storage.onChanged.addListener((changes, area) => {
    if (area === 'sync') {
        if (changes.targetLanguage) {
            console.log('Target language changed:', changes.targetLanguage.newValue);
        }
    }
});
