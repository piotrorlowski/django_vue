<template>
  <div class="Users">
    <UserList />
    <UserAdd />
  </div>
</template>

<script>
import UserList from '@/components/users/UserList.vue';
import UserAdd from '@/components/users/UserAdd.vue';
import Vue from 'vue';
import { mapActions } from 'vuex';

export default Vue.extend({
  name: 'Users',
  components: {
    UserAdd,
    UserList,
  },
  mounted() {
    this.getUsers();
  },
  methods: {
    ...mapActions('users', ['getUsers']),
  },
});
</script>

<style lang="scss" scoped>
.Users {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-flow: row wrap;
  width: 90%;
  margin: 50px auto 0;
}
</style>
