import FormValidator from './Formvalidator.js';

const form = document.querySelector('.form');
const signInBtn = document.querySelector("#signBtn");
const registerBtn = document.querySelector("#registerBtn");
const submitBtn = document.querySelector("#submit");
const registerFields = document.querySelector("#register-fields");
const boardWrapper = document.querySelector(".account__board-wrapper");
const userDashboard = document.querySelector(".account__board-user");
const welcomeSplash = document.querySelector('.account__splash-img');
const accountSection =document.querySelector(".account");
const fields = ['name','phone'];

/*STRINGS*/
const SIGN_IN = 'Sign In';
registerFields.remove();
boardWrapper.remove();
signInBtn.addEventListener("click",()=>{
    registerFields.classList.add("register-fields--hidden");
    registerFields.remove();
    submitBtn.innerText = SIGN_IN;
    validator.updateFields(fields,"signin");

})
registerBtn.addEventListener("click",()=>{
    form.insertBefore(registerFields,submitBtn);
    registerFields.classList.remove("register-fields--hidden");
    submitBtn.innerText = "Register"
    const registerFieldsNames= ['email','password','password_confirmation']
    validator.updateFields(registerFieldsNames,"register")
});
submitBtn.addEventListener('click',e=>{
    e.preventDefault();
    const isFormValid = validator.validateOnSubmit()
    if(isFormValid){
        // Fields are filled correctly now we check if user wants to register or login
        if(submitBtn.innerText == SIGN_IN){
            const userData = validator.parseFormData();
            const user = JSON.parse(window.localStorage.getItem(`${userData.phone}`));
            console.log(user);
            if(user){
                welcomeSplash.remove();
                accountSection.appendChild(boardWrapper);
                userDashboard.firstElementChild.innerHTML = `Welcome ${user.email}`
            }else{
                alert("You are not Registerd, login instead?")
            }
        }
        else{
            // User wants to register.. save it to localstorage
            const  userData = validator.parseFormData();
            window.localStorage.setItem(`${userData.phone}`,JSON.stringify(userData));
            confirm("You are now part of BankApp go to login!")
        }
    }
})

const validator = new FormValidator(form,fields);
validator.initialize()
