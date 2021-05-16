import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import UserDetails from '@/views/users/UserDetails.vue';
import LogIn from '@/views/auth/LogIn.vue';
import Users from '@/views/users/Users.vue';

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  {
    path: '/login',
    name: 'logIn',
    component: LogIn,
    meta: {
      title: 'Login Page',
    },
  },
  {
    path: '/users',
    name: 'userList',
    component: Users,
    meta: {
      title: 'User list page',
    },
  },
  {
    path: '/details/:id',
    name: 'userDetails',
    component: UserDetails,
    meta: {
      title: 'User details page',
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

router.afterEach((to) => {
  // Use next tick to handle router history correctly
  // see: https://github.com/vuejs/vue-router/issues/914#issuecomment-384477609
  Vue.nextTick(() => {
    document.title = to.meta.title || 'DjangoVueJSApp';
  });
});

router.beforeEach((to, from, next) => {
  const token = window.localStorage.getItem('authToken');
  const toPathName = to.name;
  const fromPathName = from.name;
  if (toPathName !== 'logIn' && !token) {
    next({ name: 'logIn' });
  } else if (toPathName === 'logIn' && token) {
    if (fromPathName) {
      next({ name: fromPathName });
    }
  } else {
    next();
  }
});

export default router;
