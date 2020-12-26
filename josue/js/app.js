const signInBtn = document.querySelector("#sign");
const register = document.querySelector("#register");
const registerForm = {} ;

const registerUser = () =>{
    event.preventDefault();
    console.log("User is now registered");
}
const handleChange = (e)=>{
    const inputField = e.target.id;
    const inputValue = e.target.value;
    registerForm[inputField] = inputValue;
    console.table(registerForm)
}
signInBtn.addEventListener("click",()=>{
    console.log("You clicked sign in !!!!!")
})
register.addEventListener("click",()=>{
    console.log("YOu clicked register button!!!!");
})
