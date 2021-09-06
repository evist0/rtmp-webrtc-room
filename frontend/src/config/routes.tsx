import React from "react";
import { Route } from "mobx-router";
import { RootStore } from "../mobx/store";
import AuthPage from "../pages/auth";
import CreateEventPage from "../pages/createEvent";
import StudioPage from "../pages/studio";

const routes = {
  index: new Route<RootStore>({
    path: "/",
    component: <></>,
    beforeEnter: (route, params, store): Promise<boolean> => {
      return store.router.goTo(routes.studio).then(() => false);
    },
  }),
  auth: new Route<RootStore>({
    path: "/auth",
    component: <AuthPage />,
    beforeEnter: (route, params, store): void | Promise<boolean> | boolean => {
      const isLoggedIn = store.auth.isLoggedIn;

      if (isLoggedIn) {
        return store.router.goTo(routes.studio).then(() => false);
      }
    },
  }),
  createEvent: new Route<RootStore>({
    path: "/createEvent",
    component: <CreateEventPage />,
    beforeEnter: async (route, params, store): Promise<boolean> => {
      const isLoggedIn = store.auth.isLoggedIn;

      if (!isLoggedIn) {
        return store.router.goTo(routes.auth).then(() => false);
      }

      return true;
    },
  }),
  studio: new Route<RootStore>({
    path: "/studio",
    component: <StudioPage />,
    beforeEnter: async (route, params, store): Promise<boolean> => {
      const isLoggedIn = store.auth.isLoggedIn;

      if (!isLoggedIn) {
        return store.router.goTo(routes.auth).then(() => false);
      }

      const eventInProgress = store.studio.roomId;

      if (!eventInProgress) {
        return store.router.goTo(routes.createEvent).then(() => false);
      }

      return true;
    },
  }),
};

export default routes;
