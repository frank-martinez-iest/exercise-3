// buttons //
let signUpButton = document.querySelector("#navbar-sign");
let logInButton = document.querySelector("#navbar-login");

let createButton = document.querySelector(".create-btn")

let welcomeView = document.querySelector(".welcome-view")

// form //
let form = document.querySelector(".register-form");
let registerTitle = document.querySelector(".register-title");
let logInTitle = document.querySelector(".login-title");
let registerFields = document.querySelectorAll(".register-fields");

let logInForm = document.querySelector(".login-form");
let formAlternative = document.querySelector(".form-alternative");

// passwords //
let password = document.getElementById("password");
let confirmPassword = document.getElementById("confirm-password");

// show register form //
function showRegister() {
    welcomeView.classList.add("hidden");
    signUpButton.classList.add("hidden");
    logInButton.classList.add("hidden");
    form.classList.add("form__show");
    registerTitle.classList.remove("hidden");
    signUpButton.removeEventListener("click", showRegister);
}

signUpButton.addEventListener("click", showRegister);

// show log in form //
function showLogin() {
    form.classList.add("form__show");
    registerTitle.classList.add("hidden");
    signUpButton.classList.add("hidden");
    logInButton.classList.add("hidden");
    createButton.classList.add("hidden");
    welcomeView.classList.add("hidden");
    formAlternative.classList.add("hidden");
    logInTitle.classList.remove("hidden");
    logInForm.classList.add("primary-btn");
    logInForm.classList.remove("secondary-btn");

    registerFields.forEach(element => {
        element.classList.add("hidden");
    });

    logInButton.removeEventListener("click", showLogin);
}

logInButton.addEventListener("click", showLogin);
logInForm.addEventListener("click", showLogin);

// create account button //

createButton.addEventListener("click", ()=> {
    console.log("Create Account button clicked");
})

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
