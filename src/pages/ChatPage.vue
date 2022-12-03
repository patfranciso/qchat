<template>
  <q-page class="flex column">
    <q-banner v-if="!isOtherUserOnline" class="text-center bg-grey-4">
      {{ otherUserName }} is offline.
    </q-banner>
    <div class="q-pa-md column col justify-end">
      <q-chat-message
        v-for="message in messages"
        :name="message.from === 'me' ? userDetails.name : otherUserName"
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
import { onMounted, onUnmounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useChatStore } from 'src/stores/chatStore';
import { storeToRefs } from 'pinia';

const name = 'ChatPage';
const newMessage = ref('');
const chatStore = useChatStore();
const { messages, userDetails, otherUserId, otherUserName, isOtherUserOnline } =
  storeToRefs(chatStore);
const {
  firebaseGetMessages,
  firebaseStopGettingMessages,
  setOtherUserDetails,
  clearOtherUserDetails,
  firebaseSendMessage,
} = chatStore;

const sendMessage = e => {
  console.log('submit...', newMessage.value);
  firebaseSendMessage({
    text: newMessage.value,
    senderId: userDetails.value.userId,
    otherUserId: otherUserId.value,
  });
  newMessage.value = '';
};
onMounted(() => {
  const route = useRoute();
  otherUserId.value = route.params.otherUserId;
  setOtherUserDetails();
  firebaseGetMessages(route.params.otherUserId);
});
onUnmounted(() => {
  firebaseStopGettingMessages();
  clearOtherUserDetails();
});
</script>
