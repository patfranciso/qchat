import { defineStore, createPinia } from 'pinia';
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
  update,
} from 'src/boot/firebase';
const pinia = createPinia();
pinia.use(({ store }) => {
  store.router = markRaw(router);
});
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
    logoutUser() {
      console.log('logout');
      signOut(auth);
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
          this.firebaseUpdateUser({
            userId,
            updates: {
              online: true,
            },
          });
          this.router.push('/');
        } else {
          // User is logged out
          this.firebaseUpdateUser({
            userId: this.userDetails.userId,
            updates: {
              online: false,
            },
          });
          this.setUserDetails({});
          this.router.replace('/auth');
        }
      });
    },
    firebaseUpdateUser(payload) {
      update(dbRef(rtdb, 'users/' + payload.userId), payload.updates);
    },
  },
});
