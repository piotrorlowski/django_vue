<template>
  <div class="UserListElement">
    <p class="UserListElement-userName" @click="goTo">
      {{ user.firstName }} {{ user.lastName }} {{ user.email }}
    </p>
    <button class="UserListElement-deleteUserButton" @click="deleteUser(user)">
      <i class="UserListElement-deleteIcon material-icons">clear</i>
    </button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';

export default Vue.extend({
  name: 'UserListElement',
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  methods: {
    ...mapActions('users', ['deleteUser']),
    goTo() {
      this.$router.push({ name: 'userDetails', params: { id: this.user.id } });
    },
  },
});
</script>

<style lang="scss" scoped>
.UserListElement {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  width: 80%;
  background-color: #f2f8fd;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.33);
  margin: 0 0 20px;
  padding: 0 10px 0;
  border-radius: 5px;
  &:hover {
    background-color: #b1fdfc;
    cursor: pointer;
  }
}
.UserListElement-userName {
  color: #236e98;
  font-size: 24px;
  width: 100%;
  height: 100%;
  font-weight: 600;
  display: flex;
  align-items: center;
}
.UserListElement-deleteIcon {
  font-weight: 600;
  color: #236e98;
}
</style>
