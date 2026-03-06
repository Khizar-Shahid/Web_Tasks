// Task: Clean and Validate University Usernames

// 1. Cleans the username according to rules
function cleanUsername(name) {
    // Must handle null/undefined/empty input safely
    if (typeof name !== 'string') {
        return '';
    }

    // Step 1: Remove leading & trailing spaces
    let cleaned = name.trim();

    // Step 2: Convert to lowercase
    cleaned = cleaned.toLowerCase();

    // Step 3: Replace multiple spaces with single underscore
    // Also handles cases like multiple spaces, space+underscore mixes, etc.
    cleaned = cleaned.replace(/\s+/g, '_');

    return cleaned;
}

// 2. Validates the cleaned username according to strict rules
function validateUsername(name) {
    // First clean the input (as per real-world usage)
    const cleaned = cleanUsername(name);

    // Rule 1: Length must be 5–20 characters
    if (cleaned.length < 5 || cleaned.length > 20) {
        return {
            isValid: false,
            reason: "Username must be between 5 and 20 characters long",
            cleaned: cleaned
        };
    }

    // Rule 2: Must start with a letter
    const firstChar = cleaned.charAt(0);
    if (!firstChar.match(/[a-z]/)) {
        return {
            isValid: false,
            reason: "Username must start with a letter",
            cleaned: cleaned
        };
    }

    // Rule 3: Only letters, numbers, and underscores allowed
    // Using regex: only a-z, 0-9, _
    if (!cleaned.match(/^[a-z0-9_]+$/)) {
        return {
            isValid: false,
            reason: "Only letters, numbers, and underscores are allowed",
            cleaned: cleaned
        };
    }

    // If all checks pass
    return {
        isValid: true,
        reason: "Valid username",
        cleaned: cleaned
    };
}

// ────────────────────────────────────────────────
// Test Cases (exactly as per your example + more edge cases)

const tests = [
    " AHmad_kHan123 ",
    "   Fatima  Noor   ",
    "123abc",                    // too short + doesn't start with letter
    "a",                        // too short
    "superlongusernamehere123", // too long (23 chars after clean)
    "ali123!@#",               // invalid characters
    "   ahmed   khan  ali  ",   // multiple spaces
    "Khan_123_456",
    "   _underscorefirst",      // starts with underscore
    "user name with spaces",    // will become user_name_with_spaces
];

// Run tests
tests.forEach(input => {
    const cleaned = cleanUsername(input);
    const result = validateUsername(input);

    console.log(`Input: "${input}"`);
    console.log(`Cleaned: ${cleaned}`);
    console.log(`Valid:   ${result.isValid}`);
    console.log(`Reason:  ${result.reason}`);
    console.log(`Final username to use: ${result.isValid ? result.cleaned : '(rejected)'}`);
    console.log("─".repeat(50));
});