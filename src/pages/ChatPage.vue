<template>
  <q-page class="flex">
    <q-footer elevated>
      <q-toolbar>
        <q-input
          v-model="newMessage"
          bg-color="white"
          outlined
          rounded
          label="Message"
          dense
          class="full-width"
        >
          <template v-slot:after>
            <q-btn round dense flat icon="send" color="white" />
          </template>
        </q-input>
      </q-toolbar>
    </q-footer>
  </q-page>
</template>

<script setup>
const name = 'UsersPage';
const newMessage = '';
</script>
