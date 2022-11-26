<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title class="absolute-center">
          {{ title }}
        </q-toolbar-title>
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
