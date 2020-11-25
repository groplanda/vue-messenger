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
  </div>
</template>
<script>
export default {
  methods: {
    onLogin () {
      this.$router.push('login')
    },
    onRegister () {
      this.$router.push('register')
    }
  }
}
</script>