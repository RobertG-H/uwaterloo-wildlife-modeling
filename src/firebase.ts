import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/functions';
import firebaseConfig from '../deprecated/config/firebase';
firebase.initializeApp({
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REAT_APP_ID,
});
// if (process.env.NODE_ENV === 'development') {
//   //console.log("Using functions emulator");
//   //firebase.functions().useEmulator("localhost", 5001);
// }
export const auth = firebase.auth();
export default firebase;
