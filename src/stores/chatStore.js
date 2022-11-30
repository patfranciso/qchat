import { defineStore } from 'pinia';

import {
  rtdb,
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  ref as dbRef,
  set,
} from 'src/boot/firebase';

export const useChatStore = defineStore('chat', {
  state: () => ({}),
  getters: {
    doubleCount: state => state.counter * 2,
  },
  actions: {
    registerUser({ name, email, password }) {
      console.log({ action: 'registerUser', payload: { email, password } });
      createUserWithEmailAndPassword(auth, email, password)
        .then(response => {
          console.log(response);
          let userId = auth.currentUser.uid;
          console.log({ userId, name, email });
          set(dbRef(rtdb, 'users/' + userId), {
            name,
            email,
            online: true,
          });
        })
        .catch(error => {
          console.log(error.message);
        });
    },
  },
});
