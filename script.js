// API URL for random useful facts
const FACT_API_URL = "https://uselessfacts.jsph.pl/api/v2/facts/random?language=en";

// Function to Fetch a New Fact
async function getNewFact() {
    try {
        const response = await fetch(FACT_API_URL);
        const data = await response.json();

        // Update the fact text with the new fact
        const factElement = document.getElementById("fact");

        // Fade-out effect before updating
        factElement.style.opacity = 0;
        setTimeout(() => {
            factElement.innerText = data.text;
            factElement.style.opacity = 1;
        }, 500);
    } catch (error) {
        console.error("Error fetching fact:", error);
        document.getElementById("fact").innerText = "Oops! Could not load a new fact. Try again.";
    }
}

// Function to Copy Fact to Clipboard
function copyFact() {
    const factText = document.getElementById("fact").innerText;
    navigator.clipboard.writeText(factText).then(() => {
        alert("Fact copied to clipboard!");
    });
}

// Function to Tweet the Fact
function tweetFact() {
    const factText = document.getElementById("fact").innerText;
    const tweetURL = `https://twitter.com/intent/tweet?text=${encodeURIComponent(factText)}`;
    window.open(tweetURL, "_blank");
}

// Event Listeners
document.getElementById("new-fact-btn").addEventListener("click", getNewFact);
document.getElementById("copy-btn").addEventListener("click", copyFact);
document.getElementById("tweet-btn").addEventListener("click", tweetFact);

// Load the first fact automatically when the page loads
getNewFact();
