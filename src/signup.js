import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { displayNone, galleryPage } from "./utilities.js";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD4hkvtcR1OrLyYIRPR10ZWhdncF584rsI",
  authDomain: "mage-5b9f9.firebaseapp.com",
  projectId: "mage-5b9f9",
  storageBucket: "mage-5b9f9.appspot.com",
  messagingSenderId: "338442865042",
  appId: "1:338442865042:web:c75da25ea80909534d594b",
  measurementId: "G-XVN8KVCCK3",
};

export const signupForm = document.querySelector("#signup-form");
export const loginForm = document.querySelector("#login-form");

initializeApp(firebaseConfig);
const auth = getAuth();

export function signUp(e) {
  e.preventDefault();

  const email = signupForm.email.value;
  const password = signupForm.password.value;

  createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      displayNone();
      galleryPage.classList.add("show");
      signupForm.reset();
    })
    .catch((error) => {
      console.log(error.message);
    });
}

export function login(e) {
  e.preventDefault();

  const email = loginForm.email.value;
  const password = loginForm.password.value;

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      displayNone();
      galleryPage.classList.add("show");
      loginForm.reset();
    })
    .catch((error) => {
      console.log(error.message);
    });
}
