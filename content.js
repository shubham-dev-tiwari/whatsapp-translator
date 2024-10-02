// content.js

const apiKey = "add_your_api_key"; // API Key

async function translateText(text, targetLang) {
    const url = `https://api.apilayer.com/language_translation/translate?text=${encodeURIComponent(text)}&target=${targetLang}`;

    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "apikey": apiKey
        }
    });

    if (response.ok) {
        const data = await response.json();
        return data.translatedText; // Extract translated text
    } else {
        console.error("Translation API error:", response.statusText);
        return text; // Fallback to original text
    }
}

async function observeMessages() {
    const chatList = document.querySelector("div[class*='copyable-text']");

    if (!chatList) {
        console.error("Chat list not found");
        return;
    }

    const config = { childList: true, subtree: true };

    const callback = async (mutationsList) => {
        for (const mutation of mutationsList) {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach(async (node) => {
                    const messageTextElement = node.querySelector("span.selectable-text");

                    if (messageTextElement) {
                        const originalText = messageTextElement.innerText;

                        chrome.storage.sync.get("targetLanguage", async (data) => {
                            const targetLang = data.targetLanguage || 'es'; // Default to Spanish if not set
                            const translatedText = await translateText(originalText, targetLang);
                            const translationElement = document.createElement("span");
                            translationElement.innerText = translatedText;
                            translationElement.style.color = "#a6e3a1"; // Catppuccin color
                            translationElement.style.fontWeight = "bold";
                            translationElement.style.display = "block"; // Display as block for better visibility
                            messageTextElement.appendChild(translationElement);
                        });
                    }
                });
            }
        }
    };

    const observer = new MutationObserver(callback);
    observer.observe(chatList, config);
}

// Start observing messages
observeMessages();
