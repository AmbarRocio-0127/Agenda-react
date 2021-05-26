 // Importing firebase
 
 import firebase from 'firebase';
 
 // Your web app's Firebase configuration
 var firebaseConfig = {
    apiKey: "AIzaSyCH8YfNARfcxU7U_KY8obHMke2EZyTd8rs",
    authDomain: "crudagenda.firebaseapp.com",
    databaseURL: "https://crudagenda-default-rtdb.firebaseio.com",
    projectId: "crudagenda",
    storageBucket: "crudagenda.appspot.com",
    messagingSenderId: "363405612796",
    appId: "1:363405612796:web:8515983dff090f7e14a979"
  };
  // Initialize Firebase
  var firebaseDatabase = firebase.initializeApp(firebaseConfig);

  //exporting firebase
  export default firebaseDatabase.database().ref();