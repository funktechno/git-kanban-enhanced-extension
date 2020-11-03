import Vue from "vue";
import App from "./App.vue";
// import store from '@/store';

import { browser } from "webextension-polyfill-ts";
// global.browser = browser;
Vue.prototype.$browser = browser;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  // store,

  render: h => h(App)
});
