<template>
  <header class="header">
    <div class="wrapper">
      <nav class="navigation">
        <ul class="navigation__list">
           <li class="navigation__item">
            <router-link :to="`/user/${profile}`" class="navigation__link" title="grid">
              <img class="navigation__pic" src="@/assets/images/icons/grid.svg" alt="grid">
            </router-link>
          </li>
          <li
          v-for="(link, index) of links"
          :key="index"
          class="navigation__item">
            <router-link :to="link.url" class="navigation__link" :title="link.name">
              <img class="navigation__pic" :src="require(`@/assets/images/icons/${link.pic}`)" :alt="link.name">
            </router-link>
          </li>
          <li class="navigation__item">
            <a @click.prevent="onLogout" href="#!" class="navigation__link" title="logout">
              <img class="navigation__pic" src="@/assets/images/icons/logout.svg" alt="logout">
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>
<script>
export default {
  data () {
    return {
      links: [
        {name: 'user', pic: 'user.svg', url: '/users'},
        {name: 'chats', pic: 'messenger.svg', url: '/chats'},
        {name: 'settings', pic: 'settings.svg', url: '/settings'},
      ],
      profile: '',
    }
  },
  methods: {
    onLogout () {
      this.$store.dispatch('logoutUser')
      .then(() => {
        this.$router.push('/?success=true');
      })
      .catch(error => {
        console.log(error);
      })
    },
  },
  created () {
    this.profile = this.$store.getters.getUser.url;
  }
}
</script>