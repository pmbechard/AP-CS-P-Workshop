/*
Given a potential password, classify the password into one of four 
categories: unacceptable, weak, strong, or very strong. The 
unacceptable category is for passwords that are considered too 
common. You should create a list of these unacceptable passwords 
with at least 5 unacceptable passwords in it.  
*/

const form = document.getElementsByTagName('form')[0];
const username = document.getElementById('username');
const email = document.getElementById('email');
const pwd = document.getElementById('pwd');
const verifyPwd = document.getElementById('verifyPwd');
const agreement = document.getElementById('agreement');

const fieldsToValidate = [username, email, pwd, verifyPwd, agreement];

fieldsToValidate.forEach((field) => {
  if (field === verifyPwd) {
    field.addEventListener('input', () => {
      field.setCustomValidity('');
      field.validity.valid && field.value === pwd.value
        ? showValid(field)
        : showInvalid(field);
    });
  } else {
    field.addEventListener('input', () => {
      field.setCustomValidity('');
      field.validity.valid ? showValid(field) : showInvalid(field);
    });
  }
});

function showValid(element) {
  element.classList.remove('invalid');
  element.classList.add('valid');
}

function showInvalid(element) {
  element.classList.remove('valid');
  element.classList.add('invalid');
}

form.addEventListener('submit', (event) => {
  // if any field is invalid, display custom instructions underneath field
  if (!username.validity.valid) {
    username.setCustomValidity('Please enter a valid username.');
    username.reportValidity();
  } else if (!email.validity.valid) {
    email.setCustomValidity('Please enter a valid email address.');
    email.reportValidity();
  } else if (!pwd.validity.valid) {
    pwd.setCustomValidity(
      'Must be 8 characters with uppercase, lowercase, and number or special character.'
    );
    pwd.reportValidity();
  } else if (verifyPwd.value !== pwd.value) {
    verifyPwd.setCustomValidity('Passwords must match.');
    verifyPwd.reportValidity();
  } else if (!agreement.checked) {
    agreement.setCustomValidity(
      "Please confirm that you've read and agreement to the Terms & Conditions"
    );
    agreement.reportValidity();
  }
});
