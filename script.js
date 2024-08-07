// List of common weak passwords
const weakPasswords = new Set(['1234', '1111', '0000', '1212', '7777', 
                                '123456', '111111', '000000', '121212', '777777']);

// Example dates (format: MMDD for 4 digits, MMDDYY for 6 digits)
const dobSelf4 = "0101";     // Example: January 1st
const dobSpouse4 = "0202";   // Example: February 2nd
const anniversary4 = "0315"; // Example: March 15th
const dobSelf6 = "010190";   // Example: January 1st, 1990
const dobSpouse6 = "020290"; // Example: February 2nd, 1990
const anniversary6 = "031590"; // Example: March 15th, 1990

// Add these dates to the weak passwords set
weakPasswords.add(dobSelf4);
weakPasswords.add(dobSpouse4);
weakPasswords.add(anniversary4);
weakPasswords.add(dobSelf6);
weakPasswords.add(dobSpouse6);
weakPasswords.add(anniversary6);

function generateSequentialPasswords(length) {
    const sequentialPasswords = [];
    for (let i = 0; i <= 10 - length; i++) {
        let seq = '';
        for (let j = i; j < i + length; j++) {
            seq += j.toString();
        }
        let revSeq = seq.split('').reverse().join('');
        sequentialPasswords.push(seq);
        sequentialPasswords.push(revSeq);
    }
    return sequentialPasswords;
}

function generateRepeatedPasswords(length) {
    const repeatedPasswords = [];
    for (let i = 0; i < 10; i++) {
        repeatedPasswords.push(i.toString().repeat(length));
    }
    return repeatedPasswords;
}

function showWeakPasswords() {
    let allWeakPasswords = new Set(weakPasswords);
    
    // Generate and add sequential and repeated passwords
    generateSequentialPasswords(4).forEach(pwd => allWeakPasswords.add(pwd));
    generateSequentialPasswords(6).forEach(pwd => allWeakPasswords.add(pwd));
    generateRepeatedPasswords(4).forEach(pwd => allWeakPasswords.add(pwd));
    generateRepeatedPasswords(6).forEach(pwd => allWeakPasswords.add(pwd));
    
    // Separate into 4-digit and 6-digit passwords
    const weak4Digit = Array.from(allWeakPasswords).filter(pwd => pwd.length === 4).sort();
    const weak6Digit = Array.from(allWeakPasswords).filter(pwd => pwd.length === 6).sort();
    
    console.log("Weak 4-digit passwords:");
    weak4Digit.forEach(pwd => console.log(pwd));
    
    console.log("\nWeak 6-digit passwords:");
    weak6Digit.forEach(pwd => console.log(pwd));
}

function isSequential(password) {
    return '012345678901234567890123456789'.includes(password) || '987654321098765432109876543210'.includes(password);
}

function hasRepeatedDigits(password) {
    return new Set(password).size !== password.length;
}

function checkPasswordStrength(password) {
    if (weakPasswords.has(password)) {
        return "Weak";
    }
    if (isSequential(password)) {
        return "Weak";
    }
    if (hasRepeatedDigits(password)) {
        return "Weak";
    }
    return "Strong";
}

function main() {
    const password = prompt("Enter a 4-digit or 6-digit password: ");
    if (/^\d{4}|\d{6}$/.test(password)) {
        const strength = checkPasswordStrength(password);
        alert(`The password '${password}' is ${strength}.`);
    } else {
        alert("Please enter a valid 4-digit or 6-digit password.");
    }
}

// Run the main function
main();

// Optional: Show weak passwords (for testing purposes)
showWeakPasswords();
