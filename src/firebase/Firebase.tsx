// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  updateDoc,
} from 'firebase/firestore';
import { PrivateLesson } from '../models/PrivateLesson';
import {
  browserLocalPersistence,
  getAuth,
  getRedirectResult,
  GoogleAuthProvider,
  setPersistence,
  signInWithRedirect,
  User,
} from 'firebase/auth';
import { removeIdAttribute } from '../helper/utils';

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

function getUser(): User | null {
  return getAuth().currentUser;
}

export async function getPrivateLessons(): Promise<PrivateLesson[]> {
  const currentUser = getUser();
  if (currentUser) {
    const col = collection(db, currentUser.uid);
    const querySnapshot = await getDocs(col);
    const result: PrivateLesson[] = [];
    querySnapshot.forEach((item) => {
      const data = item.data();
      result.push({
        id: item.id,
        start: data.start,
        end: data.end,
        student: data.student,
        subject: data.subject,
        notice: data.notice,
      });
    });
    return result;
  }

  return [];
}

export async function addPrivateLesson(
  privateLesson: PrivateLesson
): Promise<boolean> {
  const currentUser = getUser();
  if (currentUser) {
    const col = collection(db, currentUser.uid);
    const response = await addDoc(col, removeIdAttribute(privateLesson));
    privateLesson.id = response.id;
    return true;
  }

  return false;
}

export async function deletePrivateLesson(id: string): Promise<boolean> {
  const currentUser = getUser();
  if (currentUser) {
    await deleteDoc(doc(db, currentUser.uid, id));
    return true;
  }
  return false;
}

export async function updatePrivateLesson(
  privateLesson: PrivateLesson
): Promise<boolean> {
  const currentUser = getUser();
  if (currentUser && privateLesson.id) {
    const ref = doc(db, currentUser.uid, privateLesson.id);
    updateDoc(ref, removeIdAttribute({ ...privateLesson }));
    return true;
  }

  return false;
}

export async function signInWithGoogle(): Promise<void> {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  setPersistence(auth, browserLocalPersistence).then(() => {
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
