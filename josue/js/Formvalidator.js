export default class FormValidator{
    constructor(form,fields){
        this.form = form
        this.fields = fields
    }
    initialize(){
        this.validateOnEntry()
    }
    validateOnSubmit(){
        this.fields.map(field => {
            const input = document.querySelector(`#${field}`);
            this.validateFields(input);
        });
        //If all the inputs have the class input--correct the function returns true 
        const correctInputs = this.fields.filter(field =>{
            //Check in the DOM if the field has the class input--correct
            const input = document.querySelector(`#${field}`);
            if(input.classList.contains('input--correct')){
                return field
            }
        });
        if(correctInputs.length == this.fields.length){
            // All of the fields are good to go
            return true
        }else{
            return false
        }
    }
    validateOnEntry(){
        this.fields.forEach((field)=>{
            const input = document.querySelector(`#${field}`);
            input.addEventListener('input', () => {
                this.validateFields(input);
            });
        });
    }
    validateFields(field){
        //Check that fields are not null
        if(field.value === ""){
            this.setStatus(field,`${field.name} cannot be empty`,'error');
        }
        else{
            this.setStatus(field,null,'success');
            
        }

        //Check if passwords are equal
        if(field.id === "password_confirmation"){
            //quickly check that is not empty
            if(field.value ===""){
                this.setStatus(field,'Password confirmation cannot be empty','error')
                return false
            }
            const password = document.querySelector('#password');
            if(password.value.trim() === field.value.trim()){
                //Passwords are matching
                this.setStatus(field,null,'success');
                return true;
            }else{
                this.setStatus(field,"Passwords are not matching",'error');
            }
        }
    }
    setStatus(field,message,status){
        const errormessage = field.parentElement.querySelector('.error-message');
        if(status == 'success'){
            field.classList.remove("input--incorrect");
            field.classList.add("input--correct")
            errormessage.innerText = "";
        }else{
            field.classList.remove("input--correct");
            field.classList.add("input--incorrect");
            errormessage.innerText = message;
        }
    }

    parseFormData(){
        const myObjectFromForm = {}
        this.fields.forEach(field => {
            const input = document.querySelector(`#${field}`)
            myObjectFromForm[field] = input.value;
        })
        return myObjectFromForm
    }
}