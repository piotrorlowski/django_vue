<template>
  <div class="UserListElement">
    <p class="UserListElement-userName" @click="goTo">{{ userFullName }} | {{ user.email }}</p>
    <button class="UserListElement-deleteUserButton" @click="showModal(true)">
      <i class="UserListElement-deleteIcon material-icons">clear</i>
    </button>
    <b-modal
      v-model="modal"
      cancel-disabled
      ok-disabled
      hide-header
      ref="UserListElement-modal"
      modal-class="UserListElement-modal"
      centered
    >
      <p class="UserListElement-modalTitle">
        Do you really want to remove
        <span class="UserListElement-userName">{{ userFullName }}</span>
        <span>?</span>
      </p>
      <template #modal-footer>
        <b-button class="UserListElement-modalButton" variant="danger" @click="performAction(user)">
          Yes, remove this user!
        </b-button>
        <b-button
          class="UserListElement-modalButton m-decline"
          variant="outline-primary"
          @click="showModal(false)"
        >
          No, I changed my mind
        </b-button>
      </template>
    </b-modal>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { User } from '@/models/User';
import { mapActions } from 'vuex';

export default Vue.extend({
  name: 'UserListElement',
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      modal: false,
    };
  },
  computed: {
    userFullName(): string {
      return `${this.user.firstName} ${this.user.lastName}`;
    },
  },
  methods: {
    ...mapActions('users', ['deleteUser']),
    async performAction(user: User) {
      await this.deleteUser(user);
      // TODO: add delete confirmatiom modal
    },
    showModal(value: boolean) {
      this.modal = value;
    },
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
::v-deep .UserListElement-modal {
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
    justify-content: flex-end;
  }

  .UserListElement-modalButton {
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

  .UserListElement-userName {
    font-weight: 700;
    color: #000;
    display: inline;
    font-size: 22px;
  }
}
</style>
