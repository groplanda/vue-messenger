<template>
  <Preloader v-if="isLoading" />
  <div v-else class="wrapper">
    <div class="login__wrapper">
      <button class="login__back" @click="onHome">
        <img src="@/assets/images/icons/arrow-left.svg" alt="back">
      </button>
      <h1 class="start-title">Log in</h1>
      <form
       @submit.prevent="onAuth"
      class="login__form">
        <div
          class="login__form-row"
          :class="{ 'form-group--error': $v.email.$error }"
        >
          <input
           v-model.trim="email"
          type="text"
          class="chat-input"
          placeholder="Your email address*" />
          <span
          class="form-error"
          v-if="!$v.email.required"
          >E-mail обязателен</span>
          <span
          class="form-error"
          v-if="!$v.email.email"
          >Некорректный e-mail адрес</span>
        </div>
        <div
          class="login__form-row"
          :class="{ 'form-group--error': $v.password.$error }"
        >
          <input
          v-model.trim="password"
          type="password"
          class="chat-input"
          placeholder="Your password*" />
          <span
          class="form-error"
          v-if="!$v.password.required"
          >Пароль обязателен</span>
        </div>
        <button type="submit" class="button filled">log in</button>
      </form>
    </div>
    <Message v-if="isError" :message="isError" @close="closeMessage" />
  </div>
</template>
<script>
import Preloader from '@/components/UI/Preloader.vue';
import Message from '@/components/UI/Message.vue';
import { required, email } from 'vuelidate/lib/validators';
export default {
  components: {
    Preloader, Message
  },
  data () {
    return {
      email: '',
      password: '',
    }
  },
  validations: {
    email: {
      required,
      email
    },
    password: {
      required,
    }
  },
  computed: {
    isLoading () {
      return this.$store.getters.getLoading;
    },
    isError () {
      return this.$store.getters.getError;
    }
  },
  methods: {
    onHome () {
      this.$router.push({ name: 'home' });
    },
    onAuth () {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        const user = {
          email: this.email,
          password: this.password
        };
        this.$store.dispatch('authUser', user)
        .then(() => {
          const id = this.$store.getters.getUser.url;
          this.$router.push({ name: 'user', params: { id }})
        })
        .catch(error => {
          console.log(error);
        })
      }
    },
    closeMessage () {
      this.$store.dispatch('clearError');
    }
  },
  created () {
    if(this.$route.query.error) {
      this.$store.dispatch('setError', 'Вначале авторизируйтесь!');
    }
  }
}
</script>