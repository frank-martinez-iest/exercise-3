const {fireEvent, debug, screen, getByTestId, queryByTestId, waitFor, findByText} = require('@testing-library/dom')
require('@testing-library/jest-dom/extend-expect')
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

    it('shows login view when login button is cliked', () => {
        const navbarLogin = container.querySelector(".navbar-login");
        console.log("++ Login Title==",container.querySelector('.login-title').hasAttribute("hidden"));
        fireEvent.click(navbarLogin);
        expect(container.querySelector('.login-title').hasAttribute("hidden")).toBeFalsy();
        console.log("++ Login Title==",container.querySelector('.login-title').hasAttribute("hidden"));
    })
        
    it('shows welcome view when login matches localstorage', () => {
        const navbarLogin = container.querySelector(".navbar-login");
        fireEvent.click(navbarLogin);
        console.log("++ Welcome view==", container.querySelector(".welcome-view").hasAttribute("hidden"))
        const loginForm = container.querySelector(".login-form");
        let username = container.querySelector("#name");
        let password = container.querySelector("#password");
        username.innerHTML = "andrea@gmail.com";
        password.innerHTML = "123";
        fireEvent.submit(loginForm);
        
        console.log("++ Welcome view==", container.querySelector(".welcome-view").hasAttribute("hidden"))
        expect(container.querySelector(".welcome-view").hasAttribute("hidden")).toBeFalsy();
    })
    
    // it('shows welcome view when login matches localstorage', () => {
    //     const loginForm = container.querySelector(".login-form");
    //     let username = container.querySelector("#name");
    //     let password = container.querySelector("#password");
    //     username.innerHTML = "andrea@gmail.com";
    //     password.innerHTML = "123";
    //     fireEvent.submit(loginForm);
    //     expect().toBe("Welcome andrea@gmail.com");
    // })
    
})
