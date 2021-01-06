import FormValidator from './Formvalidator.js';

const form = document.querySelector('#form');
const signInBtn = document.querySelector("#signBtn");
const registerBtn = document.querySelector("#registerBtn");
const submitBtn = document.querySelector("#submit");
const registerFieldsWrapper = document.querySelector("#register-fields");
const boardWrapper = document.querySelector(".account__board-wrapper");
const userDashboard = document.querySelector(".account__board-user");
const welcomeSplash = document.querySelector('.account__splash-img');
const accountSection =document.querySelector(".account");
const fields = ['name','phone'];
const registerFieldsIds = ['email','password','password_confirmation'];
/*STRINGS*/
const SIGN_IN = 'Sign In';
const REGISTER = 'Register';

const addRegisterFieldsToValidator = () =>{
    // First step, combine the actual validator fields with the registerFields
    const fieldsCombined = [...validator.fields,...registerFieldsIds];
    // We have to filter the array to delete the repeated elements 
    const newFilteredFormArray = [...new Set(fieldsCombined)]
    validator.fields = newFilteredFormArray;
    registerFieldsIds.forEach(field=>{
        const input = document.querySelector(`#${field}`);
        input.addEventListener('input',()=>{
            validator.validateFields(input);
        });
    });
}
const parseFormData= ()=>{
    const myObjectFromForm = {}
    validator.fields.forEach(field => {
        const input = document.querySelector(`#${field}`)
        myObjectFromForm[field] = input.value;
    })
    return myObjectFromForm
}

signInBtn.addEventListener("click",()=>{
    registerFieldsWrapper.remove();
    submitBtn.innerText = SIGN_IN;
    validator.fields = validator.fields.slice(0,2);
});

registerBtn.addEventListener("click",()=>{
    form.insertBefore(registerFieldsWrapper,submitBtn);
    submitBtn.innerText = REGISTER;
    addRegisterFieldsToValidator();
});

submitBtn.addEventListener('click',e=>{
    e.preventDefault();
    const isFormValid = validator.validateOnSubmit();
    if(isFormValid){
        // Fields are filled correctly now we check if user wants to register or login
        if(submitBtn.innerText == SIGN_IN){
            const userData = parseFormData();
            const user = JSON.parse(window.localStorage.getItem(`${userData.phone}`));
            console.log(user);
            if(user){
                welcomeSplash.remove();
                accountSection.appendChild(boardWrapper);
                userDashboard.firstElementChild.innerHTML = `Welcome ${user.email}`;
            }else{
                alert("You are not part of BankApp, want to register instead?");
            }
        }
        else{
            // User wants to register.. save it to localstorage
            const  userData = parseFormData();
            window.localStorage.setItem(`${userData.phone}`,JSON.stringify(userData));
            confirm("You are now part of BankApp go to Sign In!");
        }
    }
});

registerFieldsWrapper.remove();
boardWrapper.remove();
const validator = new FormValidator(form,fields);
validator.initialize()