<template>

  <div class="chat">
    <div class="chat__header">
      <button @click="onBack"  class="chat__back">
        <img src="@/assets/images/icons/chevron.svg" alt="chevron">
      </button>
      <h1 class="chat__title start-title">{{ name }}</h1>
    </div>
    <Preloader v-if="isLoading" />
    <div v-else class="chat__body">
      <SingleMessage
        v-for="message in messages"
        :key="message.time"
        :message="message"
        :uid="uid"
        :avatars="avatars"
      />
    </div>
    <form
      @submit.prevent="onMessage"
      class="w-100"
    >
      <div
      class="register__form-row"
      :class="{ 'form-group--error': $v.message.$error }"
      >
        <textarea
        v-model.trim="message"
        type="text"
        class="chat-input"
        placeholder="Print text..."
        ></textarea>
        <span
        class="form-error"
        v-if="!$v.message.required"
        >Нужно что-нибудь написать :)</span>
      </div>
      <button type="submit" class="button filled">Отправить</button>
    </form>
  </div>
</template>
<script>

import { required } from 'vuelidate/lib/validators';
import SingleMessage from '../components/UI/SingleMessage.vue';
import Preloader from '@/components/UI/Preloader.vue';

export default {
  components: {
    SingleMessage, Preloader
  },
  props: {
    name: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      message: null,
      avatars: null
    }
  },
  validations: {
    message: {
      required,
    },
  },
  computed: {
    messages () {
      return this.$store.getters.getMessages;
    },
    uid () {
      return this.$store.getters.getUser.url;
    },
    isLoading () {
      return this.$store.getters.getLoading;
    },
  },
  methods: {
    onMessage () {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        const id = this.$store.getters.getUser.url;
        const message = {
          id,
          url: this.$route.params.id,
          message: this.message
        }
        this.$store.dispatch('sendMessage', message)
        .then(() => {
          this.message = null;
        })
      }

    },
    onBack() {
      this.$router.go(-1);
    }
  },
  created () {
    const id = this.$route.params.id;
    this.$store.dispatch('fetchMessageById', id)
    .then(avatarsData => {
      this.avatars = avatarsData;
    })
    .catch(error => console.log(error))
  }
}
</script>