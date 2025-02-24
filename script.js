const FACT_API_URL = "https://uselessfacts.jsph.pl/api/v2/facts/random?language=en";

// HD Background Images Based on Keywords
const keywordImages = {
    "Bangladesh": "images/bangladesh-map-hd.jpg",
    "house": "images/house-hd.jpg",
    "space": "images/space-hd.jpg",
    "ocean": "images/ocean-hd.jpg",
    "history": "images/history-hd.jpg",
    "science": "images/science-hd.jpg",
    "animal": "images/animal-hd.jpg",
    "technology": "images/technology-hd.jpg",
    "nature": "images/nature-hd.jpg",
    "sports": "images/sports-hd.jpg",
    "food": "images/food-hd.jpg",
    "music": "images/music-hd.jpg",
    "universe": "images/universe-hd.jpg",
    "mountains": "images/mountains-hd.jpg",
    "forest": "images/forest-hd.jpg",
    "art": "images/art-hd.jpg",
    "math": "images/math-hd.jpg",
    "invention": "images/invention-hd.jpg",
    "health": "images/health-hd.jpg",
    "weather": "images/weather-hd.jpg",
};

// Function to Apply Typing Effect
function typeFact(text) {
    const factElement = document.getElementById("fact");
    factElement.innerHTML = ""; // Clear previous fact

    let i = 0;
    function typeWriter() {
        if (i < text.length) {
            factElement.innerHTML += `<strong>${text.charAt(i)}</strong>`;
            i++;
            setTimeout(typeWriter, 40); // Adjust typing speed here
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

        // Determine Background Image Based on Keywords
        let bgImage = "images/default-bg-hd.jpg"; // Default image
        for (let keyword in keywordImages) {
            if (factText.toLowerCase().includes(keyword.toLowerCase())) {
                bgImage = keywordImages[keyword];
                break;
            }
        }

        document.body.style.background = `url('${bgImage}') no-repeat center center/cover`;
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

