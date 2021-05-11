import Vue from 'vue';
import Vuex from 'vuex';
import Users from '@/store/users';
import { createProxy, extractVuexModule } from 'vuex-class-component';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {},
  modules: {
    ...extractVuexModule(Users),
  },
});

export default store;
export const users = createProxy(store, Users);
