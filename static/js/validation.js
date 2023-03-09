// ********* Validation Functions ********* \\

const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/;

function validateEmail(email) {
    return emailRegex.test(email);
}

function validatePassword(pass) {
    // Min 1 uppercase letter.
    // Min 1 lowercase letter.
    // Min 1 special character.
    // Min 1 number.
    // Min 8 characters.
    // Max 30 characters. 
    return passRegex.test(pass);
}

function sameEmail(mail, confirmMail) {
    mail = mail.toLowerCase();
    confirmMail = confirmMail.toLowerCase();

    return mail === confirmMail;
}

function samePass(pass, confirmPass) {
    return pass === confirmPass;
}


// ********* Form Functions ********* \\

// Input validation in real time!!
const dropdownTemplate = `
<div class="btn-group dropup">
  <button 
    type="button" 
    class="btn btn-secondary dropdown-toggle" 
    data-bs-toggle="dropdown" 
    aria-expanded="false"
    style="outline: none; background-color: unset; padding: 0; border: none; width: 1px;"
    >
        <i class="fa-solid fa-circle-info text-danger"></i>
    /button>
  <ul class="dropdown-menu">
    <li>
        <p class="dropdown-item" style="font-size: .7rem;">
        Minst 1 stor bokstav.
        </p>
    </li>
    <li>
        <p class="dropdown-item" style="font-size: .7rem;">
        Minst 1 liten bokstav.
        </p>
    </li>
    <li>
        <p class="dropdown-item" style="font-size: .7rem;">
        Minst 1 specialtecken.
        </p>
    </li>
    <li>
        <p class="dropdown-item" style="font-size: .7rem;">
        Minst 1 nummer.
        </p>
    </li>
    <li>
        <p class="dropdown-item" style="font-size: .7rem;">
        Max 30 tecken.
        </p>
    </li>
  </ul>
</div>
`;

const formInputs = document.getElementsByTagName('form')[0].getElementsByTagName('input');
for (i = 0; i < formInputs.length; i++) {
    let input = formInputs[i];
    switch (input.type) {
        case 'email':
            let emailInput = input;
            let errorField = document.createElement('span');
            emailInput.parentNode.getElementsByTagName('label')[0].appendChild(errorField);

            // For confirming emails
            if (emailInput.id === 'registerConfirmMail') {
                emailInput.addEventListener("input", () => {
                    const registerMail = document.querySelector('#registerMail');
                    if (registerMail && !registerMail.value) {
                        emailInput.value = '';
                        errorField.innerHTML = `<br><small class="text-danger" style="font-size: .7rem;">Du måste fylla i mejl fältet först</small>`;
                        return;
                    }

                    // Starts the email validation
                    if(!sameEmail(registerMail.value, emailInput.value)) {
                        emailInput.classList.remove('border-success');
                        emailInput.classList.add('border-danger');
                        errorField.innerHTML = `<br><small class="text-danger" style="font-size: .7rem;">Matchar inte mejlfältet</small>`;
                    } else {
                        emailInput.classList.remove('border-danger');
                        emailInput.classList.add('border-success');
                        errorField.innerHTML = '';
                    }
                });
            } else {
                // For all the email inputs
                // Creates error field

                emailInput.addEventListener("input", () => {
                    const registerConfirmMail = document.querySelector('#registerConfirmMail')

                    // Checks if that field exists and if it has a value
                    if (registerConfirmMail && registerConfirmMail.value) {
                        registerConfirmMail.value = '';
                        registerConfirmMail.classList.remove('border-success');
                        registerConfirmMail.classList.remove('border-danger');
                        //Clears the confirm password field
                    }

                    // Starts the email validation
                    if (!validateEmail(emailInput.value)) {
                        emailInput.classList.remove('border-success');
                        emailInput.classList.add('border-danger');
                        errorField.innerHTML = `<br><small class="text-danger" style="font-size: .7rem;">Detta är inte ett giltigt mejl</small>`;
                    } else {
                        emailInput.classList.remove('border-danger');
                        emailInput.classList.add('border-success');
                        errorField.innerHTML = '';
                    }
                });
            }
            break;

        case 'password':
            let passInput = input;
            // Creates error field
            let passErrorField = document.createElement('span');
            passInput.parentNode.getElementsByTagName('label')[0].appendChild(passErrorField);

            // For confirming password inputs
            if (passInput.id === 'registerConfirmPassword') {
                passInput.addEventListener("input", () => {
                    const registerPassword = document.querySelector('#registerPassword');
                    if (registerPassword && !registerPassword.value) {
                        passInput.value = '';
                        passErrorField.innerHTML = `<br><small class="text-danger" style="font-size: .7rem;">Du måste fylla i lösenordsfältet först</small>`;
                        return;
                    }

                    // Starts the password validation
                    if(!samePass(registerPassword.value, passInput.value)) {
                        passInput.classList.remove('border-success');
                        passInput.classList.add('border-danger');
                        passErrorField.innerHTML = `<br><small class="text-danger" style="font-size: .7rem;">Matchar inte lösenordsfältet</small>`;
                    } else {
                        passInput.classList.remove('border-danger');
                        passInput.classList.add('border-success');
                        passErrorField.innerHTML = '';
                    }
                });
            } else {
                // For all password inputs

                passInput.addEventListener("input", () => {
                    const registerConfirmPassword = document.querySelector('#registerConfirmPassword')
                    // Check if that field exists and if it has a value
                    if (registerConfirmPassword && registerConfirmPassword.value) {
                        registerConfirmPassword.value = ''
                        registerConfirmPassword.classList.remove('border-success');
                        registerConfirmPassword.classList.remove('border-danger');
                        // Clears the confirm password field
                    }

                    // Starts the password validation
                    if (!validatePassword(passInput.value)) {
                        passInput.classList.remove('border-success');
                        passInput.classList.add('border-danger');
                        passErrorField.innerHTML = `<br><small class="text-danger" style="font-size: .7rem;">Lösenordet matchar inte kraven! ${dropdownTemplate}</small>`;
                    } else {
                        passInput.classList.remove('border-danger');
                        passInput.classList.add('border-success');
                        passErrorField.innerHTML = '';
                    }
                });
            }

            break;

        case 'text':
            let textInput = input;
            textInput.addEventListener("input", () => {
                if (textInput.value.length <= 3) {
                    textInput.classList.add('border-danger');
                } else {
                    textInput.classList.remove('border-danger');
                    textInput.classList.add('border-success');
                }
            });
            break;

        default:
            break;
    }
}

