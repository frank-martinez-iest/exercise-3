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
const USERDASHBOARDINFO ={
    WELCOME : userDashboard.firstElementChild,
    BALANCE : userDashboard.querySelector('#current-balance'),
}
const USERDASHBOARDBTNS = {
    DEPOSIT: document.querySelector("#deposit"),
    WITHDRAW: document.querySelector("#withdraw"),
    TRANSACTIONS: document.querySelector("#transactions"),
}
const USERDASHBOARDFORMS = {
    DEPOSIT: {
        WRAPPER : document.querySelector(".deposit-form"),
        DEPOSIT_INPUT : document.querySelector("#deposit-form__input"),
        SUBMIT : document.querySelector("#deposit-form__submit"),
        ERROR_MESSAGE : document.querySelector("#deposit-form__error"),
    },
    WITHDRAW: {/*TO BE ADDED*/},
    TRANSACTIONS : {/* TO BE ADDED */}
}
let USER = undefined;
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
            USER = getUserFromLocalStorage(userData);
            USER ? loadUserDashboard() : alert("You are not an user, you have to register first!");
        }
        else {
            // User wants to register.. save it to localstorage
            const userData = parseFormData();
            window.localStorage.setItem(`${userData.phone}`, JSON.stringify(userData));
            confirm("You are now part of BankApp go to Sign In!");
        }
    }
});
const getUserFromLocalStorage = userData => {
    const user = JSON.parse(window.localStorage.getItem(`${userData.phone}`));
    console.log(user);
    return user;
};
const loadUserDashboard = () => {
    welcomeSplash.remove();
    registrationFormWrapper.remove();
    accountSection.classList.remove('account');
    accountSection.classList.add('dashboard');
    accountSection.appendChild(boardWrapper);
    const userHasNoBalance = !USER.balance;
    if (userHasNoBalance) {
        USER = updateUserBalance(USER,0);
    }
    toggleUserDashboardBtnsVisibility(USER.balance, USERDASHBOARDBTNS.WITHDRAW, USERDASHBOARDBTNS.TRANSACTIONS);
    USERDASHBOARDINFO.WELCOME.innerText = `Welcome ${USER.email}`;
    USERDASHBOARDINFO.BALANCE.innerText = updateUserBalanceText();
}
const updateUserBalance = (user,balance) => {
    const currentBalance = USER.balance ? USER.balance : 0;
    const updatedUserBalance = currentBalance + balance;
    window.localStorage.setItem(`${user.phone}`, JSON.stringify({ ...user, 'balance': updatedUserBalance }))
    return getUserFromLocalStorage(user);
};
const parseNumberToLocaleString = number => number.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

const toggleUserDashboardBtnsVisibility = (balance, ...dashboardBtns) => (balance > 0) && unhideDOMElements(dashboardBtns)


const unhideDOMElements = DOMelements => DOMelements.forEach((DOMelement) => DOMelement.removeAttribute("hidden"))

USERDASHBOARDBTNS.DEPOSIT.addEventListener("click",()=>{
    USERDASHBOARDFORMS.DEPOSIT.WRAPPER.removeAttribute("hidden");
})
USERDASHBOARDFORMS.DEPOSIT.SUBMIT.addEventListener("click",(e)=>{
    e.preventDefault();
    const quantityToDeposit = parseInt(USERDASHBOARDFORMS.DEPOSIT.DEPOSIT_INPUT.value);
    if(quantityToDeposit < 0){
        USERDASHBOARDFORMS.DEPOSIT.ERROR_MESSAGE.innerText = "Quantity must be more than 0";
        return false;
    }
    const updatedUser = updateUserBalance(USER,quantityToDeposit);
    USER = updatedUser;
    USERDASHBOARDFORMS.DEPOSIT.DEPOSIT_INPUT.value ="";
    USERDASHBOARDFORMS.DEPOSIT.ERROR_MESSAGE.innerText = "";
    USERDASHBOARDINFO.BALANCE.innerText = updateUserBalanceText();
    toggleUserDashboardBtnsVisibility(updatedUser.balance, USERDASHBOARDBTNS.WITHDRAW, USERDASHBOARDBTNS.TRANSACTIONS);
    return USERDASHBOARDFORMS.DEPOSIT.WRAPPER.setAttribute("hidden",true);
});
const updateUserBalanceText= () =>`Your current balance is: ${parseNumberToLocaleString(USER.balance)}`
registerFieldsWrapper.remove();
boardWrapper.remove();
const validator = new FormValidator(form, fields);
validator.initialize()

