//Variables
const registerBtn = document.getElementById('register')
const loginBtn = document.querySelector('#login')
const registerForm = document.getElementById('registerForm')



// addEventListeners

registerBtn.addEventListener('click', showRegisterForm)

loginBtn.addEventListener('click', showLoginForm)

registerForm.addEventListener('submit', submitRegister)

// Functions

function showRegisterForm () {
  console.log('SHOW REGISTER')
  registerForm.style.display = 'flex'
}

function submitRegister (e) {
  e.preventDefault()
  
  const form = this.firstElementChild
  const password1 = form.password.value
  const password2 = form.vpassword.value

  if (password1 !== password2) {
    alert('Password does not match')
    return false
  }
  
  registerForm.style.display = 'none'


}

function showLoginForm () {
  console.log('SHOW LOGIN')
}

