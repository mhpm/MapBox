import firebase from "firebase";
import "firebase/firestore";

var config = {
  apiKey: "AIzaSyBrjrVkIschwu5h6K-ySszMeyhqKGPqUHU",
  authDomain: "geochatvue.firebaseapp.com",
  databaseURL: "https://geochatvue.firebaseio.com",
  projectId: "geochatvue",
  storageBucket: "geochatvue.appspot.com",
  messagingSenderId: "571780472450"
};

const firebaseApp = firebase.initializeApp(config);
firebaseApp.firestore().settings({ timestampsInSnapshots: true });

export default firebaseApp.firestore();
