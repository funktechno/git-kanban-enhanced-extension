import Vue from 'vue';
import VueResource from 'vue-resource';
import root from './root.vue';
Vue.config.productionTip = false;
Vue.use(VueResource);
/* eslint-disable no-new */
new Vue({
  el: '#root',
  render: h => h(root),
});
