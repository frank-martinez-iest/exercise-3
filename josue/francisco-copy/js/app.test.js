const {fireEvent, getByTestId, screen} = require('@testing-library/dom');
require('@testing-library/jest-dom/extend-expect');
const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');

const App = require('./app-utils.js');

let dom;
let document;
let AppElements;

describe('index.html', () => {
  beforeEach(() => {
    dom = new JSDOM(html, { runScripts: 'dangerously' });
    document = dom.window.document;
    // Give context to our App Buttons
    App.setContext(document);
    AppElements = App.createAppElements();
  })
  it('shows the welcomeWrapper visible', () => {
    expect(document.querySelector('#welcomeWrapper')).not.toBeNull();
    expect(document.querySelector('#welcomeWrapper').hasAttribute("hidden")).toBeFalsy();
  })
  it('hides welcome wrapper when you click on login button', async() => {
    // screen.debug(getByTestId(document, "welcome-wrapper"));
    fireEvent.click(document.querySelector('#showLogin'));
    expect(document.querySelector('#welcomeWrapper').hasAttribute("hidden")).toBeTruthy();
  })
  it('should not keep the same form type in UI when clicking the contrary form type', async()=>{
    // Welcome is the first element to always appear
    expect(AppElements.SECTIONS.WELCOME_WRAPPER.hasAttribute('hidden')).toBeFalsy();
    console.log(AppElements.BUTTONS);
    /* WE CLICK THE SHOW LOGIN BTN*/
    fireEvent.click(AppElements.BUTTONS.SHOW_LOGIN);
    expect(AppElements.SECTIONS.LOGIN_WRAPPER.hasAttribute('hidden')).toBeFalsy();

    /* In case we click Sign Up after login, login should not be on screen, neither welcome*/
    fireEvent.click(AppElements.BUTTONS.NAV_SIGN_UP);
    expect(AppElements.SECTIONS.LOGIN_WRAPPER.hasAttribute('hidden')).toBeTruthy();
    expect(AppElements.SECTIONS.WELCOME_WRAPPER.hasAttribute('hidden')).toBeTruthy();

    /* Now let's make the same process but vice versa*/
    fireEvent.click(AppElements.BUTTONS.NAV_SIGN_UP);
    expect(AppElements.SECTIONS.SIGN_UP_WRAPPER.hasAttribute('hidden')).toBeFalsy();

    /* In case we click Sign Up after login, login should not be on screen, neither welcome*/
    fireEvent.click(AppElements.BUTTONS.NAV_LOGIN);
    expect(AppElements.SECTIONS.SIGN_UP_WRAPPER.hasAttribute('hidden')).toBeTruthy();
    expect(AppElements.SECTIONS.WELCOME_WRAPPER.hasAttribute('hidden')).toBeTruthy();
    
  })
});