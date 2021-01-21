    // buttons //
    const signUpButton = document.querySelector("#navbar-sign");
    const logInButton = document.querySelector("#navbar-login");

    const createButton = document.querySelector(".create__btn")

    const welcomeView = document.querySelector(".welcome-view")
    let welcomeTitle = document.querySelector(".welcome-title")
    // form //
    const form = document.querySelector(".form");
    const registerTitle = document.querySelector(".register-title");
    const logInTitle = document.querySelector(".login-title");

    const registerFields = Array.from(document.querySelectorAll(".register-fields"));

    const logInForm = document.querySelector(".login-form__btn");
    const formAlternative = document.querySelector(".form__alternative");

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
        form.classList.add("form--visibility");
        // visibilityToggle(registerHide);
        visibilityToggle([form, registerTitle,...registerHide]);
        signUpButton.removeEventListener("click", showRegister);
    }

    signUpButton.addEventListener("click", showRegister);

    // show log in form //
    function showLogin() {
        form.classList.add("form--visibility");
        // visibilityToggle(logInHide);
        visibilityToggle([form, logInTitle, logInForm, ...logInHide]);
        logInButton.removeEventListener("click", showLogin);
    }

    logInButton.addEventListener("click", showLogin);
    formAlternative.addEventListener("click", showLogin);

    function welcomeUser(event){
        event.preventDefault();
        const username = "andrea@gmail.com";
        const password = "123";
        const formPassword =document.querySelector("#password").innerHTML
        const formUsername = document.querySelector("#name").innerHTML;
        if(formUsername ===username && formPassword===password){
            form.classList.remove("form--visibility");
            welcomeTitle.classList.add("welcome-user");
            visibilityToggle([welcomeView, form, logInTitle, logInForm]);
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

