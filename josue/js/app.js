import FormValidator from './Formvalidator.js';

const form = document.querySelector('.form');
const signInBtn = document.querySelector("#signBtn");
const registerBtn = document.querySelector("#registerBtn");
const submitBtn = document.querySelector("#submit");
const registerFields = document.querySelector("#register");
let fields = ['name','phone'];

registerFields.remove();
signInBtn.addEventListener("click",e=>{
    registerFields.classList.add("register--hidden");
    registerFields.remove();
    submitBtn.innerText = "Sign In"
    fields = ['name','phone']
    validator.updateFields(fields,"signin")

})
registerBtn.addEventListener("click",e=>{
    form.insertBefore(registerFields,submitBtn);
    registerFields.classList.remove("register--hidden");
    submitBtn.innerText = "Register"
    const newFields= ['email','password','password_confirmation']
    validator.updateFields(newFields,"register")
});
submitBtn.addEventListener('click',e=>{
    console.log("click");
    e.preventDefault();
    if(validator.validateOnSubmit()){
        // Fields are filled correctly now we check if user wants to register or login
        if(submitBtn.innerText == 'Sign In'){
            const loginUser = validator.createObjectFromForm()
            const user = window.localStorage.getItem(`${loginUser.phone}`);
            if(user){
                console.log("THE USER EXISTS");
                
            }else{
                alert("You are not Registerd, login instead?")
            }
        }
        else{
            // User wants to register.. save it to localstorage
            const  registeredUser = validator.createObjectFromForm();
            console.log(registeredUser);
            window.localStorage.setItem(`${registeredUser.phone}`,JSON.stringify(registeredUser));
        }
    }
})


const validator = new FormValidator(form,fields);
validator.initialize()
