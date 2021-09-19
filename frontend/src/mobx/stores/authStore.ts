import { Route, RouterStore } from "mobx-router";
import { RootStore } from "../store";
import routes from "../../config/routes";
import { makeAutoObservable } from "mobx";
import { LoginDto } from "../../models/auth/login.dto";
import { RegisterDto } from "../../models/auth/register.dto";
import { UserModel } from "../../models/UserModel";

export class AuthStore {
  user: UserModel | undefined;
  accessToken: string | undefined;

  constructor(private readonly router: RouterStore<RootStore>) {
    makeAutoObservable(this);

    const localAccessToken = localStorage.getItem("accessToken");

    if (localAccessToken !== null) {
      this.accessToken = JSON.parse(localAccessToken);
    }
  }

  get isLoggedIn() {
    return this.accessToken !== undefined;
  }

  async signIn(loginDto: LoginDto, nextRoute?: Route<RootStore>) {
    const response = await fetch("/api/auth/sign-in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginDto),
    });

    const responseBody = await response.json();

    localStorage.setItem(
      "accessToken",
      JSON.stringify(responseBody.accessToken)
    );

    await this.me();

    this.router.goTo(nextRoute || routes.studio).then();
  }

  async signUp(registerDto: RegisterDto, nextRoute?: Route<RootStore>) {
    const response = await fetch("/api/auth/sign-up", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerDto),
    });

    const responseBody = await response.json();
    localStorage.setItem(
      "accessToken",
      JSON.stringify(responseBody.accessToken)
    );

    this.router.goTo(nextRoute || routes.studio).then();
  }

  async me() {
    if (!this.accessToken) {
      return undefined;
    }

    const response = await fetch("/api/auth/me", {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
        "Content-Type": "application/json",
      },
    });

    this.user = await response.json();

    return this.user;
  }
}
