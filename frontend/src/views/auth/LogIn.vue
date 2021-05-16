<template>
  <div class="LogIn">
    <div class="LogIn-form">
      <div class="LogIn-formHeader"><h2 class="LogIn-heading">Log In</h2></div>
      <form class="LogIn-innerForm">
        <div class="LogIn-innerFormContainer">
          <b-form-group
            id="username-logIn-group"
            class="LogIn-formInputGroup"
            label="Enter username"
            label-for="username"
            label-class="LogIn-formInputLabel"
          >
            <b-form-input
              id="username-logIn-input"
              v-model="userLogIn.username"
              class="LogIn-formInput"
              autocomplete="off"
              type="text"
              trim
            ></b-form-input>
          </b-form-group>
          <b-form-group
            id="password-logIn-group"
            class="LogIn-formInputGroup m-flexEnd"
            label="Enter password"
            label-for="password-logIn"
            label-class="LogIn-formInputLabel"
          >
            <b-form-input
              id="password-logIn-input"
              v-model="userLogIn.password"
              class="LogIn-formInput"
              autocomplete="off"
              type="password"
              trim
            ></b-form-input>
          </b-form-group>
        </div>
        <p class="LogIn-errorMessage" v-show="errorLogIn">
          {{ errorLogIn }}
        </p>
        <b-button class="LogIn-button" @click="logIn(userLogIn)">Log in</b-button>
      </form>
      <div class="LogIn-formHeader m-marginTop"><h2 class="LogIn-heading">Sign Up</h2></div>
      <form class="LogIn-innerForm">
        <div class="LogIn-innerFormContainer">
          <b-form-group
            id="firstName-signUp-group"
            class="LogIn-formInputGroup"
            label="Enter first name"
            label-for="firstName"
            label-class="LogIn-formInputLabel"
          >
            <b-form-input
              id="firstName-signUp-input"
              v-model="userSignUp.firstName"
              class="LogIn-formInput"
              autocomplete="off"
              type="text"
              trim
            ></b-form-input>
          </b-form-group>
          <b-form-group
            id="lastName-signUp-group"
            class="LogIn-formInputGroup m-flexEnd"
            label="Enter last name"
            label-for="lastName"
            label-class="LogIn-formInputLabel"
          >
            <b-form-input
              id="lastName-signUp-input"
              v-model="userSignUp.lastName"
              class="LogIn-formInput"
              autocomplete="off"
              type="text"
              trim
            ></b-form-input>
          </b-form-group>
        </div>
        <div class="LogIn-innerFormContainer">
          <b-form-group
            id="username-signUp-group"
            class="LogIn-formInputGroup"
            label="Enter username"
            label-for="username"
            label-class="LogIn-formInputLabel"
          >
            <b-form-input
              id="username-signUp-input"
              v-model="userSignUp.username"
              class="LogIn-formInput"
              autocomplete="off"
              type="text"
              trim
            ></b-form-input>
          </b-form-group>
          <b-form-group
            id="email-signUp-group"
            class="LogIn-formInputGroup m-flexEnd"
            label="Enter email"
            label-for="email"
            label-class="LogIn-formInputLabel"
          >
            <b-form-input
              id="email-signUp-input"
              v-model="userSignUp.email"
              class="LogIn-formInput"
              autocomplete="off"
              type="email"
              trim
            ></b-form-input>
          </b-form-group>
        </div>
        <b-form-group
          id="password-signUp-group"
          class="LogIn-formInputGroup"
          label="Enter password"
          label-for="password-logIn"
          label-class="LogIn-formInputLabel"
        >
          <b-form-input
            id="password-signUp-input"
            v-model="userSignUp.password"
            class="LogIn-formInput m-fullWidth"
            autocomplete="off"
            type="password"
            trim
          ></b-form-input>
        </b-form-group>
        <p class="LogIn-errorMessage" v-show="errorSignUp">
          {{ errorSignUp }}
        </p>
        <b-button class="LogIn-button" @click="signUp">Sign up</b-button>
      </form>
      <b-button class="LogIn-googleButton" v-google-signin-button="clientId">
        <div class="LogIn-logoContainer">
          <img src="../../assets/google.png" class="LogIn-googleLogo" alt="Google-logo" />
        </div>
        <p class="LogIn-buttonCopy">Sign in with Google</p>
      </b-button>
    </div>
  </div>
