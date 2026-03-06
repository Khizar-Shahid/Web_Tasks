// Function to check password strength
function checkPassword(password) {
    // Handle invalid/empty input
    if (typeof password !== 'string' || password === '') {
        return "Weak";
    }

    let score = 0;

    // 1. Length ≥ 8
    if (password.length >= 8) {
        score++;
    }

    // 2. At least 1 uppercase letter
    if (/[A-Z]/.test(password)) {
        score++;
    }

    // 3. At least 1 lowercase letter
    if (/[a-z]/.test(password)) {
        score++;
    }

    // 4. At least 1 number
    if (/\d/.test(password)) {
        score++;
    }

    // 5. At least 1 special character from: @ # $ %
    // Using .some() + .includes() as required
    const specialChars = ['@', '#', '$', '%'];
    const hasSpecial = specialChars.some(char => password.includes(char));
    if (hasSpecial) {
        score++;
    }

    // Determine strength based on how many conditions are met
    if (score === 5) {
        return "Strong";
    } else if (score >= 3) {
        return "Medium";
    } else {
        return "Weak";
    }
}

// ────────────────────────────────────────────────
// Test cases (with expected strength)

const testPasswords = [
    "abc",                    // Weak (too short, missing many)
    "password123",            // Medium (length ok, lower, number)
    "Password123",            // Medium (length, upper, lower, number)
    "Pass123!",               // Medium (has ! but ! not in allowed list)
    "Pass@123",               // Strong (all 5 conditions)
    "abcDEF123$",             // Strong
    "hello123#",              // Medium (no uppercase)
    "HELLO@123",              // Medium (no lowercase)
    "Abcd1234",               // Medium (no special from allowed set)
    "Ab#12",                  // Weak (too short)
    "P@ssw0rd%",              // Strong
    "",                       // Weak
    "        ",               // Weak
];

// Run tests
testPasswords.forEach(pwd => {
    const strength = checkPassword(pwd);
    console.log(`Password: "${pwd}" → ${strength}`);
});