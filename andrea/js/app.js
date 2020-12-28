// buttons //
let signUpButton = document.querySelector("#navbar-sign");
let logInButton = document.querySelector("#navbar-login");

let createButton = document.querySelector(".create-btn")

let welcomeView = document.querySelector(".welcome-view")

// form //
let form = document.querySelector(".register-form");
let registerTitle = document.querySelector(".register-title");
let logInTitle = document.querySelector(".login-title");

let registerFields = Array.from(document.querySelectorAll(".register-fields"));


let logInForm = document.querySelector(".login-form");
let formAlternative = document.querySelector(".form-alternative");

let registerHide = [welcomeView, signUpButton, logInButton];
let logInHide = [registerTitle, signUpButton, logInButton, createButton, welcomeView, formAlternative];
logInHide = logInHide.concat(registerFields);

// passwords //
let password = document.getElementById("password");
let confirmPassword = document.getElementById("confirm-password");

// change visibility
function visibilityToggle(element, method, classname){
    if (Array.isArray(element)){
        element.forEach(element => {
            method === "add" ? element.classList.add(classname) : element.classList.remove(classname)
        })
    }else{
        method === "add" ? element.classList.add(classname) : element.classList.remove(classname)
    }

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
    let userEmail = document.querySelector("#email").value;
    let userPassword = document.querySelector("#password").value;

    if (userEmail !== ''){
        if (userEmail === localStorage.getItem('email')){
            alert("already registered");
        }else{
            // local storage //
            localStorage.setItem('email', userEmail);
            localStorage.setItem('password', userPassword);
            showLogin();
        }
    }
    event.preventDefault();
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



