import Vue from 'vue';
import Vuex from 'vuex';
import account from './account';
import gifts from './gifts';
import groups from './groups';
import likes from './likes';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    account,
    gifts,
    groups,
    likes,
  },
});
