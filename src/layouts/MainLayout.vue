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
          to="/auth"
          class="absolute-right q-pr-sm"
          icon="account_circle"
          flat
          dense
          label="login"
        />
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

const route = useRoute();
const title = computed(() => {
  const currentPath = route.fullPath;
  if (currentPath == '/') return 'QChat';
  else if (currentPath == '/chat') return 'Chat';
  else if (currentPath == '/auth') return 'Login';
});
</script>
