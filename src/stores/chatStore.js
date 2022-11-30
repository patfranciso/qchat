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
  onValue,
} from 'src/boot/firebase';

export const useChatStore = defineStore('chat', {
  state: () => ({ userDetails: {} }),
  getters: {
    doubleCount: state => state.counter * 2,
  },
  actions: {
    registerUser({ name, email, password }) {
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
    loginUser({ name, email, password }) {
      signInWithEmailAndPassword(auth, email, password)
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error.message);
        });
    },
    setUserDetails(payload) {
      this.userDetails = payload;
    },
    handleAuthStateChanged() {
      console.log('handleAuthStateChanged');
      onAuthStateChanged(auth, user => {
        if (user) {
          // User is logged in
          let userId = auth.currentUser.uid;
          onValue(
            dbRef(rtdb, '/users/' + userId),
            snapshot => {
              const userDetails = snapshot.val();
              console.log({ userDetails });
              this.setUserDetails({
                name: userDetails.name,
                email: userDetails.email,
                userId,
              });
            },
            {
              onlyOnce: true,
            }
          );
        } else {
          // User is logged out
        }
      });
    },
  },
});
