import firebase from 'firebase';

  var config = {
    apiKey: "AIzaSyByrNMqRBvLbmY-AtV9M9djgXiTl6F19VY",
    authDomain: "co2emis.firebaseapp.com",
    databaseURL: "https://co2emis.firebaseio.com",
    projectId: "co2emis",
    storageBucket: "co2emis.appspot.com",
    messagingSenderId: "131882195552"
  };

  var fire = firebase.initializeApp(config);

  export default fire;