import api from '@/services/API';
import router from '@/router/index';
import { User } from '@/models/User';
import { createModule, action, mutation } from 'vuex-class-component';

const VuexModule = createModule({ namespaced: 'users', strict: false });

function loadUsers(): User[] {
  return [];
}

const baseUsersUrl = 'users/';
const baseAuthUrlLogIn = 'auth/token/login/';
const baseAuthUrlLogOut = 'auth/token/logout/';
const baseAuthUrlSignUp = 'auth/users/';

export default class Users extends VuexModule {
  users = loadUsers();

  errorLogIn = [] as string[];

  errorSignUp = [] as string[];

  formErrors = [] as string[];

  authenticatedUserId = null as null | number;

  get items(): User[] {
    return this.users;
  }

  get currentUser(): User | undefined {
    return this.users.find((user) => user.id === this.authenticatedUserId);
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
      this.formErrors.push('User already exists');
    } else {
      try {
        const response = await api.post(baseUsersUrl, user);
        this.setItems([...this.users, response.data]);
        this.formErrors = [];
      } catch (err) {
        const error = err.response.data;
        const errorsArray: string[] = Object.entries(error).map(
          ([key, value]) => `${key}: ${value}`,
        );
        this.formErrors = errorsArray;
      }
    }
  }

  @action
  async updateUser(user: User) {
    const index = this.items.findIndex((item) => item.id === user.id);
    if (index === -1) {
      throw new Error('User not found');
    }
    const items = this.items.slice();
    try {
      const response = await api.patch(`${baseUsersUrl}${user.id}/`, user);
      items[index] = response.data;
      this.setItems(items);
      this.formErrors = [];
    } catch (err) {
      const error = err.response.data.nonFieldErrors[0];
      this.formErrors = error;
    }
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
      const response = await api.post(baseAuthUrlLogIn, user);
      window.localStorage.setItem('authToken', response.data.authToken);
      this.errorLogIn = [];
      await this.getAuthenticatedUserId();
      router.push({ name: 'userList' });
    } catch (err) {
      const error = err.response.data.nonFieldErrors[0];
      this.errorLogIn = error;
    }
  }

  @action
  async signUp(user: User) {
    try {
      await api.post(baseAuthUrlSignUp, user);
      await this.logIn(user);
    } catch (err) {
      const error = err.response.data.nonFieldErrors[0];
      this.errorSignUp = error;
    }
  }

  @action
  async getAuthenticatedUserId() {
    const response = await api.get(`${baseUsersUrl}get_authenticated_user/`);
    this.authenticatedUserId = response.data.id;
  }

  @action
  async logOut() {
    await api.post(baseAuthUrlLogOut);
    window.localStorage.removeItem('authToken');
    this.authenticatedUserId = null;
    router.push({ name: 'logIn' });
  }
}
