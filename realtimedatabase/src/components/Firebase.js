import firebase from 'firebase'
const firebaseConfig = {
    apiKey: "AIzaSyChxFDavmxp9x2OkSG2WMjJXSbfnoYIvUs",
    authDomain: "realtimedb-e4733.firebaseapp.com",
    databaseURL: "https://realtimedb-e4733.firebaseio.com",
    projectId: "realtimedb-e4733",
    storageBucket: "realtimedb-e4733.appspot.com",
    messagingSenderId: "381006956520"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
export default  firebaseApp;