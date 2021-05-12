import axios from 'axios';
import { User } from '@/models/User';
import { createModule, action, mutation } from 'vuex-class-component';

const VuexModule = createModule({ namespaced: 'users', strict: false });

function loadUsers(): User[] {
  return [];
}

const baseUrl = 'http://127.0.0.1:8000/users/';

export default class Users extends VuexModule {
  users = loadUsers();

  get items() {
    return this.users;
  }

  @mutation
  setItems(value: User[]) {
    this.users = value;
  }

  @action
  async getUser(id: number) {
    const response = await axios.get(`${baseUrl}${id}/`);
    return response.data;
  }

  @action
  async getUsers() {
    const response = await axios.get(baseUrl);
    this.setItems(response.data.results);
  }

  @action
  async addUser(user: User) {
    if (this.users.some((item) => item.email === user.email)) {
      throw new Error('User already exists');
    } else {
      const response = await axios.post(baseUrl, user);
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

    const response = await axios.patch(`${baseUrl}${user.id}/`, user);
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
    await axios
      .delete(`${baseUrl}${user.id}/`, config)
      .then((response) => {
        if ([200, 204].includes(response.status)) {
          this.setItems(this.items.filter((_, index) => itemIndex !== index));
        }
      })
      .catch((error) => {
        throw new Error(error);
      });
  }
}
