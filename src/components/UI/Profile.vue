<template>
  <div class="user">
    <div class="user__avatar">
      <img class="user__avatar-thumb" :src="info.avatar" :alt="info.name" />
    </div>
    <!--profile start-->
    <h1 class="user__name start-title">{{ info.name }}</h1>
    <p class="user__info-status" :class="onlineClass">{{ info.online ? 'Online' : 'Offline' }}</p>
    <div class="user__info">
      <p class="user__info-descr">
        {{ info.about }}
      </p>
    </div>
    <div class="user__action w-100">
      <template v-if="!hideButtons">
        <!-- <button class="button filled">follow jane</button> -->
        <button @click="onChat" class="button">message</button>
      </template>
      <button
      v-else
      @click="showEdit = !showEdit"
      class="button filled">edit</button>
    </div>
    <!--profile end-->
    <EditProfile v-if="showEdit" :info="info" @closeEdit="showEdit = false" @setImage="setImage" />
  </div>
</template>
<script>
import EditProfile from '@/components/EditProfile.vue'

export default {
  name: 'UserProfile',
  components: {
    EditProfile
  },
  data () {
    return {
      showEdit: false
    }
  },
  props: {
    info: {
      type: Object,
      required: true
    },
    hideButtons: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    onlineClass () {
      return {
        active: this.info.online,
        'no-active': !this.info.online,
      }
    }
  },
  methods: {
    setImage (image) {
      this.info.avatar = image
    },
    onChat () {
      const users = {
        to: this.$route.params.id,
        from: this.$store.getters.getUser.url
      }
      this.$store.dispatch('startChat', users)
      .then(id => {
        const name = this.info.name;
        this.$router.push({ name: 'chat', params: { id, name }})
      })
      .catch(error => console.log(error))
    }
  },
}
</script>