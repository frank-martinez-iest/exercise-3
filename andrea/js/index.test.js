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
        document.head.appendChild(scriptElement);
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
        expect(form.hasAttribute("hidden")).toBeFalsy();
    })

    it('shows login view when login button is cliked', () => {
        const navbarLogin = container.querySelector(".navbar-login");
        const loginTitle = container.querySelector('.login-title')
        const form = container.querySelector(".form")
        fireEvent.click(navbarLogin);
        expect(loginTitle.hasAttribute("hidden")).toBeFalsy();
        expect(form.hasAttribute("hidden")).toBeFalsy();
    })

    it('cheks that local storage is initialized properly', () => expect(localStorage.store).toEqual({}));

        
    it ("checks that local storage was saved", () => {
        const signUpButton = container.querySelector("#navbar-sign");
        fireEvent.click(signUpButton)
        let userEmail =  "a@gmail.com"
        let userPassword ="123"
        localStorage.setItem('email', userEmail);
        localStorage.setItem('password', userPassword);
        expect(localStorage.store).toEqual({email: userEmail, password: userPassword});
    });

    it('shows welcome view when login matches localstorage', () => {
        const navbarLogin = container.querySelector(".navbar-login");
        fireEvent.click(navbarLogin);
        const formLoginBtn = container.querySelector(".form-login__btn");
        let username = container.querySelector("#name");
        let password = container.querySelector("#password");
        username.innerHTML = "andrea@gmail.com";
        password.innerHTML = "123";
        expect(username.innerHTML).toEqual("andrea@gmail.com");
        expect(password.innerHTML).toEqual("123")
        fireEvent.click(formLoginBtn)
        expect(container.querySelector(".form").hasAttribute("hidden")).toBeTruthy();
        expect(container.querySelector(".welcome-view").hasAttribute("hidden")).toBeFalsy();
    })
   

});
    