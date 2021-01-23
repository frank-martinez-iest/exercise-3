   // buttons //
   const signUpButton = document.querySelector("#navbar-sign");
   const logInButton = document.querySelector("#navbar-login");

   const createButton = document.querySelector(".create__btn")

   const welcomeView = document.querySelector(".welcome-view")
   let welcomeTitle = document.querySelector(".welcome-title")
   const welcomeDescription = document.querySelector(".welcome-description")
   
   const features = document.querySelector(".features")
   // form //
   const form = document.querySelector(".form");
   const registerTitle = document.querySelector(".register-title");
   const logInTitle = document.querySelector(".login-title");

   const registerFields = Array.from(document.querySelectorAll(".register-fields"));

   const logInForm = document.querySelector(".login-form__btn");
   const formAlternative = document.querySelector(".form__alternative");

   const logInHide = [signUpButton, logInButton, createButton, welcomeView, formAlternative, ...registerFields];

   // passwords //
   const password = document.getElementById("password");
   const confirmPassword = document.getElementById("confirm-password");


// change visibility
function visibilityToggle(element){
    const elementArray = Array.isArray(element) ? element : [element]
    elementArray.forEach(element => {
        const isElementHidden = element.hasAttribute("hidden");
        isElementHidden ? element.removeAttribute("hidden") : element.setAttribute("hidden", "")
    });

}

// show register form //
function showRegister() {
    form.classList.add("form--visible");
    visibilityToggle([signUpButton, logInButton, registerTitle, welcomeView]);
    signUpButton.removeEventListener("click", showRegister);
}

signUpButton.addEventListener("click", showRegister);

// show log in form //
function showLogin(event) {
    form.classList.add("form--visible");
    const buttonClicked = event.target.id;
    buttonClicked === "navbar-login" ? visibilityToggle([logInTitle, logInForm, ...logInHide]) 
    : visibilityToggle([registerTitle, ...registerFields, createButton, formAlternative, logInTitle, logInForm]);
    logInButton.removeEventListener("click", showLogin);
}

logInButton.addEventListener("click", showLogin);
formAlternative.addEventListener("click", showLogin);

function welcomeUser(event){
    event.preventDefault();
    const username = JSON.parse(localStorage.getItem("email"));
    let password = JSON.parse(localStorage.getItem("password"));
    const formUsername = document.querySelector("#email").value;
    const formPassword =document.querySelector("#password").value
    if(formUsername ===username && formPassword===password){
        form.classList.remove("form--visible");
        features.classList.add("features--visible")
        welcomeTitle.classList.add("welcome-user");
        visibilityToggle([welcomeView, logInTitle, logInForm, welcomeDescription]);
        welcomeTitle.innerHTML = "Welcome " + username;
    }else{
        alert("Incorrect Username or Password.")
    }

    logInForm.removeEventListener("click", welcomeUser);
}

logInForm.addEventListener("click", welcomeUser)


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
            visibilityToggle([...registerFields, registerTitle, createButton, formAlternative, logInTitle, logInForm])
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



