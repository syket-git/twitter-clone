import firebase from 'firebase';
const firebaseConfig = {
    apiKey: "AIzaSyBxl91XfqrJZl2VIcuJIQmGS6fMcz7-ya4",
    authDomain: "twitter-clone90.firebaseapp.com",
    databaseURL: "https://twitter-clone90.firebaseio.com",
    projectId: "twitter-clone90",
    storageBucket: "twitter-clone90.appspot.com",
    messagingSenderId: "215126246370",
    appId: "1:215126246370:web:91a401a8e382e86b062fbb",
    measurementId: "G-RSRPW4QDJ8"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();
  const storage = firebaseApp.storage();
  
  export {firebaseApp, db, storage};