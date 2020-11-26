<template>
  <div class="chats">
    <h1 class="chats__title start-title">Chats</h1>
    <Preloader v-if="isLoading" />
    <ul class="chats__list" v-if="chats">
      <SingleChat v-for="chat of chats" :key="chat.time" :chat="chat" />
    </ul>
    <p class="search__nothing" v-else>Чатов пока нет...</p>
  </div>
</template>
<script>
import Preloader from '@/components/UI/Preloader.vue';
import SingleChat from '../components/UI/SingleChat.vue';

export default {
  name: 'Chats',
  components: {
    Preloader, SingleChat
  },
  computed: {
    isLoading () {
      return this.$store.getters.getLoading;
    },
    chats() {
      return this.$store.getters.getChats;
    }
  },
  created () {
    const uid = this.$store.getters.getUser.url;
    this.$store.dispatch('fetchChatsByUserId', uid);
  }
}
</script>