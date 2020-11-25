<template>
  <form class="search__form">
    <h1 class="start-title">Search {{ search }}</h1>
    <input type="text" v-model="search" class="chat-input" placeholder="Search all users" />
  </form>
</template>
<script>
export default {
  name: 'Search',
  data () {
    return {
      search: null
    }
  },
  watch: {
    search (val) {
      this.searchUser(val)
    }
  },
  methods: {
    searchUser (text) {
      this.$store.dispatch('filterUser', text.toLowerCase());
    }
  }
}
</script>