<template>
  <div class="home">
    <div class="welcome">
      <div class="welcome__pic">
        <img src="@/assets/images/logo.svg" class="welcome__pic-thumb" alt="photo">
      </div>
    </div>
    <div class="wrapper">
      <div class="start__page-wrapper">
        <button @click="onLogin" class="button">log in</button>
        <button @click="onRegister" class="button filled">register</button>
      </div>
    </div>
    <Message v-if="isError" :message="isError" @close="closeMessage" />
  </div>
</template>
<script>
import Message from '@/components/UI/Message.vue';

export default {
  components: {
    Message
  },
  methods: {
    onLogin () {
      this.$router.push('login')
    },
    onRegister () {
      this.$router.push('register')
    },
    closeMessage () {
      this.$store.dispatch('clearError');
    }
  },
  computed: {
    isError () {
      return this.$store.getters.getError;
    }
  },
  created () {
    if(this.$route.query.success) {
      this.$store.dispatch('setError', 'Вы успешно вышли!');
    }
  }
}
</script>