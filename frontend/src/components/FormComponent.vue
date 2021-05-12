<template>
  <form class="FormComponent">
    <h2 class="FormComponent-heading">{{ formTitle }}</h2>
    <b-form-group
      id="fieldset-1"
      class="FormComponent-inputGroup"
      label="Enter first name"
      label-for="firstName"
      label-class="FormComponent-inputLabel"
    >
      <b-form-input
        id="firstName"
        v-model="firstName"
        class="FormComponent-input"
        autocomplete="off"
        type="text"
        trim
      ></b-form-input>
    </b-form-group>
    <b-form-group
      id="fieldset-2"
      class="FormComponent-inputGroup"
      label="Enter last name"
      label-for="lastName"
      label-class="FormComponent-inputLabel"
    >
      <b-form-input
        id="lastName"
        v-model="lastName"
        class="FormComponent-input"
        autocomplete="off"
        type="text"
        trim
      ></b-form-input>
    </b-form-group>
    <b-form-group
      id="fieldset-3"
      class="FormComponent-inputGroup"
      label="Enter username"
      label-for="username"
      label-class="FormComponent-inputLabel"
    >
      <b-form-input
        id="username"
        v-model="username"
        class="FormComponent-input"
        autocomplete="off"
        type="text"
        trim
      ></b-form-input>
    </b-form-group>
    <b-form-group
      id="fieldset-3"
      class="FormComponent-inputGroup"
      label="Enter email"
      label-for="email"
      label-class="FormComponent-inputLabel"
    >
      <b-form-input
        id="email"
        v-model="email"
        class="FormComponent-input"
        autocomplete="off"
        type="email"
        trim
      ></b-form-input>
    </b-form-group>
    <p class="FormComponent-errorMessage" v-show="error">
      {{ error }}
    </p>
    <b-button class="FormComponent-button" @click="performAction()">
      {{ buttonText }}
    </b-button>
  </form>
</template>

<script lang="ts">
import { mapState, mapActions } from 'vuex';
import Vue from 'vue';

export default Vue.extend({
  name: 'FormComponent',
  props: {
    formTitle: {
      type: String,
      default: '',
    },
    buttonText: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      id: null,
    };
  },
  computed: {
    ...mapState('users', ['error']),
  },
  async mounted() {
    if (this.$route.name === 'userDetails') {
      const user = await this.getUser(this.$route.params.id);
      this.firstName = user.firstName;
      this.lastName = user.lastName;
      this.username = user.username;
      this.email = user.email;
    }
  },
  methods: {
    ...mapActions('users', ['addUser', 'updateUser', 'getUser']),
    performAction() {
      const data = {
        firstName: this.firstName,
        lastName: this.lastName,
        username: this.username,
        email: this.email,
      };
      if (this.$route.name === 'userList') {
        this.addUser(data);
      } else {
        this.updateUser({ ...data, id: parseInt(this.$route.params.id, 10) });
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.FormComponent {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.FormComponent-inputGroup {
  width: 95%;
}
.FormComponent-heading {
  font-size: 32px;
  text-align: center;
  color: #fff;
  font-weight: 600;
  margin: 0 0 20px;
}

::v-deep .FormComponent-inputLabel {
  margin: 0 0 10px;
  color: #fff;
  font-size: 24px;
}

::v-deep .FormComponent-input {
  font-family: 'Source Sans Pro', sans-serif;
  color: #236e98;
  font-weight: 600;
  font-size: 24px;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.33);
  &:focus {
    color: #236e98;
  }
}

::v-deep .FormComponent-button {
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
.FormComponent-errorMessage {
  color: red;
  font-weight: 700;
  font-size: 30px;
}
</style>
