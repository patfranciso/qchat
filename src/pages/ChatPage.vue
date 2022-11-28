<template>
  <q-page class="flex column">
    <q-banner class="text-center bg-grey-4"> User is offline. </q-banner>
    <div class="q-pa-md column col justify-end">
      <q-chat-message
        v-for="message in messages"
        :name="message.from"
        :text="[message.text]"
        :key="message.text"
        :sent="message.from == 'me' ? true : false"
      />
    </div>
    <q-footer elevated>
      <q-toolbar>
        <q-form class="full-width">
          <q-input
            v-model="newMessage"
            bg-color="white"
            outlined
            rounded
            label="Message"
            dense
          >
            <template v-slot:after>
              <q-btn
                round
                dense
                flat
                icon="send"
                color="white"
                type="submit"
                @click="sendMessage"
              />
            </template>
          </q-input>
        </q-form>
      </q-toolbar>
    </q-footer>
  </q-page>
</template>

<script setup>
import { ref } from 'vue';

const name = 'UsersPage';
const newMessage = ref('');
const messages = ref([
  {
    text: 'hey, how are you?',
    from: 'me',
  },
  {
    text: 'Fine. And you?',
    from: 'them',
  },
  {
    text: 'Great',
    from: 'me',
  },
]);
const sendMessage = e => {
  console.log('submit...', newMessage.value);
  messages.value.push({
    text: newMessage.value,
    from: 'me',
  });
  newMessage.value = '';
};
</script>
