<template>
  <li class="chats__item" @click="viewUser(user.url)">
    <div class="chats__pic">
      <img class="chats__thumb" :src="user.avatar" :alt="user.name" />
    </div>
    <div class="chats__info">
      <h4 class="chats__info-name">
        {{ user.name }} <span class="status" :class="onlineClass"></span>
      </h4>
      <div class="chats__content">
        <p class="chats__content-message">
          {{ user.about }}
        </p>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  name: 'SingleProfile',
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  methods: {
    viewUser (id) {
      this.$router.push({ name: 'user', params: { id } })
    }
  },
  computed: {
    onlineClass () {
      return {
        active: this.user.online,
        'no-active': !this.user.online,
      }
    }
  },
}
</script>