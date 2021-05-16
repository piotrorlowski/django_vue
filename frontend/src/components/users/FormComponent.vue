<template>
  <form class="FormComponent">
    <div class="FormComponent-formHeader" :class="{ 'm-marginBottom': isDetailsPage }">
      <b-button
        v-if="isDetailsPage"
        class="FormComponent-button m-closeButton"
        @click="$router.push({ name: 'userList' })"
      >
        <i class="FormComponent-backIcon material-icons">arrow_back</i>
        To user list
      </b-button>
      <h2 class="FormComponent-heading">{{ formTitle }}</h2>
    </div>
    <b-form-group
      id="fieldset-1"
      class="FormComponent-inputGroup"
      label="Enter first name"
      label-for="firstName"
      label-class="FormComponent-inputLabel"
    >
      <b-form-input
        id="firstName"
        v-model="user.firstName"
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
        v-model="user.lastName"
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
        v-model="user.username"
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
        v-model="user.email"
        class="FormComponent-input"
        autocomplete="off"
        type="email"
        trim
      ></b-form-input>
    </b-form-group>
    <b-form-group
      id="fieldset-4"
      class="FormComponent-inputGroup"
      label="Enter password"
      label-for="password-logIn"
      label-class="FormComponent-inputLabel"
    >
      <b-form-input
        id="password"
        v-model="user.password"
        class="FormComponent-input"
        autocomplete="off"
        type="password"
        trim
      ></b-form-input>
    </b-form-group>
    <p class="FormComponent-errorMessage" v-show="formErrors.length">
      {{ formErrors }}
    </p>
    <b-button class="FormComponent-button" @click="performAction(user)">
      {{ buttonText }}
    </b-button>
    <b-modal
      v-model="modal"
      cancel-disabled
      ok-disabled
      hide-header
      ref="FormComponent-modal"
      modal-class="FormComponent-modal"
      centered
    >
      <p class="FormComponent-modalTitle">
        <span class="FormComponent-userName">{{ modalCopy }}</span>
      </p>
      <template #modal-footer>
        <b-button
          class="FormComponent-modalButton m-decline"
          variant="outline-primary"
          @click="showModal(false)"
        >
          Ok
        </b-button>
      </template>
    </b-modal>
  </form>
</template>

<script lang="ts">
import { mapState, mapActions } from 'vuex';
import { User } from '@/models/User';
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
      user: {
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        password: '',
      },
      id: null,
      modal: false,
    };
  },
  computed: {
    ...mapState('users', ['formErrors']),
    modalCopy(): string {
      if (this.formErrors.length) {
        return this.formErrors[0];
      }
      return this.isDetailsPage
        ? `${this.userFullName} was successfully updated`
        : `${this.userFullName} was successfully added`;
    },
    isDetailsPage(): boolean {
      return this.$route.name === 'userDetails';
    },
    userFullName(): string {
      return `${this.user.firstName} ${this.user.lastName}`;
    },
  },
  async mounted() {
    if (this.isDetailsPage) {
      this.user = await this.getUser(this.$route.params.id);
    }
  },
  methods: {
    ...mapActions('users', ['addUser', 'updateUser', 'getUser']),
    showModal(value: boolean) {
      this.modal = value;
    },
    async performAction(user: User) {
      if (this.isDetailsPage) {
        await this.updateUser({ ...user, id: parseInt(this.$route.params.id, 10) });
        this.showModal(true);
      } else {
        await this.addUser(this.user);
        this.showModal(true);
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
  margin-bottom: 20px;
}
::v-deep .FormComponent-inputLabel {
  margin-bottom: 10px;
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
  margin-top: 30px;
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
  color: #fff;
  font-weight: 700;
  font-size: 14px;
}
.FormComponent-formHeader {
  position: relative;
  width: 100%;
  text-align: center;
}
.FormComponent-backIcon {
  vertical-align: middle;
  font-size: 20px;
  margin: 0 4px 2px 0;
}
.m-marginBottom {
  margin-bottom: 10px;
}
.m-closeButton {
  position: absolute;
  top: -8px;
  left: 24px;
  margin: 0;
  width: 140px;
  font-size: 18px;
  line-height: 30px;
}
::v-deep .FormComponent-modal {
  .modal-dialog {
    max-width: 650px;
  }
  .modal-content {
    text-align: center;
    font-family: 'Source Sans Pro', sans-serif;
    font-size: 22px;
    height: 200px;
    padding: 0 20px 0;
    line-height: 30px;
    background-color: #f2f8fd;
  }

  .modal-body {
    border-bottom: none;
    padding: 50px 0 0;
  }

  .modal-footer {
    padding: 10px 0 10px;
    display: flex;
    flex-flow: row;
    align-items: center;
    justify-content: center;
  }

  .FormComponent-modalButton {
    font-size: 18px;
    width: 50%;
    height: 40px;
    &.m-decline {
      &.btn-outline-primary {
        border: 1px solid #5284cf;
        color: #5284cf;
        &:hover {
          background-color: #5284cf;
          color: #fff;
        }
      }
    }
  }

  .FormComponent-userName {
    font-weight: 700;
    color: #000;
    display: inline;
    font-size: 22px;
  }
}
</style>
