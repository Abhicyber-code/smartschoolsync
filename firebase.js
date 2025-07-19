
// // firebase.js
// import firebase from 'firebase/compat/app';
// import 'firebase/compat/database'; // only include what you use

// const firebaseConfig = {
//     apiKey: "AIzaSyDqJDHu-beTzJw1Bye2X_p_VS5AyetPEXs",
//     authDomain: "bustracking-ef01f.firebaseapp.com",
//     databaseURL: "https://bustracking-ef01f-default-rtdb.firebaseio.com",
//     projectId: "bustracking-ef01f",
//     storageBucket: "bustracking-ef01f.firebasestorage.app",
//     messagingSenderId: "255959450736",
//     appId: "1:255959450736:web:993fc5846e33472f94a0b5",
//     measurementId: "G-SR0YJQP6NT"
// };;

// if (!firebase.apps.length) {
//     firebase.initializeApp(firebaseConfig);
// }

// export default firebase;



// firebase.js
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyDqJDHu-beTzJw1Bye2X_p_VS5AyetPEXs",
    authDomain: "bustracking-ef01f.firebaseapp.com",
    databaseURL: "https://bustracking-ef01f-default-rtdb.firebaseio.com",
    projectId: "bustracking-ef01f",
    storageBucket: "bustracking-ef01f.firebasestorage.app",
    messagingSenderId: "255959450736",
    appId: "1:255959450736:web:993fc5846e33472f94a0b5",
    measurementId: "G-SR0YJQP6NT"
};;

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
