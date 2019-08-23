import Vue from 'vue';
import Router from 'vue-router';

import Dashboard from './views/Dashboard.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'root',
      component: Dashboard
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '*',
      name: 'not-found',
      component: () => import('./views/NotFound.vue')
    }
  ]
});
