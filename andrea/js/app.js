// buttons //
const signUpButton = document.querySelector("#navbar-sign");
const logInButton = document.querySelector("#navbar-login");

const createButton = document.querySelector(".create-btn")

const welcomeView = document.querySelector(".welcome-view")

// form //
const form = document.querySelector(".register-form");
const registerTitle = document.querySelector(".register-title");
const logInTitle = document.querySelector(".login-title");

const registerFields = Array.from(document.querySelectorAll(".register-fields"));

const logInForm = document.querySelector(".login-form");
const formAlternative = document.querySelector(".form-alternative");

const registerHide = [welcomeView, signUpButton, logInButton];
const logInHide = [registerTitle, signUpButton, logInButton, createButton, welcomeView, formAlternative, ...registerFields];
// logInHide = logInHide.concat(registerFields);

// passwords //
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm-password");

// change visibility
function visibilityToggle(element, method, classname){
    const elementArray = Array.isArray(element) ? element : [element]
    // if (!Array.isArray(element)){
    //     elementArray = [element]
    // }else{
    //     elementArray = element;
    // }
    elementArray.forEach(element => {
        method === "add" ? element.classList.add(classname) : element.classList.remove(classname)
    })

}

// show register form //
function showRegister() {
    visibilityToggle(registerHide, "add", "hidden");
    visibilityToggle(form, "add", "form");
    visibilityToggle(registerTitle, "remove", "hidden");
    signUpButton.removeEventListener("click", showRegister);
}

signUpButton.addEventListener("click", showRegister);

// show log in form //
function showLogin() {
    visibilityToggle(form, "add", "form");
    visibilityToggle(logInHide, "add", "hidden");
    visibilityToggle([logInTitle, logInForm], "remove", "hidden");
    logInButton.removeEventListener("click", showLogin);
}

logInButton.addEventListener("click", showLogin);
formAlternative.addEventListener("click", showLogin);

// create account button //

function createAccount(event){
    event.preventDefault();
    const credentials = {
        "email": document.querySelector("#email").value,
        "password": document.querySelector("#password").value
    };

    if (JSON.stringify(credentials.email) !== ''){
        if (JSON.stringify(credentials.email) === localStorage.getItem('email')){
            alert("already registered");
            return;
        }else{
            // local storage //
            localStorage.setItem('email', JSON.stringify(credentials.email));
            localStorage.setItem('password', JSON.stringify(credentials.password));
            showLogin();
        }
    }
    createButton.removeEventListener("click", createAccount);
}
createButton.addEventListener("click", createAccount);

// validate password //

function validatePassword(){
    if(password.value !== confirmPassword.value){
        confirmPassword.setCustomValidity("Passwords don't match");
    }else {
        confirmPassword.setCustomValidity('');
    }
}

password.onchange = validatePassword;
confirmPassword.onkeyup = validatePassword;



