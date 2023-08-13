import firebase from "firebase-admin";

firebase.initializeApp();

const database = firebase.firestore();

export default database;
