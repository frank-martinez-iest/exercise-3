//Variables
const register = document.getElementById('register')
const login = document.querySelector('#login')

// addEventListeners

register.addEventListener('click', showRegisterForm)

login.addEventListener('click', showLoginForm)

// Functions

function showRegisterForm () {
  console.log('SHOW REGISTER')
}

function showLoginForm () {
  console.log('SHOW LOGIN')
}

