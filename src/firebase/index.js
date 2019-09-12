import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyAFHCF84agg-5xqMwvd5xqMoba6pIHTvD0",
  authDomain: "fir-tutorial-a8292.firebaseapp.com",
  databaseURL: "https://fir-tutorial-a8292.firebaseio.com",
  projectId: "fir-tutorial-a8292",
  storageBucket: "",
  messagingSenderId: "67469922153",
  appId: "1:67469922153:web:9cca2e26e09485d4"
};

export const app = firebase.initializeApp(config);
export const database = app.database();
export const auth = app.auth();
