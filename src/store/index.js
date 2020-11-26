import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';
import common from './common.js';
import user from './user.js';
import message from './message.js';
Vue.use(Vuex);

export default new Vuex.Store({
  actions: {
    init({ dispatch }) {
      return new Promise((resolve) => {
        const firebaseConfig = {
          apiKey: process.env.VUE_APP_KEY,
          authDomain: "vue-messenger-77810.firebaseapp.com",
          databaseURL: "https://vue-messenger-77810.firebaseio.com",
          projectId: "vue-messenger-77810",
          storageBucket: "vue-messenger-77810.appspot.com",
          messagingSenderId: "671908425169",
          appId: "1:671908425169:web:086faa6d324df096afc4f0",
          measurementId: "G-4BT29Y646T"
        };
        //Initialize Firebase
        firebase.initializeApp(firebaseConfig);
        //Получить текущего пользователя
        firebase.auth().onAuthStateChanged(user => {
          if (user) {
            dispatch('autoLoginUser', user.uid).then(() => resolve());
          } else {
            resolve();
          }
        });
      })
    },
  },
  modules: {
    common, user, message
  }
})
