<template>
    <div class="chat__message" :class="classMe">
      <div class="chat__avatar">
        <img :src="avatar" :alt="message.id">
      </div>
      <div class="chat__text">
        <p>{{ message.message }}</p>
        <span>{{ time }}</span>
      </div>
    </div>
</template>

<script>
export default {
  props: {
    message: {
      type: Object,
      required: true,
    },
    uid: {
      type: String,
      default: ''
    },
    avatars: {
      type: Array,
      default: () => {
        return [];
      },
    }
  },
  computed: {
    classMe () {
      return {
        me: this.uid == this.message.id,
      }
    },
    time () {
      const date = new Date(Number(this.message.time))
      return date.getHours() + ':' + date.getMinutes();
    },
    avatar() {
      if(this.avatars) {
        return this.avatars.find(item => item.id === this.message.id).avatar;
      }
      return 'https://via.placeholder.com/50';
    }
  }
}
</script>