
const {fireEvent, debug, getByText, findByText} = require('@testing-library/dom')
require('@testing-library/jest-dom')
const {JSDOM} = require('jsdom') 
const fs = require('fs') 
const path = require('path'); 

const html = fs.readFileSync('./index.html', 'utf8' );
let dom;
let container;

describe('/index.html', () => {
    beforeEach(()=> {
    dom = new JSDOM(html, {runScripts: 'dangerously'});
    container = dom.window.document.body;
    });

    it('show login view when button is clicked', async() =>{
        const navbarLogin = container.querySelector(".navbar-login");
        fireEvent.click(navbarLogin);
        const loginForm = container.querySelector(".login-form");
        const loginFormStyle = getComputedStyle(container.querySelector(".login-form"));
        const loginFormStyleDisplay = loginFormStyle.getPropertyValue('display');
        expect(loginFormStyleDisplay).not.toBe("none");
    });

    it('show welcome view when login is cliked', async() => {
        const loginForm = container.querySelector(".login-form");
        let username = container.querySelector("#name");
        let password = container.querySelector("#password");
        username.innerHTML = "andrea@gmail.com";
        password.innerHTML = "123";
        fireEvent.click(loginForm);
        let welcomeTitle = container.querySelector(".welcome-title").innerHTML;
        expect(welcomeTitle).toContain("Welcome andrea@gmail.com");
        // expect(welcomeTitle).toBeInTheDocument()
    });
})


