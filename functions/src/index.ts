import * as functions from "firebase-functions";

const admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.applicationDefault()
});

// const db = admin.firestore();

exports.cHelloWorld = functions.https.onCall((data, context) => {
    return{'data': "Hello World"};
});