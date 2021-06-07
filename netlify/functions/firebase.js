const firebase = require("firebase/app")
require("firebase/firestore")

const firebaseConfig = {
  apiKey: "AIzaSyBlxGQB0zkHA6PtRFQcjb1Ek0z2h2TK_bU",
  authDomain: "nft-marketplace-a02be.firebaseapp.com",
  databaseURL: "https://nft-marketplace-a02be-default-rtdb.firebaseio.com",
  projectId: "nft-marketplace-a02be",
  storageBucket: "nft-marketplace-a02be.appspot.com",
  messagingSenderId: "833934020342",
  appId: "1:833934020342:web:d9a482926f0a4c16c326d7",
  measurementId: "G-4DX867X47E"
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

module.exports = firebase