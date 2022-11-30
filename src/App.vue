<template>
  <router-view />
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useChatStore } from 'src/stores/chatStore';

name: 'App';

const chatStore = useChatStore();
onMounted(() => {
  chatStore.handleAuthStateChanged();
});
</script>
