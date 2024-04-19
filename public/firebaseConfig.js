// Your web app's Firebase configuration
var firebase = require("firebase/app");
require("firebase/auth");
require("firebase/firestore");

var firebaseConfig = {
  apiKey: "AIzaSyDnHxWOJNks8qs5pw40EUcHqTjDRuW_3No",
  authDomain: "info-32cec.firebaseapp.com",
  projectId: "info-32cec",
  storageBucket: "info-32cec.appspot.com",
  messagingSenderId: "712292470007",
  appId: "1:712292470007:web:121be4bf4807a2923b57f2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);