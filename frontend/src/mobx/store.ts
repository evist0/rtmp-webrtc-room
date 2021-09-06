import { RouterStore } from "./stores/routerStore";
import { AuthStore } from "./stores/authStore";
import { StudioStore } from "./stores/studioStore";
import routes from "../config/routes";
import { startRouter } from "mobx-router";

export class RootStore {
  public router: RouterStore<RootStore>;
  public auth: AuthStore;
  public studio: StudioStore;

  constructor() {
    const router = new RouterStore<RootStore>(this);

    this.router = router;

    console.log(router);
    this.auth = new AuthStore(this.router);
    this.studio = new StudioStore();
  }
}

const store = new RootStore();

startRouter(routes, store, {
  html5history: true, // or false if you want to use hash based routing
});

export default store;
