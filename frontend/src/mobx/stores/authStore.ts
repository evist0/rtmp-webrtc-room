import { UserModel } from "../../models/UserModel";
import { Route, RouterStore } from "mobx-router";
import { RootStore } from "../store";
import routes from "../../config/routes";
import { makeAutoObservable } from "mobx";

export class AuthStore {
  user: UserModel | undefined;

  constructor(private readonly router: RouterStore<RootStore>) {
    makeAutoObservable(this);

    const localStorageUser = localStorage.getItem("user");

    if (localStorageUser !== null) {
      this.user = JSON.parse(localStorageUser);
    }
  }

  get isLoggedIn() {
    return this.user !== undefined;
  }

  signIn(user: UserModel, nextRoute?: Route<RootStore>) {
    this.user = user;
    localStorage.setItem("user", JSON.stringify(this.user));

    this.router.goTo(nextRoute || routes.studio).then();
  }
}
