<template>
  <Preloader v-if="isLoading" />
  <div v-else class="user-profile">
    <Profile :info="user" :hideButtons="currentUser" />
    <Message v-if="isError" :message="isError" @close="closeMessage" />
  </div>
</template>
<script>
import Profile from '../components/UI/Profile.vue'
import Preloader from '@/components/UI/Preloader.vue';
import Message from '@/components/UI/Message.vue';

export default {
  components: {
    Profile, Message, Preloader
  },
  data () {
    return {
      user: null
    }
  },
  computed: {
    isLoading () {
      return this.$store.getters.getLoading;
    },
    isError () {
      return this.$store.getters.getError;
    },
    currentUser () {
      return this.$store.getters.getUser.id === this.user.id;
    },
  },
  methods: {
    closeMessage () {
      this.$store.dispatch('clearError');
    }
  },
  created () {
    const id = this.$route.params.id;
    this.$store.dispatch('getUserById', id)
    .then(data => {
      this.user = data;
    })
    .catch(error => {
      console.log(error);
    })
    .finally(() => {
      this.$store.dispatch('setLoading', false);
    })
  },
}
</script>