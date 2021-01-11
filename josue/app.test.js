import { fireEvent, getByText, getById, getAllByText, getNodeText, getByLabelText, getByPlaceholderText} from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';
import { JSDOM } from 'jsdom';
import fs  from 'fs';
import path  from 'path';
import { async } from 'regenerator-runtime';

const html = fs.readFileSync(path.resolve(__dirname,'./index.html'),'utf-8');

let dom
let window
let document
let container
let scriptElement

describe('Unit test login feature',()=>{
    beforeEach(()=> {
        const scriptContent = fs.readFileSync(path.resolve(__dirname,'./js/app-test.js'),'utf-8');
        dom = new JSDOM(html, {runScripts :'dangerously'});
        window = dom.window;
        document = window.document;
        container = dom.window.document.body;
        scriptElement = document.createElement('script');
        scriptElement.textContent = scriptContent;
        document.head.appendChild(scriptElement);
    });
    it('should save to localStorage',()=>{
        const dummyUser = {"name":"Juan Lopez","phone":"8332041352","email":"juanperez@gmail.com","password":"12345","password_confirmation":"12345"}
        localStorage.setItem('8332041352', dummyUser);
        expect(localStorage.setItem).toHaveBeenLastCalledWith('8332041352',dummyUser);
        console.log('++localstorage: ',localStorage)
    });

    it('renders Sign In form',()=>{
        expect(container.querySelector('#form')).toBeInTheDocument();
    });
    it('returns error message when user submits an empty form',async () => {
       const loginBtn = getByText(container, 'Sign In');
       await fireEvent.click(loginBtn);

       const errorMessageElement = await container.querySelector('.error-message');
       expect(errorMessageElement.innerText).not.toBe('')
    });
    it('must not contain register fields',()=>{
        /* REGISTER FIELDS DIV*/
        expect(container.querySelector('#register-fields')).not.toBeInTheDocument();
    });
    it('updates submit btn when register btn gets clicked', async()=>{
        const registerBtn = getByText(container,'Register');
        fireEvent.click(registerBtn);
        
        expect(container.querySelector('#submit').innerText).toBe('Register');
    });
    it('adds register fields when register btn gets clicked',async()=>{
        const registerBtn = getByText(container,'Register');
        fireEvent.click(registerBtn);
        /* REGISTER FIELDS DIV*/
        expect(container.querySelector('#register-fields')).not.toBeNull();
        /* Email Field*/
        expect(getByText(container, 'Email')).toBeInTheDocument();
        /* Password Field*/
        expect(getByText(container,'Password')).toBeInTheDocument();
        /* Password confirmation Field*/
        expect(getByText(container, 'Confirm Password')).toBeInTheDocument();
    });
    it('shows error message when register fields are empty',async()=>{
        const registerBtn = getByText(container,'Register');
        fireEvent.click(registerBtn);
        await fireEvent.click(registerBtn);

       const errorMessageElement = await container.querySelector('.error-message');
       expect(errorMessageElement.innerText).not.toBe('')

    });
})