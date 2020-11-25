<template>
  <Preloader v-if="isLoading" />
  <div v-else class="wrapper">
    <div class="register__wrapper">
      <button class="login__back" @click="onHome">
        <img src="@/assets/images/icons/arrow-left.svg" alt="back">
      </button>
      <h1 class="start-title">Register</h1>
      <form
      class="register__form"
      @submit.prevent="onRegister"
      >
        <div
        class="register__form-row"
        :class="{ 'form-group--error': $v.name.$error }"
        >
          <input
          v-model.trim="name"
          type="text"
          class="chat-input"
          placeholder="Your first name*"
          />
          <span
          class="form-error"
          v-if="!$v.name.required"
          >Имя обязательно</span>
          <span
          class="form-error"
          v-if="!$v.name.minLength"
          >Имя должно содержать не менее {{$v.name.$params.minLength.min}} символов</span>
        </div>
        <div
          class="register__form-row"
          :class="{ 'form-group--error': $v.email.$error }"
        >
          <input
          v-model.trim="email"
          type="text"
          class="chat-input"
          placeholder="Your email address*"
          />
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
          class="register__form-row"
          :class="{ 'form-group--error': $v.password.$error }"
        >
          <input
          v-model.trim="password"
          type="password"
          class="chat-input"
          placeholder="Your secret password*"
          />
          <span
          class="form-error"
          v-if="!$v.password.required"
          >Пароль обязателен</span>
          <span
          class="form-error"
          v-if="!$v.password.minLength"
          >Пароль должен содержать не менее {{$v.password.$params.minLength.min}} символов</span>
        </div>
        <button type="submit" class="button filled">sign up</button>
      </form>
    </div>
    <Message v-if="isError" :message="isError" @close="closeMessage" />
  </div>
</template>
<script>
import Preloader from '@/components/UI/Preloader.vue';
import Message from '@/components/UI/Message.vue';
import { required, minLength, email } from 'vuelidate/lib/validators'

export default {
  components: {
    Preloader, Message
  },
  data () {
    return {
      name: '',
      email: '',
      password: '',
    }
  },
  validations: {
    name: {
      required,
      minLength: minLength(4)
    },
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(6)
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
    onRegister () {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        const user = {
          name: this.name,
          email: this.email,
          password: this.password
        };
        this.$store.dispatch('registerUser', user)
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
  }
}
</script>