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
      if(this.$store.getters.getUserAuth && this.$store.getters.getUser.id === this.user.id) {
        return true;
      }
      return false;
    },
  },
  methods: {
    closeMessage () {
      this.$store.dispatch('clearError');
    },
    getUser (id) {
      this.$store.dispatch('getUserById', id)
      .then(userData => {
        this.user = userData;
        this.$store.dispatch('setLoading', false);
      })
      .catch(error => console.log(error))
    }
  },
  watch: {
    "$route.params.id"(val) {
      this.getUser(val);
    }
  },
  created () {
    const id = this.$route.params.id;
      this.getUser(id);
  },
}
</script>