</template>

<script lang="ts">
import GoogleSignInButton from 'vue-google-signin-button-directive';
import Vue from 'vue';
import { mapActions, mapState } from 'vuex';

export default Vue.extend({
  name: 'LogIn',
  directives: {
    GoogleSignInButton,
  },
  data() {
    return {
      clientId: process.env.VUE_APP_GOOGLE_CLIENT_ID,
      userLogIn: {
        username: '',
        password: '',
      },
      userSignUp: {
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        email: '',
      },
      error: '',
    };
  },
  computed: {
    ...mapState('users', ['errorLogIn', 'errorSignUp']),
  },
  methods: {
    ...mapActions('users', ['addUser', 'logIn', 'signUp']),
    OnGoogleAuthSuccess(idToken: string) {
      console.log(idToken);
    },
    OnGoogleAuthFail(error: Error) {
      console.log(error);
    },
  },
});
</script>
<style lang="scss" scoped>
.LogIn {
  width: 25%;
  min-height: 450px;
  margin: 50px auto 0;
  background-color: #3a6dba;
  border-radius: 5px;
  border: 1px solid #3a6dba;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.33);
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  padding: 40px 50px 50px;
}
.LogIn-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}
::v-deep .LogIn-formInputGroup {
  width: 100%;
  &.m-flexEnd {
    div {
      display: flex;
      justify-content: flex-end;
    }
    .LogIn-formInputLabel {
      margin-left: 10px;
    }
  }
}
.LogIn-heading {
  font-size: 32px;
  text-align: center;
  color: #fff;
  font-weight: 600;
}
.LogIn-formHeader {
  position: relative;
  width: 100%;
  text-align: center;
  margin-bottom: 20px;
  &.m-marginTop {
    margin-top: 28px;
  }
}
::v-deep .LogIn-formInputLabel {
  margin-bottom: 10px;
  color: #fff;
  font-size: 24px;
}
::v-deep .LogIn-formInput {
  width: 95%;
  font-family: 'Source Sans Pro', sans-serif;
  color: #236e98;
  font-weight: 600;
  font-size: 24px;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.33);
  height: 40px;

  &:focus {
    color: #236e98;
  }
  &.m-fullWidth {
    width: 100%;
  }
}
::v-deep .LogIn-button {
  width: 100%;
  height: 50px;
  font-size: 24px;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.33);
  margin-top: 10px;
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

.LogIn-googleButton {
  width: 100%;
  display: flex;
  align-items: center;
  font-size: 24px;
  margin-top: 20px;
  border: 1px solid #4285f4;
  border-radius: 5px;
  padding: 0;
  height: 50px;
  font-family: 'Roboto', arial, sans-serif;
  flex-flow: row;
  justify-content: space-between;
  background-color: #4285f4;
  color: #fff;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.33);

  .LogIn-logoContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 15%;
    height: 100%;
    background-color: #fff;
  }

  .LogIn-googleLogo {
    width: 18px;
    height: 18px;
  }

  .LogIn-buttonCopy {
    width: 100%;
  }

  &.btn {
    &.btn-secondary {
      &:hover,
      &:active,
      &:focus {
        background-color: #4285f4;
        border: 1px solid #4285f4;
        outline: unset;
        color: #fff;
      }
    }
  }
}

.LogIn-errorMessage {
  color: #fff;
  font-weight: 700;
  font-size: 14px;
}
.LogIn-innerForm {
  width: 100%;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
}
.LogIn-innerFormContainer {
  justify-content: space-between;
  display: flex;
  flex-flow: row;
  flex-wrap: nowrap;
}
</style>
