import FormValidator from './Formvalidator.js';

const signInBtn = document.querySelector("#signBtn");
const registerBtn = document.querySelector("#registerBtn");
const submitBtn = document.querySelector("#submit");
const registerFields = document.querySelector("#register");
let fields = ['name','phone']

const createValidator = (fields) =>{
    const form = document.querySelector('.form');
    const validator = new FormValidator(form,fields);
    validator.initialize();
}
signInBtn.addEventListener("click",e=>{
    registerFields.classList.add("register--hidden");
    submitBtn.innerText = "Sign In"
    fields = ['name','phone']
    createValidator(fields)

})
registerBtn.addEventListener("click",e=>{
    registerFields.classList.remove("register--hidden");
    submitBtn.innerText = "Register"
    fields = ['name','phone','email','password','password_confirmation']
    createValidator(fields)

})

createValidator(fields)
