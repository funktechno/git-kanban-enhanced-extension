import Vue from 'vue';
import root from './root.vue';
import store from '../store';

global.browser = require('webextension-polyfill');
Vue.prototype.$browser = global.browser;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,

  render: h => h(App),
});
