import firebase from "firebase";
import "firebase/firestore";

var config = {
  apiKey: "AIzaSyBUQKETzsuse8gYhHmRUNwdlx64u9sFT0Y",
  authDomain: "mapbox-location.firebaseapp.com",
  databaseURL: "https://mapbox-location.firebaseio.com",
  projectId: "mapbox-location",
  storageBucket: "mapbox-location.appspot.com",
  messagingSenderId: "522339878308"
};

const firebaseApp = firebase.initializeApp(config);
firebaseApp.firestore().settings({
  timestampsInSnapshots: true
});

export default firebaseApp.firestore();