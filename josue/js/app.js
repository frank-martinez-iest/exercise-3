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
const USER_MENU_INFO ={
    WELCOME : userDashboard.firstElementChild,
    BALANCE : userDashboard.querySelector('#current-balance'),
}

const USER_MENU_BTNS = {
    DEPOSIT: document.querySelector("#deposit"),
    WITHDRAW: document.querySelector("#withdraw"),
    TRANSACTIONS: document.querySelector("#transactions"),
}
const USER_MENU_FORMS = {
    DEPOSIT: {
        WRAPPER : document.querySelector(".deposit-form"),
        DEPOSIT_INPUT : document.querySelector("#deposit-form__input"),
        SUBMIT : document.querySelector("#deposit-form__submit"),
        ERROR_MESSAGE : document.querySelector("#deposit-form__error"),
    },
    WITHDRAW: {/*TO BE ADDED*/},
    TRANSACTIONS : {/* TO BE ADDED */}
}

let user = undefined;

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
            user = getUserFromLocalStorage(userData);
            user ? loadUserDashboard() : alert("You are not an user, you have to register first!");
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
    const userFromPhoneNumber = window.localStorage.getItem(`${userData.phone}`);
    const parseFoundUser = JSON.parse(userFromPhoneNumber);
    return parseFoundUser;
};
const loadUserDashboard = () => {
    welcomeSplash.remove();
    registrationFormWrapper.remove();
    accountSection.classList.remove('account');
    accountSection.classList.add('dashboard');
    accountSection.appendChild(boardWrapper);
    const userHasNoBalance = !user.balance;
    if (userHasNoBalance) {
        user = setInitialUserBalance(user);
    }
    toggleUserDashboardBtnsVisibility(user.balance, USER_MENU_BTNS.WITHDRAW, USER_MENU_BTNS.TRANSACTIONS);
    userDashboard.firstElementChild.innerHTML = `Welcome ${user.email}`;
    userDashboard.querySelector('#current-balance').innerText = `Your current balance is ${parseNumberToLocaleString(user.balance)}`
}
const updateUserBalance = (user,balance) => {
    const currentBalance = user.balance ? user.balance : 0;
    const updatedUserBalance = currentBalance + balance;
    window.localStorage.setItem(`${user.phone}`, JSON.stringify({ ...user, 'balance': updatedUserBalance }))
    return getUserFromLocalStorage(user);
};
const parseNumberToLocaleString = number => number.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

const toggleUserDashboardBtnsVisibility = (balance, ...dashboardBtns) => balance > 0 ? showDOMElements(dashboardBtns) : false


const showDOMElements = DOMelements => DOMelements.forEach((DOMelement) => DOMelement.removeAttribute("hidden"))

USER_MENU_BTNS.DEPOSIT.addEventListener("click",()=>{
    USER_MENU_FORMS.DEPOSIT.WRAPPER.removeAttribute("hidden");
})
USER_MENU_FORMS.DEPOSIT.SUBMIT.addEventListener("click",(e)=>{
    e.preventDefault();
    const quantityToDeposit = parseInt(USER_MENU_FORMS.DEPOSIT.DEPOSIT_INPUT.value);
    if(quantityToDeposit < 0){
        USER_MENU_FORMS.DEPOSIT.ERROR_MESSAGE.innerText = "Quantity must be more than 0";
        return false;
    }
    const updatedUser = updateUserBalance(user,quantityToDeposit);
    user = updatedUser;
    USER_MENU_FORMS.DEPOSIT.DEPOSIT_INPUT.value ="";
    USER_MENU_FORMS.DEPOSIT.ERROR_MESSAGE.innerText = "";
    USER_MENU_INFO.BALANCE.innerText = updateUserBalanceText();
    toggleUserDashboardBtnsVisibility(updatedUser.balance, USER_MENU_BTNS.WITHDRAW, USER_MENU_BTNS.TRANSACTIONS);
    return USER_MENU_FORMS.DEPOSIT.WRAPPER.setAttribute("hidden",true);
});
const updateUserBalanceText= () =>`Your current balance is: ${parseNumberToLocaleString(user.balance)}`
registerFieldsWrapper.remove();
boardWrapper.remove();
const validator = new FormValidator(form, fields);
validator.initialize()

