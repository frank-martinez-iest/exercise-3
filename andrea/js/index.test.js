const {fireEvent} = require('@testing-library/dom')
require('@testing-library/jest-dom/extend-expect')
const localStorage = require('./localStorage')
const {JSDOM} = require('jsdom') 
const fs = require('fs') 
const path = require('path'); 

const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');
let dom;
let container;

describe('index.html', () => {
    beforeEach(() => {
        dom = new JSDOM(html, {runScripts: 'dangerously', resources: 'usable'});
        container = dom.window.document;
    })

    it('verify that first content is the Welcome View', () => {
        const welcomeView = container.querySelector(".welcome-view");
        expect(welcomeView.hasAttribute("hidden")).toBeFalsy();
    })

    it('shows register view when login button is cliked', () => {
        const navbarSign = container.querySelector(".navbar-sign");
        const registerTitle = container.querySelector('.register-title')
        fireEvent.click(navbarSign);
        expect(registerTitle.hasAttribute("hidden")).toBeFalsy();
    })

    it('shows login view when login button is cliked', () => {
        const navbarLogin = container.querySelector(".navbar-login");
        const loginTitle = container.querySelector('.login-title')
        fireEvent.click(navbarLogin);
        expect(loginTitle.hasAttribute("hidden")).toBeFalsy();
    })

    it('cheks that local storage is initialized properly', () => expect(localStorage.store).toEqual({}));

        
    it ("checks that local storage was saved", () => {
        const signUpButton = container.querySelector("#navbar-sign");
        fireEvent.click(signUpButton)
        let userEmail =  "a@gmail.com"
        let userPassword ="123"
        localStorage.setItem('email', userEmail);
        localStorage.setItem('password', userPassword)
        expect(localStorage.store).toEqual({email: userEmail, password: userPassword});
    });

    it('shows welcome view when login matches localstorage', () => {
        const navbarLogin = container.querySelector(".navbar-login");
        fireEvent.click(navbarLogin);
        const loginForm = container.querySelector(".login-form");
        let username = container.querySelector("#name");
        let password = container.querySelector("#password");
        username.innerHTML = "andrea@gmail.com";
        password.innerHTML = "123";
        fireEvent.click(loginForm)
        expect(container.querySelector(".welcome-view").hasAttribute("hidden")).toBeFalsy();
    })
   

});
    