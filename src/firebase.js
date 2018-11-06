import * as firebase from 'firebase';

// Initialize Firebase
const config = {
  apiKey: "AIzaSyDlo5vWIAHJJn0jQhBsnIvtA7gx_nYfLxA",
  authDomain: "currently-9ce86.firebaseapp.com",
  databaseURL: "https://currently-9ce86.firebaseio.com",
  projectId: "currently-9ce86",
  storageBucket: "currently-9ce86.appspot.com",
  messagingSenderId: "332961157402"
};

firebase.initializeApp(config);

export default firebase;