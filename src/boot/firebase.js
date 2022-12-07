import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import {
  getDatabase,
  ref,
  set,
  onValue,
  update,
  onChildAdded,
  onChildChanged,
  off,
  push,
} from 'firebase/database';
import firebaseConfig from '../../firebaseConfig';

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const rtdb = getDatabase();

const auth = getAuth();

export {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  rtdb,
  ref,
  set,
  onValue,
  update,
  onChildAdded,
  onChildChanged,
  off,
  push,
};
