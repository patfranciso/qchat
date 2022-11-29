import { defineStore } from 'pinia';

import { rtdb, auth } from 'src/boot/firebase';

export const useStore = defineStore('counter', {
  state: () => ({
    counter: 0,
  }),
  getters: {
    doubleCount: state => state.counter * 2,
  },
  actions: {
    increment() {
      this.counter++;
    },
  },
});
