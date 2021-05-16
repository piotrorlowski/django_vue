<template>
  <div class="UserDetails">
    <FormComponent formTitle="Update user" buttonText="Update user" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import FormComponent from '@/components/users/FormComponent.vue';
import { mapActions, mapState } from 'vuex';

export default Vue.extend({
  name: 'UserDetails',
  components: {
    FormComponent,
  },
  mounted() {
    this.getUsers();
  },
  computed: {
    ...mapState('users', ['users']),
  },
  methods: {
    ...mapActions('users', ['getUsers']),
  },
});
</script>

<style lang="scss" scoped>
.UserDetails {
  width: 50%;
  min-height: 450px;
  margin: 50px auto 0;
  background-color: #5284cf;
  border-radius: 5px;
  border: 1px solid #74a1cc;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.33);
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  padding: 50px;
}
</style>
