<template>
  <div class="App">
    <div class="App-container">
      <div v-if="authenticatedUserId && username" class="App-navBar">
        <div class="App-userPanel">
          <p class="App-userPanelStatus">
            <span>
              Logged in as
              <span class="App-userName">{{ username }}</span>
            </span>
          </p>
          <button class="App-userPanelLogOutBtn" @click="logOut">
            <p class="App-userPanelLogOutCopy">Log out</p>
            <i class="App-iconLogOut material-icons">logout</i>
          </button>
        </div>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions, mapGetters, mapState } from 'vuex';

export default Vue.extend({
  name: 'App',
  computed: {
    ...mapState('users', ['authenticatedUserId']),
    ...mapGetters('users', ['currentUser']),
    username(): string | null {
      if (this.currentUser) {
        return this.currentUser.username;
      }
      return null;
    },
  },
  mounted() {
    this.getAuthenticatedUserId();
  },
  methods: {
    ...mapActions('users', ['getUser', 'getAuthenticatedUserId', 'logOut']),
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
  padding: 100px 0 0;
  height: 100vh;
}

.App-navBar {
  width: 100%;
  height: 50px;
  background-color: #214a89;
  margin-bottom: 70px;
  position: fixed;
  top: 0;
  z-index: 1;
}

.App-userPanel {
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  align-items: center;
}

.App-userPanelStatus {
  display: flex;
  justify-content: flex-start;
  width: 50%;
  padding: 10px 0 10px 40px;
  font-size: 24px;
  text-align: center;
  color: #fff;
  font-weight: 400;
}

.App-userName {
  font-weight: 800;
}

.App-userPanelLogOutBtn {
  width: 50%;
  color: #fff;
  font-weight: 800;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-end;
}

.App-userPanelLogOutCopy {
  width: 100px;
  height: 100%;
  font-size: 20px;
  text-align: right;
}

.App-iconLogOut {
  width: 50px;
  font-size: 24px;
}
</style>
