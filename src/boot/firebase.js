import { initializeApp } from 'firebase/app';
import {
  getAuth,
  connectAuthEmulator,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import {
  getDatabase,
  ref,
  set,
  connectDatabaseEmulator,
  onValue,
  update,
  onChildAdded,
  onChildChanged,
} from 'firebase/database';
import firebaseConfig from '../../firebaseConfig';

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const rtdb = getDatabase();
connectDatabaseEmulator(rtdb, 'localhost', 9000);

const auth = getAuth();
connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true });

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
};
