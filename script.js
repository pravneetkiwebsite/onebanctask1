const weakPasswords = new Set(['1234', '1111', '0000', '1212', '7777', 
                               '123456', '111111', '000000', '121212', '777777']);

const dobSelf4 = "0101";     
const dobSpouse4 = "0202";   
const anniversary4 = "0315";  
const dobSelf6 = "010190";     
const dobSpouse6 = "020290";   
const anniversary6 = "031590";  

weakPasswords.add(dobSelf4);
weakPasswords.add(dobSpouse4);
weakPasswords.add(anniversary4);
weakPasswords.add(dobSelf6);
weakPasswords.add(dobSpouse6);
weakPasswords.add(anniversary6);

function generateSequentialPasswords(length) {
    let sequentialPasswords = [];
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
    let repeatedPasswords = [];
    for (let i = 0; i < 10; i++) {
        repeatedPasswords.push(i.toString().repeat(length));
    }
    return repeatedPasswords;
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

document.getElementById('passwordForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const password = document.getElementById('password').value;
    const result = checkPasswordStrength(password);
    document.getElementById('result').textContent = `The password '${password}' is ${result}.`;
});

document.getElementById('showWeakPasswords').addEventListener('click', function() {
    const weakPasswordsDiv = document.getElementById('weakPasswords');
    weakPasswordsDiv.style.display = 'block';

    const allWeakPasswords = new Set(weakPasswords);
    allWeakPasswords.add(...generateSequentialPasswords(4));
    allWeakPasswords.add(...generateSequentialPasswords(6));
    allWeakPasswords.add(...generateRepeatedPasswords(4));
    allWeakPasswords.add(...generateRepeatedPasswords(6));

    const weak4Digit = Array.from(allWeakPasswords).filter(pwd => pwd.length === 4).sort();
    const weak6Digit = Array.from(allWeakPasswords).filter(pwd => pwd.length === 6).sort();

    const weak4DigitList = document.getElementById('weak4DigitPasswords');
    weak4DigitList.innerHTML = '';
    weak4Digit.forEach(pwd => {
        const li = document.createElement('li');
        li.textContent = pwd;
        weak4DigitList.appendChild(li);
    });

    const weak6DigitList = document.getElementById('weak6DigitPasswords');
    weak6DigitList.innerHTML = '';
    weak6Digit.forEach(pwd => {
        const li = document.createElement('li');
        li.textContent = pwd;
        weak6DigitList.appendChild(li);
    });
});
