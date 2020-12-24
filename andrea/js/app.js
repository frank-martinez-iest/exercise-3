// buttons //
var signUp = document.querySelector(".navbar-sign");
var logIn = document.querySelector(".navbar-login");

var create_btn = document.querySelector(".create-btn");

// form //
var form = document.querySelector(".register-form");

// passwords //
var password = document.getElementById("password");
var confirm_password = document.getElementById("confirm-password");

// show register form //
function showRegister() {
    document.querySelector(".title").style.display = "none";
    document.querySelector(".description").style.display = "none";
    signUp.style.display = "none";
    logIn.style.display = "none";
    form.classList.add("form__show");
    document.querySelector(".register-title").style.display = "flex";
    signUp.removeEventListener("click", showRegister);
}

signUp.addEventListener("click", showRegister);


// show log in form //

function showLogin() {
    signUp.style.display = "none";
    logIn.style.display = "none";
    form.classList.add("form__show");
    document.querySelector(".login-title").style.display = "flex";
    document.querySelector(".title").style.display = "none";
    document.querySelector(".description").style.display = "none";
    document.querySelector("#phone-number").style.display = "none";
    document.querySelector("#email").style.display = "none";
    document.querySelector("#confirm-password").style.display = "none";
    document.querySelector(".create-btn").style.display = "none";
    document.querySelector(".login-btn").classList.add("primary-btn");  
    document.querySelector(".login-btn").classList.remove("secondary-btn");  
    document.querySelector(".form-alternative").style.display = "none";

    logIn.removeEventListener("click", showLogin);
}

logIn.addEventListener("click", showLogin);

// create account button //

create_btn.addEventListener("click", ()=> {
    console.log("Create Account button clicked");
})

// validate password //

function validatePassword(){
    if(password.value != confirm_password.value){
        confirm_password.setCustomValidity("Passwords Don't Match");
    }else {
        confirm_password.setCustomValidity('');
    }
}

password.onchange = validatePassword;
confirm_password.onkeyup = validatePassword;
