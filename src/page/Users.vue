<template>
  <Preloader v-if="isLoading" />
  <div v-else class="users">
    <div class="search">
      <Search @search="text = $event" />
      <h3 class="start-title search__result">all results</h3>
    </div>
    <ul class="chats__list" v-if="users.length > 0">
      <SingleProfile v-for="user in users" :key="user.url" :user="user" />
    </ul>
    <p class="search__nothing" v-else>Ничего не удалось найти</p>
    <Message v-if="isError" :message="isError" @close="closeMessage" />
  </div>
</template>
<script>
import Preloader from '@/components/UI/Preloader.vue';
import Message from '@/components/UI/Message.vue';
import SingleProfile from '../components/UI/SingleProfile.vue';
import Search from '../components/Search.vue';

export default {
  name: 'Users',
  components: {
    Message, Preloader, SingleProfile, Search
  },
  data () {
    return {}
  },
  computed: {
    isLoading () {
      return this.$store.getters.getLoading;
    },
    isError () {
      return this.$store.getters.getError;
    },
    users () {
      return this.$store.getters.getFilterUsers;
    },
  },
  methods: {
    closeMessage () {
      this.$store.dispatch('clearError');
    },
  },
  created () {
    this.$store.dispatch('fetchUsers');
  },
}
</script>