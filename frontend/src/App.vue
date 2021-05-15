<template>
  <div class="App">
    <div class="App-container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts">
import { mapActions } from 'vuex';
import Vue from 'vue';

export default Vue.extend({
  name: 'App',
  mounted() {
    this.getUsers();
  },
  methods: {
    ...mapActions('users', ['getUsers']),
  },
});
</script>
<style lang="scss">
@import 'node_modules/bootstrap/scss/bootstrap';
@import 'node_modules/bootstrap-vue/src/index.scss';
@import './assets/styles.scss';

.App {
  background-color: #e5f0ff;
  font-family: 'Source Sans Pro', sans-serif;
  padding: 10px 0 0;
  min-height: 1000px;
}
</style>
