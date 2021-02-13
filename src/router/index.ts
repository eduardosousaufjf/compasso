import { route } from 'quasar/wrappers';
import VueRouter from 'vue-router';
import { Store } from 'vuex';
import { Route, RawLocation } from 'vue-router';
import routes from './routes';

// eslint-disable-next-line @typescript-eslint/unbound-method
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = async function(location: RawLocation) {
  let route: Route;
  try {
    route = await originalPush.call<VueRouter, [RawLocation], Promise<Route>>(this, location);
  } catch (err) {
    if (err.name !== 'NavigationDuplicated') throw err;
  }

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return route!;
};

export default route<Store<Record<string,unknown>>>(function ({ Vue }) {
  Vue.use(VueRouter);

  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as is and change from quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  });

  return Router;
})
