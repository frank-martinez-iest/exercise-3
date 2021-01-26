const {fireEvent} = require('@testing-library/dom')
require('@testing-library/jest-dom/extend-expect')
const localStorage = require('./localStorage')
const {JSDOM} = require('jsdom') 
const fs = require('fs') 
const path = require('path'); 

const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');
let dom 
let window;
let document;
let container;
let scriptElement;

describe('index.html', () => {
    beforeEach(() => {
        const scriptContent = fs.readFileSync(path.resolve(__dirname,'app-test.js'),'utf-8');
        dom = new JSDOM(html, {runScripts :'dangerously'});
        window = dom.window;
        document = window.document;
        container = dom.window.document.body;
        scriptElement = document.createElement('script');
        scriptElement.textContent = scriptContent;
        document.body.appendChild(scriptElement);
    });
    

    it('verify that first content is the Welcome View', () => {
        const welcomeView = container.querySelector(".welcome-view");
        expect(welcomeView.hasAttribute("hidden")).toBeFalsy();
    })

    it('shows register view when login button is cliked', () => {
        const navbarSign = container.querySelector(".navbar-sign");
        const registerTitle = container.querySelector('.register-title')
        const form = container.querySelector(".form");
        fireEvent.click(navbarSign);
        expect(registerTitle.hasAttribute("hidden")).toBeFalsy();
        expect(form.classList.contains("form--visible")).toBeTruthy();
    })

    it('shows login view when login button is cliked', () => {
        const navbarLogin = container.querySelector(".navbar-login");
        const loginTitle = container.querySelector('.login-title')
        const form = container.querySelector(".form")
        fireEvent.click(navbarLogin);
        expect(loginTitle.hasAttribute("hidden")).toBeFalsy();
        expect(form.classList.contains("form--visible")).toBeTruthy();
    })

    describe('local storage test', ()=>{
        let navbarLogin;
        let formLoginBtn;
        let username;
        let password;

        beforeEach( ()=>{
            navbarLogin = container.querySelector(".navbar-login");
            fireEvent.click(navbarLogin);
            formLoginBtn = container.querySelector(".login-form__btn");
            username = container.querySelector("#name");
            password = container.querySelector("#password");
            username.innerHTML = "andrea@gmail.com";
            password.innerHTML = "123";
        })

        it('checks that local storage is initialized properly', () => expect(localStorage.store).toEqual({}));

        it ("checks that local storage was saved", () => {
            const signUpButton = container.querySelector("#navbar-sign");
            const INITIAL_BALANCE = "0";
            fireEvent.click(signUpButton)
            const userEmail =  "a@gmail.com";
            const userPassword = "123";
            const userBalance = INITIAL_BALANCE;
            localStorage.setItem("email", userEmail);
            localStorage.setItem("password", userPassword);
            localStorage.setItem("balance", userBalance);
            expect(localStorage.store).toEqual({email: userEmail, password: userPassword, balance: userBalance});
            expect(localStorage.getItem("email")).toEqual("a@gmail.com");
            expect(localStorage.getItem("balance")).toEqual("0");
            expect(localStorage.getItem("address")).toEqual(undefined);
        });
    
        it('shows welcome view when login matches localstorage', () => {
            const form = container.querySelector(".form")
            expect(username.innerHTML).toEqual("andrea@gmail.com");
            expect(password.innerHTML).toEqual("123")
            fireEvent.click(formLoginBtn)
            expect(form.classList.contains("form--visible")).toBeFalsy();
            expect(container.querySelector(".welcome-view").hasAttribute("hidden")).toBeFalsy();
            expect(container.querySelector(".welcome-description").hasAttribute("hidden")).toBeTruthy();
        })
       
        it("checks that balance description is added and that transfer and withdraw buttons are disabled if balance is 0", () => {
            fireEvent.click(formLoginBtn)
            expect(container.querySelector(".balance-description")).toBeInTheDocument();
            expect(container.querySelector(".balance-description").innerHTML).toEqual("Your balance is $0.00")
            expect(container.querySelector("#withdraw-btn").hasAttribute("disabled")).toBeTruthy();
            expect(container.querySelector("#transfer-btn").hasAttribute("disabled")).toBeTruthy();
         })
    })

   
});
