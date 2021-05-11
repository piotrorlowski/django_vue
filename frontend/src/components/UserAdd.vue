<template>
  <div class="UserAdd">
    <h2 class="UserAdd-heading">Add new user</h2>
    <b-form-group
      id="fieldset-1"
      class="UserAdd-inputGroup"
      label="Enter first name"
      label-for="firstName"
      label-class="UserAdd-inputLabel"
    >
      <b-form-input
        id="firstName"
        v-model="firstName"
        class="UserAdd-input"
        autocomplete="off"
        type="text"
        trim
      ></b-form-input>
    </b-form-group>
    <b-form-group
      id="fieldset-2"
      class="UserAdd-inputGroup"
      label="Enter last name"
      label-for="lastName"
      label-class="UserAdd-inputLabel"
    >
      <b-form-input
        id="lastName"
        v-model="lastName"
        class="UserAdd-input"
        autocomplete="off"
        type="text"
        trim
      ></b-form-input>
    </b-form-group>
    <b-form-group
      id="fieldset-3"
      class="UserAdd-inputGroup"
      label="Enter email"
      label-for="email"
      label-class="UserAdd-inputLabel"
    >
      <b-form-input
        id="email"
        v-model="email"
        class="UserAdd-input"
        autocomplete="off"
        type="email"
        trim
      ></b-form-input>
    </b-form-group>
    <p class="UserAdd-errorMessage" v-show="error">
      {{ error }}
    </p>
    <b-button class="UserAdd-button" @click="addUser({ firstName, lastName, email })">
      Add new user
    </b-button>
  </div>
</template>

<script lang="ts">
import { mapState, mapActions } from 'vuex';
import Vue from 'vue';

export default Vue.extend({
  name: 'UserAdd',
  data(): Record<string, string> {
    return {
      firstName: '',
      lastName: '',
      email: '',
    };
  },
  computed: {
    ...mapState('users', ['error']),
  },
  methods: {
    ...mapActions('users', ['addUser']),
  },
});
</script>

<style lang="scss" scoped>
.UserAdd {
  width: 50%;
  min-height: 450px;
  background-color: #5284cf;
  border-radius: 5px;
  border: 1px solid #74a1cc;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.33);
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  padding: 50px 0 50px;
}
.UserAdd-inputGroup {
  width: 90%;
}
.UserAdd-heading {
  font-size: 32px;
  text-align: center;
  color: #fff;
  font-weight: 600;
  margin: 0 0 20px;
}

::v-deep .UserAdd-inputLabel {
  margin: 0 0 10px;
  color: #fff;
  font-size: 24px;
}

::v-deep .UserAdd-input {
  font-family: 'Source Sans Pro', sans-serif;
  color: #236e98;
  font-weight: 600;
  font-size: 24px;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.33);
  &:focus {
    color: #236e98;
  }
}

::v-deep .UserAdd-button {
  width: 350px;
  height: 50px;
  font-size: 24px;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.33);
  margin: 30px 0 0;
  background-color: #d7fffe;
  border: 1px solid #d7fffe;
  color: #236e98;
  font-weight: 600;
  outline: unset;
  &.btn {
    &.btn-secondary {
      &:hover,
      &:active,
      &:focus {
        background-color: #b1fdfc;
        border: 1px solid #b1fdfc;
        outline: unset;
        color: #236e98;
      }
    }
  }
}
.UserAdd-errorMessage {
  color: red;
  font-weight: 700;
  font-size: 30px;
}
</style>
