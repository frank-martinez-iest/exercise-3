const APP_BUTTONS = {
  NAV_LOGIN: document.querySelector("#navLogin"),
  NAV_SIGN_UP: document.querySelector("#navSignUp"),
  SHOW_LOGIN: document.querySelector("#showLogin"),
  SHOW_SIGN_UP: document.querySelector("#showSignUp"),
  LOGIN_CANCEL: document.querySelector("#loginCancel"),
  SIGN_UP_CANCEL: document.querySelector("#signUpCancel"),
  SUBMIT_LOGIN: document.querySelector("#submitLogin"),
  SUBMIT_SIGN_UP: document.querySelector("#submitSignUp"),
};

const APP_SECTIONS = {
  WELCOME_WRAPPER: document.querySelector("#welcomeWrapper"),
  LOGIN_WRAPPER: document.querySelector("#loginWrapper"),
  SIGN_UP_WRAPPER: document.querySelector("#signUpWrapper"),
  MOVEMENTS_WRAPPER: document.querySelector("#movementsWrapper"),
};

const APP_FORMS = {
  LOGIN_FORM: document.querySelector("#loginForm"),
  SIGN_UP_FORM: document.querySelector("#signUpForm"),
};

const APP_SPAN = {
  USER_NAME: document.querySelector("#userLoggedName"),
  USER_BALANCE: document.querySelector("#userBalance"),
};

function toggleVisibility(...elements) {
  elements.forEach((element) => {
    const isElementHidden = element.hasAttribute("hidden");
    isElementHidden
      ? element.removeAttribute("hidden")
      : element.setAttribute("hidden", "");
  });
}

function setViewSection(elementViewed) {
  for (const section in APP_SECTIONS) {
    APP_SECTIONS[section] === elementViewed
      ? APP_SECTIONS[section].removeAttribute("hidden")
      : APP_SECTIONS[section].setAttribute("hidden", "");
  }
}

function setClickHandlers(callback, ...buttons) {
  buttons.forEach((button) => button.addEventListener("click", callback));
}

function parseFormData(form) {
  const data = {};
  const formData = new FormData(form);
  for (let formFields of formData) {
    data[formFields[0]] = formFields[1];
  }
  return data;
}

function submitSignUp(event) {
  event.preventDefault();
  const userData = parseFormData(APP_FORMS.SIGN_UP_FORM);
  userData.balance = 0;
  localStorage.setItem(userData.username, JSON.stringify(userData));
  toggleVisibility(APP_SECTIONS.LOGIN_WRAPPER, APP_SECTIONS.SIGN_UP_WRAPPER);
}

function login(e) {
  e.preventDefault();
  const loginData = parseFormData(APP_FORMS.LOGIN_FORM);
  const signUpData = JSON.parse(localStorage.getItem(loginData.username));

  loginData.balance = signUpData.balance;

  allowLogin(loginData, signUpData);
}

function allowLogin(loginData, signUpData) {
  const isUserRegistered =
    loginData.username === signUpData.username &&
    loginData.password === signUpData.password;
  if (isUserRegistered) {
    showUserInformation(loginData);
  } else {
    // Feedback error
  }
}

function showUserInformation(user) {
  APP_SPAN.USER_NAME.textContent = user.username;
  APP_SPAN.USER_BALANCE.textContent = formatter.format(user.balance);
  toggleVisibility(APP_SECTIONS.MOVEMENTS_WRAPPER, APP_SECTIONS.LOGIN_WRAPPER);
}

function reloadPage() {
  history.go(0);
}

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

function initialize() {
  setClickHandlers(() => {
    toggleVisibility(APP_SECTIONS.LOGIN_WRAPPER, APP_SECTIONS.WELCOME_WRAPPER);
  }, APP_BUTTONS.SHOW_LOGIN);
  setClickHandlers(() => {
    toggleVisibility(
      APP_SECTIONS.SIGN_UP_WRAPPER,
      APP_SECTIONS.WELCOME_WRAPPER
    );
  }, APP_BUTTONS.SHOW_SIGN_UP);
  setClickHandlers(() => {
    setViewSection(APP_SECTIONS.LOGIN_WRAPPER);
  }, APP_BUTTONS.NAV_LOGIN);
  setClickHandlers(() => {
    setViewSection(APP_SECTIONS.SIGN_UP_WRAPPER);
  }, APP_BUTTONS.NAV_SIGN_UP);
  setClickHandlers(
    reloadPage,
    APP_BUTTONS.LOGIN_CANCEL,
    APP_BUTTONS.SIGN_UP_CANCEL
  );

  APP_FORMS.SIGN_UP_FORM.onsubmit = submitSignUp;

  APP_FORMS.LOGIN_FORM.addEventListener("submit", login);

  toggleVisibility(
    APP_SECTIONS.LOGIN_WRAPPER,
    APP_SECTIONS.SIGN_UP_WRAPPER,
    APP_SECTIONS.MOVEMENTS_WRAPPER
  );
}

initialize();
