// popup.js
document.getElementById('saveButton').addEventListener('click', () => {
  const selectedLang = document.getElementById('languageSelect').value;
  chrome.storage.sync.set({ targetLanguage: selectedLang }, () => {
      alert("Language saved: " + selectedLang);
  });
});

// Set the currently selected language on popup open
document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.sync.get("targetLanguage", (data) => {
      if (chrome.runtime.lastError) {
          console.error("Error accessing storage:", chrome.runtime.lastError);
      } else if (data.targetLanguage) {
          document.getElementById('languageSelect').value = data.targetLanguage;
      }
  });
});
