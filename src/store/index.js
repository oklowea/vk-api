import Vue from 'vue';
import Vuex from 'vuex';
import account from './account';
import gifts from './gifts';
import groups from './groups';
import likes from './likes';
import friends from './friends';
import photos from './photos';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    account,
    gifts,
    groups,
    likes,
    friends,
    photos,
  },
});
