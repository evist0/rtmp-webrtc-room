import React from "react";
import { QueryParams, Route } from "mobx-router";
import { RootStore } from "../../mobx/store";
import routes from "../../config/routes";
import SignInPage from "./sign-in";
import SignUpPage from "./sign-up";

const authGuard = async (
  route: Route<RootStore>,
  params: QueryParams,
  store: RootStore
): Promise<boolean> => {
  if (store.auth.isLoggedIn) {
    return store.router.goTo(routes.studio).then(() => false);
  }

  return true;
};

const authRoutes = {
  signIn: new Route<RootStore>({
    path: "/auth/sign-in",
    component: <SignInPage />,
    beforeEnter: authGuard,
  }),
  signUp: new Route<RootStore>({
    path: "/auth/sign-up",
    component: <SignUpPage />,
    beforeEnter: authGuard,
  }),
};

export default authRoutes;
