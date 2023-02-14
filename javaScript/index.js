import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
} from "https://www.gstatic.com/firebasejs/9.16.0/firebase-auth.js";
//import { getFirestore, collection, addDoc, getDoc } from "https://www.gstatic.com/firebasejs/8.10.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDZO1zM4AJWqquwm83WHhy4S11hDUcMKHo",
  authDomain: "practica1fb.firebaseapp.com",
  projectId: "practica1fb",
  storageBucket: "practica1fb.appspot.com",
  messagingSenderId: "837573202124",
  appId: "1:837573202124:web:bb9e4e0624843dc2fe7269",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const client = document.getElementById("usuario");
const create = document.getElementById("sign-in");
const logged = document.getElementById("log-in");
const nologged = document.getElementById("log-off");
const email = document.getElementById("mail");
const pass = document.getElementById("pass");
const googleBut = document.getElementById("googleCon");
const providerGoogle = new GoogleAuthProvider();
const facebookBut = document.getElementById("faceCon");
const providerFacebook = new FacebookAuthProvider();

create.addEventListener("click", function () {
  createUserWithEmailAndPassword(auth, email.value, pass.value)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      alert("Usuario registrado con exito.");
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(error);
      // ..
    });
});

logged.addEventListener("click", function () {
  signInWithEmailAndPassword(auth, email.value, pass.value)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      alert("Usuario aunteticado.");
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(error);
    });
});

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    client.innerText = "Usuario conectado: " + user.email;
    // ...
  } else {
    // User is signed out
    // ...
    client.innerText = "No hay un usuario conectado.";
  }
});

nologged.addEventListener("click", function () {
  createUserWithEmailAndPassword(auth, email.value, pass.value);
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      alert("La sesión ha sido cerrada");
    })
    .catch((error) => {
      // An error happened.
    });
});

googleBut.addEventListener("click", function () {
  signInWithPopup(auth, providerGoogle)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
});

facebookBut.addEventListener("click", function () {
  const auth = getAuth();
  signInWithPopup(auth, providerFacebook)
    .then((result) => {
      // The signed-in user info.
      const user = result.user;

      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      const credential = FacebookAuthProvider.credentialFromResult(result);
      const accessToken = credential.accessToken;

      // IdP data available using getAdditionalUserInfo(result)
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = FacebookAuthProvider.credentialFromError(error);

      // ...
    });
});

/*
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

try {
  const docRef = await addDoc(collection(db, "users"), {
    first: "Ada",
    last: "Lovelace",
    born: 1815
  });
  console.log("Document written with ID: ", docRef.id);
} catch (e) {
  console.error("Error adding document: ", e);
}

// Add a second document with a generated ID.
import { addDoc, collection } from "firebase/firestore"; 

try {
  const docRef = await addDoc(collection(db, "users"), {
    first: "Alan",
    middle: "Mathison",
    last: "Turing",
    born: 1912
  });

  console.log("Document written with ID: ", docRef.id);
} catch (e) {
  console.error("Error adding document: ", e);
}

const querySnapshot = await getDocs(collection(db, "users"));
querySnapshot.forEach((doc) => {
  console.log(`${doc.id} => ${doc.data()}`);
});
*/
