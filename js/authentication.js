let toSignInButton = document.querySelector(".js-button--signIn");
let toSignUpButton = document.querySelector(".js-button--signUp");

let signUpForm = document.querySelector(".js-signupForm");
let signInForm = document.querySelector(".js-signinForm");

const checkUser = (user) => {
  if (user) {
    header.classList.toggle("header-centered");
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
    .then(() => {
      let user = firebase.auth().currentUser;
      let uid;
      let firebaseRef = firebase.database().ref();
      let userData = {
        userName: name,
        userEmail: email,
        userPasword: password,
      }
      firebaseRef.child(uid).set(userData);
      checkUser();
    })
    .catch((error) => {
      console.log(error);
    });
}

function signinUser() {
  let email = document.querySelector('#signinEmail').value;
  let password = document.querySelector('#signinPassword').value;
  firebase.auth().signInWithEmailAndPassword(email.value, password.value)
  .then((cred) => {
    let user = firebase.auth().currentUser;
    checkUser(user);
  })
  .catch(err => console.log(err));
}

const onSignIn = (event) => {
  event.preventDefault();
  signinUser();
  checkUser();
}

toSignInButton.addEventListener("click", () => {
  location.replace(`${location.origin}/signin.html`)
});

toSignUpButton.addEventListener("click", () => {
  location.replace(`${location.origin}/signup.html`)
});

signUpForm.addEventListener("submit", (e) => {
  e.preventDefault();
  signupUser();
});

signInForm.addEventListener("submit", (e) => {
  e.preventDefault();
  signinUser();
});

checkUser();



console.log(location.origin);
