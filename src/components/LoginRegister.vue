<template>
  <q-form class="q-gutter-md">
    <q-input
      v-if="tab == 'register'"
      v-model="formData.name"
      type="text"
      class="q-mb-md"
      outlined
      label="Name"
    />
    <q-input
      v-model="formData.email"
      type="email"
      class="q-mb-md"
      outlined
      label="Email"
    />
    <q-input
      v-model="formData.password"
      type="password"
      class="q-mb-md"
      outlined
      label="Password"
    />
    <div class="row">
      <q-space /><q-btn
        color="primary"
        :label="tab"
        type="submit"
        @click="submitForm"
      />
    </div>
  </q-form>
</template>
<script setup>
import { ref } from 'vue';
const name = 'LoginRegister';
const { tab } = defineProps(['tab']);
let formData = ref({
  name: '',
  email: '',
  password: '',
});
const submitForm = () => {
  if (tab == 'login') {
    console.log('login', formData.value);
  } else {
    console.log('register', formData.value);
  }
};
</script>
