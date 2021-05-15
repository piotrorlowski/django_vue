import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import UserDetails from '@/views/users/UserDetails.vue';
import LogIn from '@/views/auth/LogIn.vue';
import Users from '@/views/users/Users.vue';

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  { path: '/login', name: 'logIn', component: LogIn },
  { path: '/users', name: 'userList', component: Users },
  { path: '/details/:id', name: 'userDetails', component: UserDetails },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

router.afterEach((to) => {
  // Use next tick to handle router history correctly
  // see: https://github.com/vuejs/vue-router/issues/914#issuecomment-384477609
  Vue.nextTick(() => {
    document.title = to.meta.title || 'userList';
  });
});

export default router;
