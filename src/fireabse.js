import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCKZasUBYG-qrMvDW7QMVKwIeFTFk0NEbM",
  authDomain: "fir-386a8.firebaseapp.com",
  databaseURL: "https://fir-386a8.firebaseio.com",
  projectId: "fir-386a8",
  storageBucket: "fir-386a8.appspot.com",
  messagingSenderId: "326897744397",
  appId: "1:326897744397:web:fbc5f170a489f47c067344",
  measurementId: "G-1D4NXZG055",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

const auth = firebase.auth();

var storageRef = firebase.storage().ref();
const provider = new firebase.auth.GoogleAuthProvider();


export { db, auth, storageRef , provider};
