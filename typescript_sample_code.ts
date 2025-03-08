// Vulnerable TypeScript code without classes

// Vulnerability 1: Password stored in plaintext
let username = "admin";
let password = "password123";

// Vulnerability 2: No input validation
function authenticate(inputUsername: string, inputPassword: string): boolean {
  return inputUsername === username && inputPassword === password;
}

// Vulnerability 3: No input sanitization for user input (could lead to injection)
function updateProfile(newUsername: string, newPassword: string) {
  username = newUsername;
  password = newPassword; // Direct assignment without validation or hashing
}

// Vulnerability 4: No proper error handling or logging
function login(inputUsername: string, inputPassword: string) {
  if (inputUsername === username && inputPassword === password) {
    console.log("Logged in successfully");
  } else {
    console.log("Invalid credentials");
    // No specific error logging or information, which can make debugging difficult
  }
}

// Usage of the vulnerable code

// Try logging in with incorrect credentials
login("admin", "wrongpassword");

// Update profile with new credentials
updateProfile("admin2", "newpassword123");

// Authenticate using the updated password
console.log(authenticate("admin2", "newpassword123"));