// Clears the form
function clearForm() {
    for (i = 0; i < formInputs.length; i++) {
        formInputs[i].value = '';
        formInputs[i].classList.remove('border-danger', 'border-success');
    }
}

function submitLogin() {
    const mail = document.querySelector('#loginEmail').value;
    const password = document.querySelector('#loginPassword').value;
    
    if (!mail || !password) {
        alert('Fill all the fields');
        clearForm();
    }
    
    if (!validateEmail(mail)) {
        console.log('Email not valid');
        clearForm();
        return;
    }
    
    if (!validatePassword(password)) {
        alert('Password doesn\'t match the requirements!');
        clearForm();
        return;
    }
    
    console.log({
        mail,
        password
    });
}

function submitRegister() {
    const registerName = document.querySelector('#registerName').value;
    const registerMail = document.querySelector('#registerMail').value;
    const registerConfirmMail = document.querySelector('#registerConfirmMail').value;
    const registerPassword = document.querySelector('#registerPassword').value;
    const registerConfirmPassword = document.querySelector('#registerConfirmPassword').value;

    if(!registerName || !registerMail || !registerConfirmMail || !registerPassword || !registerConfirmPassword){
        alert('Fill all the fields');
        clearForm();
        return;
    }

    if(!validateEmail(registerMail) && !validateEmail(registerConfirmMail)) {
        alert("Email is not valid!");
        clearForm();
        return;
    }

    if (!validatePassword(registerPassword) && !validatePassword(registerConfirmPassword)) {
        alert('Password doesn\'t match the requirements!');
        clearForm();
        return;
    }

    if(!sameEmail(registerMail, registerConfirmMail)) {
        alert("Mails doesn't match!");
        clearForm();
        return;
    }

    if(!samePass(registerPassword, registerConfirmPassword)) {
        alert("Password doesn't match!");
        clearForm();
        return;
    }
    
    console.log({
        name: registerName,
        mail: registerMail,
        password: registerPassword
    });
}

// Submit buttons
const loginBtn = document.querySelector('#loginBtn');
const registerBtn = document.querySelector('#registerBtn');

if(loginBtn) {
    loginBtn.addEventListener("click", (e) => {
        e.preventDefault();
        submitLogin();
    });
}
if(registerBtn) {
    registerBtn.addEventListener("click", (e) => {
        e.preventDefault();
        submitRegister();
    });
}