import api from '@/services/API';
import router from '@/router/index';
import { User } from '@/models/User';
import { createModule, action, mutation } from 'vuex-class-component';

const VuexModule = createModule({ namespaced: 'users', strict: false });

function loadUsers(): User[] {
  return [];
}

const baseUsersUrl = 'users/';
const baseAuthUrl = 'auth/token/login/';

export default class Users extends VuexModule {
  users = loadUsers();

  errorLogIn = '';

  errorSignUp = '';

  get items() {
    return this.users;
  }

  @mutation
  setItems(value: User[]) {
    this.users = value;
  }

  @action
  async getUser(id: number) {
    const response = await api.get(`${baseUsersUrl}${id}/`);
    return response.data;
  }

  @action
  async getUsers() {
    const response = await api.get(baseUsersUrl);
    this.setItems(response.data.results);
  }

  @action
  async addUser(user: User) {
    if (this.users.some((item) => item.email === user.email)) {
      throw new Error('User already exists');
    } else {
      const response = await api.post(baseUsersUrl, user);
      this.setItems([...this.users, response.data]);
    }
  }

  @action
  async updateUser(user: User) {
    const index = this.items.findIndex((item) => item.id === user.id);
    if (index === -1) {
      throw new Error('User not found');
    }
    const items = this.items.slice();

    const response = await api.patch(`${baseUsersUrl}${user.id}/`, user);
    items[index] = response.data;
    this.setItems(items);
  }

  @action
  async deleteUser(user: User) {
    const itemIndex = this.items.findIndex((item) => user.id === item.id);
    if (itemIndex === -1) {
      throw new Error('User not found');
    }
    const config = {
      data: {
        id: user.id,
      },
    };
    await api
      .delete(`${baseUsersUrl}${user.id}/`, config)
      .then((response) => {
        if ([200, 204].includes(response.status)) {
          this.setItems(this.items.filter((_, index) => itemIndex !== index));
        }
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  @action
  async logIn(user: User) {
    try {
      const response = await api.post(baseAuthUrl, user);
      window.localStorage.setItem('authToken', response.data.authToken);
      this.errorLogIn = '';
      router.push({ name: 'userList' });
    } catch (err) {
      const error = err.response.data.nonFieldErrors[0];
      this.errorLogIn = error;
    }
  }
}
