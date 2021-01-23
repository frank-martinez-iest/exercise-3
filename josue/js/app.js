import FormValidator from './Formvalidator.js';

const form = document.querySelector('#form');
const signInBtn = document.querySelector("#signBtn");
const registerBtn = document.querySelector("#registerBtn");
const submitBtn = document.querySelector("#submit");
const registerFieldsWrapper = document.querySelector("#register-fields");
const boardWrapper = document.querySelector(".account__board-wrapper");
const userDashboard = document.querySelector(".account__board-user");
const welcomeSplash = document.querySelector('.account__splash-img');
const accountSection = document.querySelector(".account");
const fields = ['name', 'phone'];
const registerFieldsIds = ['email', 'password', 'password_confirmation'];
const registrationFormWrapper = document.querySelector('.account__left-wrapper');
/*STRINGS*/
const SIGN_IN = 'Sign In';
const REGISTER = 'Register';

const addRegisterFieldsToValidator = () => {
    // First step, combine the actual validator fields with the registerFields
    const fieldsCombined = [...validator.fields, ...registerFieldsIds];
    // We have to filter the array to delete the repeated elements 
    const newFilteredFormArray = [...new Set(fieldsCombined)]
    validator.fields = newFilteredFormArray;
    registerFieldsIds.forEach(field => {
        const input = document.querySelector(`#${field}`);
        input.addEventListener('input', () => {
            validator.validateFields(input);
        });
    });
}
const parseFormData = () => {
    const myObjectFromForm = {}
    validator.fields.forEach(field => {
        const input = document.querySelector(`#${field}`)
        myObjectFromForm[field] = input.value;
    })
    myObjectFromForm["balance"] = 0;
    return myObjectFromForm
}

signInBtn.addEventListener("click", () => {
    registerFieldsWrapper.remove();
    submitBtn.innerText = SIGN_IN;
    validator.fields = validator.fields.slice(0, 2);
});

registerBtn.addEventListener("click", () => {
    form.insertBefore(registerFieldsWrapper, submitBtn);
    submitBtn.innerText = REGISTER;
    addRegisterFieldsToValidator();
});

submitBtn.addEventListener('click', e => {
    e.preventDefault();
    const isFormValid = validator.validateOnSubmit();
    if (isFormValid) {
        // Fields are filled correctly now we check if user wants to register or login
        if (submitBtn.innerText == SIGN_IN) {
            const userData = parseFormData();
            const user = JSON.parse(window.localStorage.getItem(`${userData.phone}`));
            user ? loadUserDashboard(user) : alert("You are not an user, you have to register first!");
        }
        else {
            // User wants to register.. save it to localstorage
            const userData = parseFormData();
            window.localStorage.setItem(`${userData.phone}`, JSON.stringify(userData));
            confirm("You are now part of BankApp go to Sign In!");
        }
    }
});

const loadUserDashboard = (user) => {
    welcomeSplash.remove();
    registrationFormWrapper.remove();
    accountSection.classList.remove('account');
    accountSection.classList.add('dashboard');
    accountSection.appendChild(boardWrapper);
    user.balance ?? setInitialUserBalance(user);
    userDashboard.firstElementChild.innerHTML = `Welcome ${user.email}`;
    userDashboard.querySelector('#current-balance').innerText = `Your current balance is ${parseNumberToLocaleString(user.balance)}`
}
const setInitialUserBalance = (user) => window.localStorage.setItem(`${user.phone}`, JSON.stringify({ ...user, 'balance': 0 }));
const parseNumberToLocaleString = (number) => number.toLocaleString('en-US', { style: 'currency', currency: 'USD' });


registerFieldsWrapper.remove();
boardWrapper.remove();
const validator = new FormValidator(form, fields);
validator.initialize()