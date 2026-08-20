
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCXASUWLZ5PnNf4hc5xYOdAwu64CyNkE60",
  authDomain: "rabi-summaries.firebaseapp.com",
  projectId: "rabi-summaries",
  storageBucket: "rabi-summaries.firebasestorage.app",
  messagingSenderId: "339515480707",
  appId: "1:339515480707:web:f91acbec00ffea8f6699b6",
  measurementId: "G-6HVD3PGNLX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);