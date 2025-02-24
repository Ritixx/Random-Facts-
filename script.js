const FACT_API_URL = "https://uselessfacts.jsph.pl/api/v2/facts/random?language=en";

// Function to Apply Typing Effect
function typeFact(text) {
    const factElement = document.getElementById("fact");
    factElement.innerHTML = ""; // Clear previous fact
    let i = 0;
    function typeWriter() {
        if (i < text.length) {
            factElement.innerHTML += `<strong>${text.charAt(i)}</strong>`;
            i++;
            setTimeout(typeWriter, 40); // Adjust typing speed
        }
    }
    typeWriter();
}

// Function to extract a good keyword from the fact
function extractKeyword(factText) {
    // Remove common words and punctuation
    const text = factText.toLowerCase();
    const words = text.match(/\b[a-z]{4,}\b/g) || [];
    
    // Filter out common words that might not give good images
    const commonWords = ['about', 'there', 'their', 'would', 'should', 'could', 'been', 'have', 'this', 'that', 'these', 'those', 'with', 'from'];
    const filteredWords = words.filter(word => !commonWords.includes(word));
    
    // If we have words after filtering
    if (filteredWords.length > 0) {
        return filteredWords[Math.floor(Math.random() * filteredWords.length)];
    }
    
    // Fallback to any word if no good keywords found
    return words.length > 0 ? words[Math.floor(Math.random() * words.length)] : "fact";
}

// Function to update the image
function updateImage(keyword) {
    const imageElement = document.getElementById("fact-image");
    const imageContainer = document.getElementById("fact-image-container");
    
    // Add loading class
    imageElement.classList.add("image-loading");
    
    // Create a fallback timer in case the image doesn't load
    const fallbackTimer = setTimeout(() => {
        imageElement.src = `https://source.unsplash.com/800x600/?random,knowledge`;
    }, 5000);
    
    // Fetch a relevant image from Unsplash
    imageElement.src = `https://source.unsplash.com/800x600/?${keyword}`;
    
    // When the image loads
    imageElement.onload = () => {
        clearTimeout(fallbackTimer);
        imageElement.classList.remove("image-loading");
    };
    
    // If there's an error loading the image
    imageElement.onerror = () => {
        clearTimeout(fallbackTimer);
        imageElement.src = `https://source.unsplash.com/800x600/?random,knowledge`;
    };
}

// Function to Fetch a New Fact
async function getNewFact() {
    try {
        // Disable the button while loading
        const button = document.getElementById("new-fact-btn");
        button.disabled = true;
        
        const response = await fetch(FACT_API_URL);
        const data = await response.json();
        const factText = data.text;
        
        // Apply Typing Effect
        typeFact(factText);
        
        // Extract a keyword for the image
        const keyword = extractKeyword(factText);
        console.log("Keyword extracted:", keyword);
        
        // Update the image based on the keyword
        updateImage(keyword);
        
        // Re-enable the button
        setTimeout(() => {
            button.disabled = false;
        }, 1000);
        
    } catch (error) {
        console.error("Error fetching fact:", error);
        typeFact("Oops! Could not load a new fact. Try again.");
        document.getElementById("new-fact-btn").disabled = false;
    }
}

// Function to Copy Fact to Clipboard
function copyFact() {
    const factText = document.getElementById("fact").innerText;
    navigator.clipboard.writeText(factText)
        .then(() => {
            const copyBtn = document.getElementById("copy-btn");
            const originalText = copyBtn.textContent;
            copyBtn.textContent = "✓ Copied!";
            setTimeout(() => {
                copyBtn.textContent = originalText;
            }, 2000);
        })
        .catch(err => {
            console.error("Could not copy text: ", err);
            alert("Could not copy to clipboard. Please try again.");
        });
}

// Event Listeners
document.getElementById("new-fact-btn").addEventListener("click", getNewFact);
document.getElementById("copy-btn").addEventListener("click", copyFact);

// Load the first fact automatically when the page loads
window.addEventListener("DOMContentLoaded", getNewFact);
