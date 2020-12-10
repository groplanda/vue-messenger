<template>
  <li @click="onChat(chat.url)" class="chats__item">
    <div class="chats__pic">
      <img class="chats__thumb" :src="chat.avatar" :alt="chat.name" />
    </div>
    <div class="chats__info">
      <h4 class="chats__info-name">
        {{ chat.name }} <span class="status" :class="onlineClass"></span>
      </h4>
      <div class="chats__content">
        <p class="chats__content-message">
          {{ chat.message }}
        </p>
        <span>{{ time }}</span>
      </div>
    </div>
  </li>
</template>
<script>
export default {
  props: {
    chat: {
      type: Object,
      required: true
    }
  },
  computed: {
    time () {
      if(this.chat.time) {
        const date = new Date(Number(this.chat.time))
        return date.getHours() + ':' + date.getMinutes();
      }
      return null;
    },
    onlineClass () {
      return {
        active: this.chat.online,
        'no-active': !this.chat.online,
      }
    },
  },
  methods: {
    onChat (id) {
      const name = this.chat.name;
      this.$router.push({ name: 'chat', params: { id, name }})
    }
  }
}
</script>