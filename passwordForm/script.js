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
      if (field === pwd) {
        updatePwdStrengthLabel();
      }
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
  } else {
    element.classList.remove('valid');
    element.classList.add('invalid');
    element.nextElementSibling.nextElementSibling.style.color = '#900';
  }
}

function calculatePwdScore() {
  const input = pwd.value;
  let counter = 0;

  if (input.match(/[a-z]/)) counter += 1;
  if (input.match(/[A-Z]/)) counter += 1;
  if (input.match(/[0-9]/)) counter += 1;
  if (input.match(/[\!\@\#\$\%\^\&\*\(\)\-\_\+\=]/)) counter += 1;
  if (input.length > 8) counter += 1;

  return counter;
}

function updatePwdStrengthLabel() {
  const score = calculatePwdScore();
  const strengthLabel = document.getElementById('pwd-strength');
  strengthLabel.classList.remove(
    'text-danger',
    'text-warning',
    'text-info',
    'text-primary',
    'text-success'
  );

  switch (score) {
    case 0:
      strengthLabel.textContent = 'unacceptable';
      strengthLabel.classList.add('text-danger');
      break;
    case 1:
      strengthLabel.textContent = 'weak';
      strengthLabel.classList.add('text-warning');
      break;
    case 2:
      strengthLabel.textContent = 'normal';
      strengthLabel.classList.add('text-info');
      break;
    case 3:
    case 4:
      strengthLabel.textContent = 'strong';
      strengthLabel.classList.add('text-primary');
      break;
    case 5:
      strengthLabel.textContent = 'very strong';
      strengthLabel.classList.add('text-success');
      break;
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
  if (verifyPwd.value !== pwd.value || !verifyPwd.value) {
    showInvalid(verifyPwd);
    allValid = false;
  }
  if (!agreement.checked) {
    showInvalid(agreement);
    allValid = false;
  }
  if (allValid) showSuccessMsg();
}

function showSuccessMsg() {
  const successToast = document.getElementById('successToast');
  const toast = new bootstrap.Toast(successToast);
  toast.show();
  setInterval(() => {
    location.reload();
  }, 5000);
}
