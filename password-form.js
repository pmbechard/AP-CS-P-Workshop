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
const submit = document.getElementById('submit-btn');

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
  if (element === agreement) {
    element.nextElementSibling.style.color = 'green';
  } else {
    element.classList.remove('invalid');
    element.classList.add('valid');
    element.nextElementSibling.nextElementSibling.style.color = 'green';
  }
}

function showInvalid(element) {
  if (element === agreement) {
    element.nextElementSibling.style.color = '#900';
    //   } else if (!element.value) {
    //     element.classList.remove('valid', 'invalid');
    //     element.nextElementSibling.nextElementSibling.style.color = '#777';
  } else {
    element.classList.remove('valid');
    element.classList.add('invalid');
    element.nextElementSibling.nextElementSibling.style.color = '#900';
  }
}

submit.addEventListener('click', (event) => {
  checkAllValidity();
});

function checkAllValidity() {
  let allValid = true;
  if (!username.validity.valid) {
    showInvalid(username);
    allValid = false;
  }
  if (!email.validity.valid) {
    showInvalid(email);
    allValid = false;
  }
  if (!pwd.validity.valid) {
    showInvalid(pwd);
    allValid = false;
  }
  if (verifyPwd.value !== pwd.value) {
    showInvalid(verifyPwd);
    allValid = false;
  }
  if (!agreement.checked) {
    showInvalid(agreement);
    allValid = false;
  }
  if (allValid) showSuccessMsg();
}

function showSuccessMsg() {}
