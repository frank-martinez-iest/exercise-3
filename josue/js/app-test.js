/** JAVASCRIPT REDUCED IN ONE FILE TO ADD IT WHEN TESTING */
/**NO NEED TO READ IT, IT'S THE SAME CODE */
class FormValidator{
    constructor(form,fields){
        this.form = form
        this.fields = fields
    }
    initialize(){
        this.validateOnEntry()
    }
    validateOnSubmit(){
        this.fields.map(field => {
            const input = document.querySelector(`#${field}`);
            this.validateFields(input);
        });
        //If all the inputs have the class input--correct the function returns true 
        const correctInputs = this.fields.filter(field =>{
            //Check in the DOM if the field has the class input--correct
            const input = document.querySelector(`#${field}`);
            if(input.classList.contains('input--correct')){
                return field
            }
        });
        if(correctInputs.length == this.fields.length){
            // All of the fields are good to go
            return true
        }else{
            return false
        }
    }
    validateOnEntry(){
        this.fields.forEach((field)=>{
            const input = document.querySelector(`#${field}`);
            input.addEventListener('input', () => {
                this.validateFields(input);
            });
        });
    }
    validateFields(field){
        //Check that fields are not null
        if(field.value === ""){
            this.setStatus(field,`${field.name} cannot be empty`,'error');
        }
        else{
            this.setStatus(field,null,'success');
            
        }

        //Check if passwords are equal
        if(field.id === "password_confirmation"){
            //quickly check that is not empty
            if(field.value ===""){
                this.setStatus(field,'Password confirmation cannot be empty','error')
                return false
            }
            const password = document.querySelector('#password');
            if(password.value.trim() === field.value.trim()){
                //Passwords are matching
                this.setStatus(field,null,'success');
                return true;
            }else{
                this.setStatus(field,"Passwords are not matching",'error');
            }
        }
    }
    setStatus(field,message,status){
        const errormessage = field.parentElement.querySelector('.error-message');
        if(status == 'success'){
            field.classList.remove("input--incorrect");
            field.classList.add("input--correct")
            errormessage.innerText = "";
        }else{
            field.classList.remove("input--correct");
            field.classList.add("input--incorrect");
            errormessage.innerText = message;
        }
    }

}

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