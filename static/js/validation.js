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
const formInputs = document.getElementsByTagName('form')[0].getElementsByTagName('input');
for (i = 0; i < formInputs.length; i++) {
    let input = formInputs[i];
    switch (input.type) {
        case 'email':
            let emailInput = input;

            // For confirming emails
            if (emailInput.id === 'registerConfirmMail') {
                emailInput.addEventListener("input", () => {
                    const registerMail = document.querySelector('#registerMail');
                    if (registerMail && !registerMail.value) {
                        emailInput.value = '';
                        alert('You must write the email first')
                    }

                    if (!validateEmail(emailInput.value)) {
                        emailInput.classList.remove('border-success');
                        emailInput.classList.add('border-danger');
                    } else if(!sameEmail(registerMail.value, emailInput.value)) {
                        emailInput.classList.remove('border-success');
                        emailInput.classList.add('border-danger');
                    } else {
                        emailInput.classList.remove('border-danger');
                        emailInput.classList.add('border-success');
                    }
                });
            } else {
                // For all email inputs
                emailInput.addEventListener("input", () => {
                    const registerConfirmMail = document.querySelector('#registerConfirmMail')
                    // Checks if that field exists
                    if (registerConfirmMail && registerConfirmMail.value) {
                        registerConfirmMail.value = '';
                        registerConfirmMail.classList.remove('border-success');
                        registerConfirmMail.classList.add('border-danger');
                        //Clears the confirm password field
                    }
                    
                    if (!validateEmail(emailInput.value)) {
                        emailInput.classList.remove('border-success');
                        emailInput.classList.add('border-danger');
                    } else {
                        emailInput.classList.remove('border-danger');
                        emailInput.classList.add('border-success');
                    }
                });
            }
            break;

        case 'password':
            let passInput = input;

            // For confirming passoword
            if (passInput.id === 'registerConfirmPassword') {
                passInput.addEventListener("input", () => {
                    const registerPassword = document.querySelector('#registerPassword');
                    if (registerPassword && !registerPassword.value) {
                        passInput.value = '';
                        alert('You must write the password first')
                    }

                    if (!validatePassword(passInput.value)) {
                        passInput.classList.remove('border-success');
                        passInput.classList.add('border-danger');
                    } else if(!samePass(registerPassword.value, passInput.value)) {
                        passInput.classList.remove('border-success');
                        passInput.classList.add('border-danger');
                    } else {
                        passInput.classList.remove('border-danger');
                        passInput.classList.add('border-success');
                    }
                });
            } else {
                // For all password inputs
                passInput.addEventListener("input", () => {
                    const registerConfirmPassword = document.querySelector('#registerConfirmPassword')
                    // Checks if that field exists
                    if (registerConfirmPassword && registerConfirmPassword.value) {
                        registerConfirmPassword.value = ''
                        registerConfirmPassword.classList.remove('border-success');
                        registerConfirmPassword.classList.add('border-danger');
                        //Clears the confirm password field
                    }

                    if (!validatePassword(passInput.value)) {
                        passInput.classList.remove('border-success');
                        passInput.classList.add('border-danger');
                    } else {
                        passInput.classList.remove('border-danger');
                        passInput.classList.add('border-success');
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