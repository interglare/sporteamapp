import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

// Replace this with your own config details
var config = {
    apiKey: "AIzaSyC2SMCccYCdzP5dbMa2qgwu18hQHmcV5HE",
    authDomain: "sportreact-526d8.firebaseapp.com",
    databaseURL: "https://sportreact-526d8.firebaseio.com",
    projectId: "sportreact-526d8",
    storageBucket: "sportreact-526d8.appspot.com",
    messagingSenderId: "706328237252"
};
firebase.initializeApp(config);
firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase 