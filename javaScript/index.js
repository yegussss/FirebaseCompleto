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
  GithubAuthProvider,
} from "https://www.gstatic.com/firebasejs/9.16.0/firebase-auth.js";
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  setDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "https://www.gstatic.com/firebasejs/9.16.0/firebase-firestore.js";

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
const contP = document.getElementById("principal");
const contC = document.getElementById("crud");
const clientP = document.getElementById("usuarioP");
const clientC = document.getElementById("usuarioC");
const create = document.getElementById("sign-in");
const logged = document.getElementById("log-in");
const nologged = document.getElementById("log-off");
const email = document.getElementById("mail");
const pass = document.getElementById("pass");
const googleBut = document.getElementById("googleCon");
const providerGoogle = new GoogleAuthProvider();
const facebookBut = document.getElementById("faceCon");
const providerFacebook = new FacebookAuthProvider();
const gitBut = document.getElementById("gitCon");
const providerGit = new GithubAuthProvider();
const close = document.getElementById("closePop");
const modal_container = document.getElementById("modalCont");
const add = document.getElementById("buttonCreate");
const search = document.getElementById("buttonSearch");
const del = document.getElementById("buttonElim");
const edit = document.getElementById("buttonEdit");
const read = document.getElementById("buttonRead");
const name1 = document.getElementById("createName");
const apellido1 = document.getElementById("createSec");
const age1 = document.getElementById("createAge");
const id = document.getElementById("edlimId");
const name2 = document.getElementById("edlimName");
const apellido2 = document.getElementById("edlimSec");
const age2 = document.getElementById("edlimAge");
const tabla = document.getElementById("dataFB");
//const mapClose = document.getElementById("closeMap");
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

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
    clientC.innerHTML = `
    Usuario conectado: ${user.email}
    `;
    contP.classList.add("hide");
    contC.classList.remove("hide");
    // ...
  } else {
    // User is signed out
    // ...
    clientP.innerText = "No hay un usuario conectado.";
  }
});

nologged.addEventListener("click", function () {
  createUserWithEmailAndPassword(auth, email.value, pass.value);
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      alert("La sesión ha sido cerrada");
      contP.classList.remove("hide");
      contC.classList.add("hide");
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

gitBut.addEventListener("click", function () {
  signInWithPopup(auth, providerGit)
    .then((result) => {
      // This gives you a GitHub Access Token. You can use it to access the GitHub API.
      const credential = GithubAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;

      // The signed-in user info.
      const user = result.user;
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
      const credential = GithubAuthProvider.credentialFromError(error);
      // ...
    });
});

//Código de Firebase

add.addEventListener("click", async () => {
  try {
    await setDoc(doc(db, "users", name1.value), {
      Nombre: name1.value,
      Apellido: apellido1.value,
      Edad: age1.value,
    });
    alert(`Documento con el ID: ${name1.value} ha sido creado!`);
  } catch (error) {
    alert("Favor de llenar todos los datos");
    console.error("Error adding document: " + error);
  }
});

read.addEventListener("click", async () => {
  modal_container.classList.add("show");
  tabla.innerHTML = `<tr>
      <td>  ID  </td>
      <td>  Nombre  </td>
      <td>  Apellido(s)  </td>
      <td>  Edad  </td>
  </tr>`;

  const querySnapshot = await getDocs(collection(db, "users"));
  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
    tabla.innerHTML += `<tr>
          <td>${doc.id}</td>
          <td>${doc.data().Nombre}</td>
          <td>${doc.data().Apellido}</td>
          <td>${doc.data().Edad}</td>
      </tr>`;
  });
});

search.addEventListener("click", async () => {
  const docRef = doc(db, "users", id.value);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    name2.value = docSnap.data().Nombre;
    apellido2.value = docSnap.data().Apellido;
    age2.value = docSnap.data().Edad;
    console.log("Document data:", docSnap.data());
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
    alert("No se encontraron los datos con este ID, O Este ID es incorrecto");
  }
});

edit.addEventListener("click", async () => {
  const elementRef = doc(db, "users", id.value);

  await updateDoc(elementRef, {
    Nombre: name2.value,
    Apellido: apellido2.value,
    Edad: age2.value,
  });
  alert(
    "Los datos registrados del documento con ID: " +
      id.value +
      " han sido actualizados."
  );
});

del.addEventListener("click", async () => {
  await deleteDoc(doc(db, "users", id.value));

  alert("Los registros con el ID: " + id.value + " han sido eliminados");
});

close.addEventListener("click", () => {
  modal_container.classList.remove("show");
});

//MapBox y su integración

mapboxgl.accessToken =
  "pk.eyJ1IjoieWVndXNzc3MiLCJhIjoiY2xkdnZjM2RqMDFicDNvbndsMnZqcGp1YSJ9.Qnl1Kti39jC3Nu0M8xZfBQ";
const map = new mapboxgl.Map({
  container: "map",
  // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
  style: "mapbox://styles/mapbox/streets-v12",
  center: [-103.43338, 25.57661],
  zoom: 15,
  projection: "globe", // starting projection
});

// Create a default Marker and add it to the map.
const marker1 = new mapboxgl.Marker()
  .setLngLat([-103.43338, 25.57661])
  .addTo(map);

// Add the control to the map.
map.addControl(
  new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl,
  })
);

//Trabajo terminado



