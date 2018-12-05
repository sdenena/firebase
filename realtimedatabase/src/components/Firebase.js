import React from 'react'
import firebase from 'firebase'


var config = {
    apiKey: "AIzaSyChxFDavmxp9x2OkSG2WMjJXSbfnoYIvUs",
    authDomain: "realtimedb-e4733.firebaseapp.com",
    databaseURL: "https://realtimedb-e4733.firebaseio.com",
    projectId: "realtimedb-e4733",
    storageBucket: "realtimedb-e4733.appspot.com",
    messagingSenderId: "381006956520"
  };
  export const FireBase=firebase.initializeApp(config);