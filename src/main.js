import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)

import './assets/css/index.scss';

Vue.config.productionTip = false

store.dispatch('init').then(() => {
  new Vue({
    store,
    router,
    render: h => h(App),
  }).$mount('#app')
})
