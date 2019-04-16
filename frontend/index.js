
// import some polyfill to ensure everything works OK
import "babel-polyfill";

// import bootstrap's javascript part
import 'bootstrap';

import Vue from 'vue';
import App from './App';
import CreateGamePage from './CreateGamePage';
import VueRouter from 'vue-router';
import Game from './Game';

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    { path: '/', component: CreateGamePage },
    { path: '/game/:id', component: Game },
  ]
});

new Vue({
  router: router,
  el: '#app',
  render: h => h(App),
});
