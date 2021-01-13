   // buttons //
   const signUpButton = document.querySelector("#navbar-sign");
   const logInButton = document.querySelector("#navbar-login");

   const createButton = document.querySelector(".create-btn")

   const welcomeView = document.querySelector(".welcome-view")
   let welcomeTitle = document.querySelector(".welcome-title")
   // form //
   const form = document.querySelector(".register-form");
   const registerTitle = document.querySelector(".register-title");
   const logInTitle = document.querySelector(".login-title");

   const registerFields = Array.from(document.querySelectorAll(".register-fields"));

   const logInForm = document.querySelector(".login-form");
   const formAlternative = document.querySelector(".form-alternative");

   const registerHide = [welcomeView, signUpButton, logInButton];
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
    form.classList.add("form");
    visibilityToggle([registerHide, registerTitle]);
    // visibilityToggle(registerTitle);
    signUpButton.removeEventListener("click", showRegister);
}

signUpButton.addEventListener("click", showRegister);

// show log in form //
function showLogin() {
    form.classList.add("form");
    // visibilityToggle(logInHide);
    visibilityToggle([logInHide, logInTitle, logInForm]);
    logInButton.removeEventListener("click", showLogin);
}

logInButton.addEventListener("click", showLogin);
formAlternative.addEventListener("click", showLogin);

function welcomeUser(event){
    event.preventDefault();
    const username = JSON.parse(localStorage.getItem("email"));
    let password = JSON.parse(localStorage.getItem("password"));
    const formPassword =document.querySelector("#password").value
    const formUsername = document.querySelector("#name").value;
    if(formUsername ===username && formPassword===password){
        form.classList.remove("form");
        visibilityToggle([welcomeView, logInTitle, logInForm]);
        welcomeTitle.classList.add("welcome-user");
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



