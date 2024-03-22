const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const nameError = document.querySelector('#name + .error-message');
const emailError = document.querySelector('#email + .error-message');
const passwordError = document.querySelector('#password + .error-message');

function validateName(name) {
  if (!name.trim()) {
    nameError.textContent = 'Name is required';
    nameError.classList.add('active');
    return false;
  }
  nameError.classList.remove('active');
  nameError.textContent = '';
  return true;
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    emailError.textContent = 'Invalid email format';
    emailError.classList.add('active');
    return false;
  }
  emailError.classList.remove('active');
  emailError.textContent = '';
  return true;
}

function validatePassword(password) {
  if (password.length < 8) {
    passwordError.textContent = 'Password must be at least 8 characters';
    passwordError.classList.add('active');
    return false;
  }
  passwordError.classList.remove('active');
  passwordError.textContent = '';
  return true;
}

const form = document.getElementById('myForm');
form.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent default form submission

  if (!validateName(nameInput.value) || !validateEmail(emailInput.value) || !validatePassword(passwordInput.value)) {
    return; // Don't submit if validation fails
  }

  // Submit the form data (implement logic here)
  alert('Form submitted successfully!');
});

// Add validation on blur event for immediate feedback
nameInput.addEventListener('blur', () => validateName(nameInput.value));
emailInput.addEventListener('blur', () => validateEmail(emailInput.value));
passwordInput.addEventListener('blur', () => validatePassword(passwordInput.value));
