import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

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
initializeApp(firebaseConfig);
const auth = getAuth();
export function signUp(e) {
  e.preventDefault();

  const email = signupForm.email.value;
  const password = signupForm.password.value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((cred) => {
      //   console.log(cred.user);
      signupForm.reset();
      window.location = "gallery.html";
    })
    .catch((error) => {
      console.log(error.message);
    });
}
