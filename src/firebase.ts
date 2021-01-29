import firebase from 'firebase/app';
import 'firebase/functions';
import firebaseConfig from './config/firebase';
firebase.initializeApp(firebaseConfig);
if (process.env.NODE_ENV === 'development') {
  //console.log("Using functions emulator");
  //firebase.functions().useEmulator("localhost", 5001);
}
export default firebase;
