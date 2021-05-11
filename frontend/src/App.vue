<template>
  <div class="App">
    <h2 class="App-mainHeading">User CRUD Application</h2>
    <div class="App-container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'App',
};
</script>
<style lang="scss">
@import 'node_modules/bootstrap/scss/bootstrap';
@import 'node_modules/bootstrap-vue/src/index.scss';
@import './assets/styles.scss';

.App {
  background-color: #e5f0ff;
  font-family: 'Source Sans Pro', sans-serif;
  padding: 50px 0 0;
  min-height: 1000px;
}

.App-mainHeading {
  text-align: center;
  font-size: 40px;
  font-weight: 700;
  letter-spacing: 2px;
  color: #236e98;
}
</style>
