// ... (keep previous constants and other functions)

// Improved updateImage function with multiple fallbacks
async function updateImage(keyword) {
    const imageElement = document.getElementById("fact-image");
    imageElement.classList.add("image-loading");

    // Create array of possible image sources
    const sources = [
        `https://source.unsplash.com/random/800x600/?${encodeURIComponent(keyword)}`,
        `https://loremflickr.com/800/600/${encodeURIComponent(keyword)}`,
        `https://picsum.photos/800/600?${encodeURIComponent(keyword)}`
    ];

    // Try each source until one works
    for (const source of sources) {
        try {
            const timestamp = Date.now();
            const url = `${source}&_=${timestamp}`;
            await loadImage(url);
            imageElement.src = url;
            return;
        } catch (error) {
            console.log(`Failed to load from ${source}, trying next...`);
        }
    }

    // If all fail, show default image
    imageElement.src = `https://source.unsplash.com/random/800x600/?facts,knowledge`;
    imageElement.classList.remove("image-loading");
}

function loadImage(url) {
    return new Promise((resolve, reject) => {
        const tester = new Image();
        tester.addEventListener("load", () => resolve(url));
        tester.addEventListener("error", () => reject());
        tester.src = url;
    });
}

// Enhanced keyword extraction
function extractKeyword(factText) {
    const cleaned = factText
        .replace(/[^a-zA-Z ]/g, " ")
        .toLowerCase()
        .split(" ")
        .filter(word => word.length > 3 && !stopWords.includes(word));

    return cleaned.length > 0 ? cleaned[0] : "facts";
}

const stopWords = [
    "that", "with", "this", "have", "when", "what", "which", "your", "they", "about",
    "there", "their", "could", "been", "from", "were", "will", "would", "should"
];
