import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/groups',
    name: 'groups',
    component: () => import(/* webpackChunkName: "groups" */ '../views/groups/groups.vue'),
  },
  {
    path: '/groups/:id',
    name: 'group',
    component: () => import(/* webpackChunkName: "groups" */ '../views/groups/group.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
