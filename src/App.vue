<template>
  <div id="app">
      <Header v-if="isShowNav" />
      <main class="main">
        <router-view></router-view>
      </main>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'

export default {
  name: 'App',
  components: {
    Header
  },
  methods: {
    closeMessage () {
      this.$store.dispatch('clearError');
    }
  },
  computed: {
    isShowNav () {
      return this.$store.getters.getUserAuth;
    }
  }
}
</script>

<style lang="scss">

</style>
