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
  onChildAdded,
  onChildChanged,
  off,
} from 'src/boot/firebase';
const pinia = createPinia();
pinia.use(({ store }) => {
  store.router = markRaw(router);
});

let messagesRef;
export const useChatStore = defineStore('chat', {
  state: () => ({ userDetails: {}, users: {}, messages: {} }),
  getters: {
    otherUsers(state) {
      let usersFiltered = {};
      Object.keys(state.users).forEach(key => {
        if (key !== state.userDetails.userId) {
          usersFiltered[key] = state.users[key];
        }
      });
      return usersFiltered;
    },
  },
  actions: {
    registerUser({ name, email, password }) {
      createUserWithEmailAndPassword(auth, email, password)
        .then(async response => {
          console.log(response);
          let userId = auth.currentUser.uid;
          console.log({ userId, name, email });
          await set(dbRef(rtdb, 'users/' + userId), {
            name,
            email,
            online: true,
          });
        })
        .catch(error => {
          console.log(error.message);
        });
    },
    loginUser({ email, password }) {
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
          this.firebaseGetUsers();
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
    addUser(payload) {
      this.users[payload.userId] = payload.userDetails;
    },
    updateUser(payload) {
      // this.users[payload.userId] = payload.userDetails; // fails
      Object.assign(this.users[payload.userId], payload.userDetails);
    },
    firebaseGetUsers() {
      const usersRef = dbRef(rtdb, 'users');

      onChildAdded(usersRef, snapshot => {
        const userDetails = snapshot.val();
        const userId = snapshot.key;
        userDetails && userId && this.addUser({ userId, userDetails });
      });
      onChildChanged(usersRef, snapshot => {
        const userDetails = snapshot.val();
        const userId = snapshot.key;
        this.updateUser({ userId, userDetails });
      });
    },
    addMessage({ messageId, messageDetails }) {
      this.messages[messageId] = messageDetails;
    },
    firebaseGetMessages(otherUserId) {
      console.log({ otherUserId });
      const userId = this.userDetails.userId;
      const chatId =
        userId < otherUserId
          ? userId + '-' + otherUserId
          : otherUserId + '-' + userId;
      messagesRef = dbRef(rtdb, 'chats/' + chatId);
      console.log({ chatId });
      onChildAdded(messagesRef, snapshot => {
        let messageDetails = snapshot.val();
        const from = messageDetails.sender === userId ? 'me' : 'them';
        messageDetails.from = from;
        const messageId = snapshot.key;
        console.log({ messageId, messageDetails });
        this.addMessage({ messageId, messageDetails });
      });
    },
    clearMessages() {
      this.messages = {};
    },
    firebaseStopGettingMessages() {
      console.log('firebaseStopGettingMessages');
      if (messagesRef) off(messagesRef, onChildAdded, () => {});
      this.messages = {};
    },
  },
});
