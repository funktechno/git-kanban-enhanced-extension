// import VueRouter from 'vue-router'
import Board from './pages/board/root';
import Burndown from './pages/burndown/root';
import Settings from './pages/settings/root';
import report from './pages/report/root';
import velocity from './pages/velocity/root';

import { optionsKey } from '../constants';
const Home = { template: '<div>home</div>' };

// const router = new VueRouter({
// mode: 'history',
// base: __dirname,
// linkActiveClass: "active",
const routes = [
  { path: '#/', component: Home },
  { path: '#/' + optionsKey + '-board', component: Board },
  { path: '#/' + optionsKey + '-burndown', component: Burndown },
  { path: '#/' + optionsKey + '-settings', component: Settings },
  { path: '#/' + optionsKey + '-report', component: report },
  { path: '#/' + optionsKey + '-velocity', component: velocity },
];
// })

export default routes;
