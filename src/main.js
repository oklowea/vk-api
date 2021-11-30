import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

require('@/assets/styles.scss');

(async () => {
  Vue.config.productionTip = false;

  await store.dispatch('init');

  new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount('#app');
})();
