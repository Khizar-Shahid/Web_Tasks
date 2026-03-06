// University Email Generator

// 1. Get department initials (first letter of each word, uppercase)
function getInitials(department) {
    if (typeof department !== 'string' || department.trim() === '') {
        return '';
    }

    // Split into words, take first character of each, uppercase, join
    const words = department.trim().split(/\s+/);
    
    const initials = words
        .map(word => word.charAt(0).toUpperCase())
        .join('');

    return initials;
}

// 2. Generate full university email
function generateEmail(fullName, department) {
    // Input validation
    if (typeof fullName !== 'string' || fullName.trim() === '') {
        return {
            success: false,
            email: '',
            message: 'Full name is required'
        };
    }
    if (typeof department !== 'string' || department.trim() === '') {
        return {
            success: false,
            email: '',
            message: 'Department is required'
        };
    }

    // Step 1: Clean and split full name
    const cleanedName = fullName.trim();
    const nameParts = cleanedName.split(/\s+/);

    if (nameParts.length < 2) {
        return {
            success: false,
            email: '',
            message: 'Full name must contain at least first and last name'
        };
    }

    // Step 2: Get first word and last word (lowercase)
    const firstWord = nameParts[0].toLowerCase();
    const lastWord  = nameParts[nameParts.length - 1].toLowerCase();

    // Step 3: Create username = firstword + lastname
    const username = firstWord + lastWord;

    // Step 4: Get department initials
    const deptInitials = getInitials(department);

    // Step 5: Build email
    const domain = 'se.uni.edu';           // from your example output
    const email = `${username}@${deptInitials.toLowerCase()}.${domain}`;

    return {
        success: true,
        email: email,
        message: 'Email generated successfully',
        usernamePart: username,
        departmentCode: deptInitials
    };
}

// ────────────────────────────────────────────────
// Test cases

const testCases = [
    {
        fullName: "Muhammad Ali Khan",
        department: "Software Engineering"
    },
    {
        fullName: "Ayesha Bibi",
        department: "Computer Science"
    },
    {
        fullName: "Bilal Ahmed Siddiqui",
        department: "Electrical Engineering"
    },
    {
        fullName: "Sara",
        department: "Business Administration"
    },
    {
        fullName: "Zain Raza",
        department: ""
    },
    {
        fullName: " Fatima Noor  ",
        department: " Artificial Intelligence   "
    }
];

testCases.forEach((test, index) => {
    console.log(`Test ${index + 1}:`);
    console.log(`Name: "${test.fullName}"`);
    console.log(`Dept: "${test.department}"`);

    const deptInit = getInitials(test.department);
    console.log(`Department initials: ${deptInit || '(empty)'}`);

    const result = generateEmail(test.fullName, test.department);

    if (result.success) {
        console.log(`Generated email: ${result.email}`);
        console.log(`→ ${result.usernamePart}@${result.departmentCode.toLowerCase()}.se.uni.edu`);
    } else {
        console.log(`Error: ${result.message}`);
    }

    console.log("─".repeat(50));
});