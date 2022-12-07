<template>
  <q-page class="flex column page-chat" id="chatPage">
    <q-banner v-if="!isOtherUserOnline" class="text-center bg-grey-4 fixed-top">
      {{ otherUserName }} is offline.
    </q-banner>
    <div
      :class="{ invisible: !showMessages }"
      class="q-pa-md column col justify-end"
    >
      <q-chat-message
        v-for="(message, key) in messages"
        :name="message.from === 'me' ? userDetails.name : otherUserName"
        :text="[message.text]"
        :key="key"
        :sent="message.from == 'me' ? true : false"
        :bg-color="message.from === 'me' ? 'white' : 'light-grey-2'"
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
            ref="inputMessage"
            dense
            autofocus
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
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useChatStore } from 'src/stores/chatStore';
import { storeToRefs } from 'pinia';

const name = 'ChatPage';
const newMessage = ref('');
const inputMessage = ref('');
const showMessages = ref(false);
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
const clearMessage = () => {
  newMessage.value = '';
  setTimeout(() => {
    inputMessage.value.focus();
  }, 20);
};
const sendMessage = e => {
  firebaseSendMessage({
    text: newMessage.value,
    senderId: userDetails.value.userId,
    otherUserId: otherUserId.value,
  });
  clearMessage();
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
const scrollToBottom = () => {
  const chatPage = document.getElementById('chatPage');
  setTimeout(() => {
    window.scrollTo(0, chatPage.scrollHeight);
  }, 20);
};
watch(
  messages,
  value => {
    if (Object.keys(value).length > 0) {
      scrollToBottom();
      setTimeout(() => {
        showMessages.value = true;
      }, 200);
    }
  },
  { deep: true }
);
</script>
<style lang="sass">
.page-chat
  background: #e2dfd5
  &:after
    content: ''
    display: block
    position: fixed
    left: 0
    right: 0
    top: 0
    bottom: 0
    z-index: 0
    opacity: 0.1
    background-image: radial-gradient(circle at 100% 150%, silver 24%, white 24%, white 28%, silver 28%, silver 36%, white 36%, white 40%, transparent 40%, transparent), radial-gradient(circle at 0    150%, silver 24%, white 24%, white 28%, silver 28%, silver 36%, white 36%, white 40%, transparent 40%, transparent), radial-gradient(circle at 50%  100%, white 10%, silver 10%, silver 23%, white 23%, white 30%, silver 30%, silver 43%, white 43%, white 50%, silver 50%, silver 63%, white 63%, white 71%, transparent 71%, transparent), radial-gradient(circle at 100% 50%, white 5%, silver 5%, silver 15%, white 15%, white 20%, silver 20%, silver 29%, white 29%, white 34%, silver 34%, silver 44%, white 44%, white 49%, transparent 49%, transparent), radial-gradient(circle at 0    50%, white 5%, silver 5%, silver 15%, white 15%, white 20%, silver 20%, silver 29%, white 29%, white 34%, silver 34%, silver 44%, white 44%, white 49%, transparent 49%, transparent)
    background-size: 100px 50px
.q-banner
  top: 50px
  z-index: 2
  opacity: 0.8
.q-message
  z-index: 1
</style>
