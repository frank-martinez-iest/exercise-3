const App = {
    context : undefined,
    setContext(context){
        this.context = context;
    },
    createAppElements(){
        return ({
            BUTTONS: {
                NAV_LOGIN: this?.context.querySelector("#navLogin"),
                NAV_SIGN_UP: this?.context.querySelector("#navSignUp"),
                SHOW_LOGIN: this?.context.querySelector("#showLogin"),
                SHOW_SIGN_UP: this?.context.querySelector("#showSignUp"),
                LOGIN_CANCEL: this?.context.querySelector("#loginCancel"),
                SIGN_UP_CANCEL: this?.context.querySelector("#signUpCancel"),
                SUBMIT_LOGIN: this?.context.querySelector("#submitLogin"),
                SUBMIT_SIGN_UP: this?.context.querySelector("#submitSignUp"),
            },
            SECTIONS: {
                WELCOME_WRAPPER: this?.context.querySelector("#welcomeWrapper"),
                LOGIN_WRAPPER: this?.context.querySelector("#loginWrapper"),
                SIGN_UP_WRAPPER: this?.context.querySelector("#signUpWrapper"),
            },    
            FORMS:{
                LOGIN_FORM: this?.context.querySelector("#loginForm"),
                SIGN_UP_FORM: this?.context.querySelector("#signUpForm"),
            },
        })
    }
}
module.exports = App