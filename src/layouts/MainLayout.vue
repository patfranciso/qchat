<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          v-if="route.fullPath.includes('/chat')"
          to="/"
          icon="arrow_back"
          flat
          dense
          label="back"
        />
        <q-toolbar-title class="absolute-center">
          {{ title }}
        </q-toolbar-title>
        <q-btn
          v-if="!userDetails.userId"
          to="/auth"
          class="absolute-right q-pr-sm"
          icon="account_circle"
          flat
          dense
          label="login"
        />
        <q-btn
          v-else
          @click="logoutUser"
          to="/auth"
          class="absolute-right q-pr-sm"
          icon="account_circle"
          flat
          dense
          >Logout <br />
          {{ userDetails.name }}
        </q-btn>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { computed } from '@vue/reactivity';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useChatStore } from 'src/stores/chatStore';

const route = useRoute();
const title = computed(() => {
  const currentPath = route.fullPath;
  if (currentPath == '/') return 'QChat';
  else if (currentPath.includes('/chat')) return otherUserName.value;
  else if (currentPath == '/auth') return 'Login';
});
const chatStore = useChatStore();
const { userDetails, otherUserName } = storeToRefs(chatStore);
const { logoutUser } = chatStore;
</script>
<style lang="sass">
.q-toolbar
  .q-btn
    line-height: 1.2
</style>
