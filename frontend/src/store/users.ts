import { User } from '@/models/User';
import { createModule, action, mutation } from 'vuex-class-component';

const VuexModule = createModule({ namespaced: 'users', strict: false });

function loadUsers(): User[] {
  return [];
}

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
  async addUser(user: User) {
    if (this.users.some((item) => item.email === user.email)) {
      throw new Error('User already exists');
    } else {
      this.setItems([...this.users, user]);
    }
  }

  @action
  async updateUser(user: User) {
    const index = this.items.findIndex((item) => item.id === user.id);
    if (index === -1) {
      throw new Error('User not found');
    }
    const items = this.items.slice();
    items[index] = user;
    this.setItems(items);
  }

  @action
  async deleteUser(user: User) {
    const itemIndex = this.items.findIndex((item) => user.id === item.id);
    if (itemIndex === -1) {
      throw new Error('User not found');
    }
    this.setItems(this.items.filter((_, index) => itemIndex !== index));
  }
}
