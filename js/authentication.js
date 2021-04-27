let header = document.querySelector(".header");

let toSignInButton = document.querySelector(".js-button--signIn");
let toSignUpButton = document.querySelector(".js-button--signUp");
let signOutButton = document.querySelector(".js-signout");

let containerTasks = document.querySelector(".js-containerTasks");
let containerSignIn = document.querySelector(".js-containerSignIn");
let containerSignUp = document.querySelector(".js-containerSignUp");
let containerMain = document.querySelector(".js-containerMain");

let mainButtons = document.querySelectorAll(".button");

let signUpForm = document.querySelector(".js-signupForm");
let signInForm = document.querySelector(".js-signinForm");

const checkUser = () => {
  if (localStorage.getItem('user')) {
    header.classList.toggle("header-centered");
    header.innerText = "Lista Zadań";
    toSignInButton.classList.toggle("hidden");
    containerTasks.classList.toggle("hidden");
    containerMain.classList.toggle("hidden");
  }
}

function signupUser() {
  let email = document.querySelector('#signupEmail').value;
  let name = document.querySelector('#signupName').value;
  let password = document.querySelector('#signupPassword').value;

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((cred) => {

      localStorage.setItem('user', JSON.stringify(cred.user.uid));
      containerSignUp.classList.toggle("hidden");
      checkUser();
    })
    .catch((error) => {
      console.log(error);
    });
}

function signinUser() {
  let email = document.querySelector('#signinEmail').value;
  let password = document.querySelector('#signinPassword').value;

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((cred) => {
      let user = firebase.auth().currentUser;

      localStorage.setItem('user', JSON.stringify(cred.user.uid));

      containerSignIn.classList.toggle("hidden");
      checkUser();
    })
    .catch(err => console.log(err));
}

toSignInButton.addEventListener("click", () => {
  header.innerText = "Zaloguj się";

  containerSignIn.classList.toggle("hidden");
  mainButtons.forEach(b => b.classList.toggle("hidden"));
});

toSignUpButton.addEventListener("click", () => {
  header.innerText = "Zarejestruj się";

  containerSignUp.classList.toggle("hidden");
  mainButtons.forEach(b => b.classList.toggle("hidden"));
});

signOutButton.addEventListener("click", () => {
  localStorage.removeItem("user");
  checkUser();
  location.reload();
})

signUpForm.addEventListener("submit", (e) => {
  e.preventDefault();
  signupUser();
});

signInForm.addEventListener("submit", (e) => {
  e.preventDefault();
  signinUser();
});

checkUser();


