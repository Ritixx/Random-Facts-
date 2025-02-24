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

// Function to Fetch a New Fact
async function getNewFact() {
    try {
        const response = await fetch(FACT_API_URL);
        const data = await response.json();
        const factText = data.text;

        // Apply Typing Effect
        typeFact(factText);

        // Extract a keyword for the background image
        const keywords = factText.match(/\b[A-Za-z]{4,}\b/g); // Extract words with 4+ letters
        const keyword = keywords ? keywords[Math.floor(Math.random() * keywords.length)] : "nature";

        // Fetch a relevant background image from Unsplash
        const bgImageUrl = `https://source.unsplash.com/1600x900/?${keyword}`;
        document.body.style.background = `url('${bgImageUrl}') no-repeat center center/cover`;
    } catch (error) {
        console.error("Error fetching fact:", error);
        typeFact("Oops! Could not load a new fact. Try again.");
    }
}

// Function to Copy Fact to Clipboard
function copyFact() {
    const factText = document.getElementById("fact").innerText;
    navigator.clipboard.writeText(factText).then(() => {
        alert("Fact copied to clipboard!");
    });
}

// Event Listeners
document.getElementById("new-fact-btn").addEventListener("click", getNewFact);
document.getElementById("copy-btn").addEventListener("click", copyFact);

// Load the first fact automatically when the page loads
getNewFact();

