// University Messaging Portal - Message Analyzer

// 1. Count number of words
function countWords(message) {
    if (typeof message !== 'string' || message.trim() === '') {
        return 0;
    }
    
    // Split on whitespace and filter out empty strings
    const words = message.trim().split(/\s+/);
    return words.length;
}

// 2. Count total characters (including spaces and punctuation)
function countCharacters(message) {
    if (typeof message !== 'string') {
        return 0;
    }
    return message.length;
}

// 3. Check if message contains any urgent keywords (case-insensitive)
function containsUrgent(message) {
    if (typeof message !== 'string' || message.trim() === '') {
        return false;
    }
    
    const lowerMessage = message.toLowerCase();
    const urgentKeywords = ['urgent', 'asap', 'immediately', 'important'];
    
    // Use .includes() as required
    return urgentKeywords.some(keyword => lowerMessage.includes(keyword));
}

// 4. Check if user is "shouting" (more than 70% uppercase letters)
function isShouting(message) {
    if (typeof message !== 'string' || message.trim() === '') {
        return false;
    }
    
    // Remove all non-letter characters to count only letters
    const lettersOnly = message.replace(/[^a-zA-Z]/g, '');
    
    if (lettersOnly.length === 0) {
        return false; // no letters → not shouting
    }
    
    // Count uppercase letters
    let upperCount = 0;
    for (let char of lettersOnly) {
        if (char === char.toUpperCase()) {
            upperCount++;
        }
    }
    
    const upperPercentage = (upperCount / lettersOnly.length) * 100;
    return upperPercentage > 70;
}

// ────────────────────────────────────────────────
// Combined analysis function (for easy testing & display)
function analyzeMessage(message) {
    const words = countWords(message);
    const chars = countCharacters(message);
    const hasUrgent = containsUrgent(message);
    const shouting = isShouting(message);

    console.log(`Message: "${message}"`);
    console.log(`Words: ${words}`);
    console.log(`Characters: ${chars}`);
    console.log(`Contains Urgent Word: ${hasUrgent ? 'Yes' : 'No'}`);
    console.log(`Shouting: ${shouting ? 'Yes' : 'No'}`);
    console.log("─".repeat(50));
}

// ────────────────────────────────────────────────
// Test cases (including your example)

const testMessages = [
    "Sir I submitted the Assignment today!!!",
    "URGENT: Please check my assignment ASAP!!!",
    "hello sir, i have a question",
    "THIS IS VERY IMPORTANT I NEED REPLY IMMEDIATELY",
    "project due tomorrow",
    "EXAM TOMORROW!!!!!! STUDYING HARD RIGHT NOW",
    "   ",                               // empty
    "ok",                               // very short
    "IMPORTANT assignment submission done"
];

// Run all tests
testMessages.forEach(msg => {
    analyzeMessage(msg);
});