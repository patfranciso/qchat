<template>
  <q-page class="flex q-pa-md">
    <q-list class="full-width" separator>
      <q-item
        v-for="user in users"
        to="/chat"
        :key="user.id"
        clickable
        v-ripple
      >
        <q-item-section avatar>
          <q-avatar color="primary" text-color="white">
            {{ user.name.charAt(0) }}
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ user.name }}</q-item-label>
          <q-item-label caption lines="1">{{ user.email }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-badge :color="user.online ? 'light-green-5' : 'grey-4'">
            {{ user.online ? 'Online' : 'Offline' }}
          </q-badge>
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script setup>
import { computed } from '@vue/reactivity';
import { reactive, toRefs } from 'vue';
import { useChatStore } from 'stores/chatStore';

const chatStore = useChatStore();
name: 'UsersPage';
// const users = computed(() => chatStore.users);
// const users = computed(() => chatStore.otherUsers());
const users = computed(() => {
  return chatStore.otherUsers();
});
// const state = toRefs(
//   reactive({
//     users: computed(() => chatStore.otherUsers()),
//   })
// );
</script>
