// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDN7VtmMgo49FcL_RM_zS6ktQ9bS0vcMtM',
  authDomain: 'pl-tracker-d1ded.firebaseapp.com',
  projectId: 'pl-tracker-d1ded',
  storageBucket: 'pl-tracker-d1ded.appspot.com',
  messagingSenderId: '738417643491',
  appId: '1:738417643491:web:8dcaafbd3ca22f1cdb1ad6',
  measurementId: 'G-W59LG5P326',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
