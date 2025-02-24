// Function to extract a good keyword from the fact
function extractKeyword(factText) {
    // Remove quotes and special characters
    const cleanText = factText.replace(/[“”"‘’'.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
    
    // Get meaningful words
    const words = cleanText.match(/\b[a-z]{4,}\b/gi) || [];
    
    // Weighted words (prioritize nouns)
    const priorityWords = words.filter(word => {
        const lowerWord = word.toLowerCase();
        return !/[ing|ed|s|tion]$/.test(lowerWord) && 
               word.length > 4 &&
               !['that','with','this','have','when','what','which'].includes(lowerWord);
    }).slice(0, 3); // Take first 3 good candidates

    return priorityWords.length > 0 
        ? priorityWords[Math.floor(Math.random() * priorityWords.length)].toLowerCase()
        : 'knowledge';
}
