    // buttons //
    const signUpButton = document.querySelector("#navbar-sign");
    const logInButton = document.querySelector("#navbar-login");

    const createButton = document.querySelector(".create__btn")

    const welcomeView = document.querySelector(".welcome-view")
    let welcomeTitle = document.querySelector(".welcome-title")
    const welcomeDescription = document.querySelector(".welcome-description")

    // features
const features = document.querySelector(".features")
const withdrawButton = document.querySelector("#withdraw-btn")
const transferButton = document.querySelector("#transfer-btn");

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
        // visibilityToggle([form, registerTitle,...registerHide]);
        visibilityToggle([signUpButton, logInButton, registerTitle, welcomeView]);
        signUpButton.removeEventListener("click", showRegister);
    }

    signUpButton.addEventListener("click", showRegister);

    // show log in form //
    function showLogin(event) {
        const buttonClicked = event.target.id;
        form.classList.add("form--visibility");
        // visibilityToggle(logInHide);
        // visibilityToggle([form, logInTitle, logInForm, ...logInHide]);
        if (buttonClicked==="navbar-login"){
            visibilityToggle([logInTitle, logInForm, ...logInHide]);
        } else {
            visibilityToggle([registerTitle, ...registerFields, createButton, formAlternative, logInTitle, logInForm]);
        }
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
            features.classList.add("features--visibility")
            welcomeTitle.classList.add("welcome-user");
            visibilityToggle([features, welcomeView, logInTitle, logInForm, welcomeDescription]);
            welcomeTitle.innerHTML = "Welcome " + username;
            manageBalance();
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
            "password": document.querySelector("#password").value,
            "balance": "0"
        };

        if (JSON.stringify(credentials.email) !== ''){
            if (JSON.stringify(credentials.email) === localStorage.getItem('email')){
                alert("already registered");
                return;
            }else{
                // local storage //
                localStorage.setItem('email', JSON.stringify(credentials.email));
                localStorage.setItem('password', JSON.stringify(credentials.password));
                localStorage.setItem("balance", JSON.stringify(credentials.balance));
                // showLogin();
                visibilityToggle([...registerFields, registerTitle, createButton, formAlternative, logInTitle, logInForm])
            }
        }
        createButton.removeEventListener("click", createAccount);
    }
    createButton.addEventListener("click", createAccount);

    // manage user's balance 
    function manageBalance(){
        // let balance = parseFloat(JSON.parse(localStorage.getItem("balance")));
        let balance = "0"
        const roundedBalance = (Math.round(balance*100)/100).toFixed(2);
        let showBalance = document.createElement("p");
        welcomeView.appendChild(showBalance);
        showBalance.classList.add("balance-description");
        showBalance.innerHTML="Your balance is $" + roundedBalance;

        if (balance === "0"){
            withdrawButton.setAttribute("disabled","");
            transferButton.setAttribute("disabled","");
        } else {   }
    }
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

