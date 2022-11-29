import { defineStore } from 'pinia';

import {
  rtdb,
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'src/boot/firebase';

export const useChatStore = defineStore('chat', {
  state: () => ({}),
  getters: {
    doubleCount: state => state.counter * 2,
  },
  actions: {
    registerUser({ email, password }) {
      console.log({ action: 'registerUser', payload: { email, password } });
      createUserWithEmailAndPassword(auth, email, password)
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error.message);
        });
    },
  },
});
