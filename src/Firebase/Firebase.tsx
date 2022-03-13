// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  setDoc,
  Timestamp,
} from 'firebase/firestore';
import { PrivateLesson } from '../Models/PrivateLesson';
import {
  browserSessionPersistence,
  getAuth,
  getRedirectResult,
  GoogleAuthProvider,
  setPersistence,
  signInWithRedirect,
  User,
} from 'firebase/auth';

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
const db = getFirestore();

const privateLessonsRef = collection(db, 'privateLessonItems');

export async function getPrivateLessons(): Promise<PrivateLesson[]> {
  const querySnapshot = await getDocs(privateLessonsRef);
  const result: PrivateLesson[] = [];
  querySnapshot.forEach((item) => {
    const data = item.data();
    result.push({
      id: item.id,
      startTimestamp: (data.startTimestamp as Timestamp).toMillis(),
      endTimestamp: (data.endTimestamp as Timestamp).toMillis(),
      studentName: data.studentName,
      subject: data.subject,
      notice: data.notice,
    } as PrivateLesson);
  });
  return result;
}

export async function signInWithGoogle(): Promise<void> {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  setPersistence(auth, browserSessionPersistence).then(() => {
    signInWithRedirect(auth, provider);
  });
}

export async function getLoggedInUser(): Promise<User | null> {
  return getAuth().currentUser;
}

export async function checkRedirectUriResult(): Promise<boolean> {
  const auth = getAuth();
  const result = await getRedirectResult(auth);

  if (!result) {
    return false;
  }

  // This gives you a Google Access Token. You can use it to access Google APIs.
  const credential = GoogleAuthProvider.credentialFromResult(result);
  const token = credential?.accessToken;

  // The signed-in user info.
  const user = result.user;
  return true;
}

export async function signOut(): Promise<void> {
  getAuth()
    .signOut()
    .then((_) => {
      location.reload();
    })
    .catch((error) => {
      console.error('signout error', error);
    });
}