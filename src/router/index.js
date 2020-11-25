import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '@/page/Home.vue';

import Login from '@/page/Login.vue';
import Register from '@/page/Register.vue';

import Users from '@/page/Users.vue';
import User from '@/page/User.vue';

import Chats from '@/page/Chats.vue';
import Chat from '@/page/Chat.vue';

import authGuard from './auth-guard.js';


Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      props: true
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/users',
      name: 'users',
      component: Users,
      beforeEnter: authGuard
    },
    {
      path: '/user/:id',
      name: 'user',
      component: User,
      props: true,
      beforeEnter: authGuard
    },
    {
      path: '/chats',
      name: 'chats',
      component: Chats,
      beforeEnter: authGuard
    },
    {
      path: '/chat/:id',
      name: 'chat',
      component: Chat,
      props: true,
      beforeEnter: authGuard
    },
  ]
})
export default router;