convert the following python code in javascript code: import re

# List of common weak passwords
# Set of common weak passwords
weak_passwords = {'1234', '1111', '0000', '1212', '7777', 
                  '123456', '111111', '000000', '121212', '777777'}

# Example dates (format: MMDD for 4 digits, MMDDYY for 6 digits)
dob_self_4 = "0101"     # Example: January 1st
dob_spouse_4 = "0202"   # Example: February 2nd
anniversary_4 = "0315"  # Example: March 15th
dob_self_6 = "010190"     # Example: January 1st, 1990
dob_spouse_6 = "020290"   # Example: February 2nd, 1990
anniversary_6 = "031590"  # Example: March 15th, 1990

# Add these dates to the weak passwords set
weak_passwords.update({dob_self_4, dob_spouse_4, anniversary_4, dob_self_6, dob_spouse_6, anniversary_6})

def generate_sequential_passwords(length):
    """Generate sequential passwords of given length."""
    sequential_passwords = []
    for i in range(10 - length + 1):
        seq = ''.join(str(x) for x in range(i, i + length))
        rev_seq = seq[::-1]
        sequential_passwords.append(seq)
        sequential_passwords.append(rev_seq)
    return sequential_passwords

def generate_repeated_passwords(length):
    """Generate repeated passwords of given length."""
    repeated_passwords = []
    for i in range(10):
        repeated_passwords.append(str(i) * length)
    return repeated_passwords

def show_weak_passwords():
    """Show all weak 4-digit and 6-digit passwords."""
    all_weak_passwords = set(weak_passwords)
    
    # Generate and add sequential and repeated passwords
    all_weak_passwords.update(generate_sequential_passwords(4))
    all_weak_passwords.update(generate_sequential_passwords(6))
    all_weak_passwords.update(generate_repeated_passwords(4))
    all_weak_passwords.update(generate_repeated_passwords(6))
    
    # Separate into 4-digit and 6-digit passwords
    weak_4_digit = sorted(pwd for pwd in all_weak_passwords if len(pwd) == 4)
    weak_6_digit = sorted(pwd for pwd in all_weak_passwords if len(pwd) == 6)
    
    print("Weak 4-digit passwords:")
    for pwd in weak_4_digit:
        print(pwd)
    
    print("\nWeak 6-digit passwords:")
    for pwd in weak_6_digit:
        print(pwd)

if __name__ == "__main__":
    show_weak_passwords()


def is_sequential(password):
    """Check if the password has sequential digits."""
    return password in '012345678901234567890123456789' or password in '987654321098765432109876543210'

def has_repeated_digits(password):
    """Check if the password has repeated digits."""
    return len(set(password)) != len(password)

def check_password_strength(password):
    if password in weak_passwords:
        return "Weak"
    if is_sequential(password):
        return "Weak"
    if has_repeated_digits(password):
        return "Weak"
    return "Strong"

def main():
    password = input("Enter a 4-digit or 6-digit password: ")
    if re.fullmatch(r"\d{4}|\d{6}", password):
        strength = check_password_strength(password)
        print(f"The password '{password}' is {strength}.")
    else:
        print("Please enter a valid 4-digit or 6-digit password.")

if __name__ == "__main__":
    main()
