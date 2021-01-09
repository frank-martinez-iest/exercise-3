const {fireEvent, getByTestId, screen} = require('@testing-library/dom');
require('@testing-library/jest-dom/extend-expect');
const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');

let dom;
let container;

describe('index.html', () => {
  beforeEach(() => {
    dom = new JSDOM(html, { runScripts: 'dangerously' });
    container = dom.window.document;
  })
  it('shows the welcomeWrapper visible', () => {
    expect(container.querySelector('#welcomeWrapper')).not.toBeNull();
    expect(container.querySelector('#welcomeWrapper').hasAttribute("hidden")).toBeFalsy();
  })
  it('hides welcome wrapper when you click on login button', async() => {
    // screen.debug(getByTestId(container, "welcome-wrapper"));
    fireEvent.click(container.querySelector('#showLogin'));
    expect(container.querySelector('#welcomeWrapper').hasAttribute("hidden")).toBeTruthy();
  })
});