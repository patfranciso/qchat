<template>
  <router-view />
</template>

<script setup>
import { onMounted } from 'vue';
import { useChatStore } from 'src/stores/chatStore';

name: 'App';

const chatStore = useChatStore();
onMounted(() => {
  chatStore.handleAuthStateChanged();
});
</script>
