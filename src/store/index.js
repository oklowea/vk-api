import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: process.env.VUE_APP_VK_TOKEN,
    user: null,
    groups: [],
    group: null,
  },

  getters: {
    user: (state) => state.user,
    userName: (state) => `${state.user.first_name} ${state.user.last_name}`,
    groups: (state) => state.groups,
    group: (state) => state.group,
  },

  actions: {
    async init({ state, commit }) {
      const accountResponse = await fetch(`https://api.vk.com/method/account.getProfileInfo?v=5.81&access_token=${state.token}`);
      const accountUserResponse = await fetch(`https://api.vk.com/method/users.get?v=5.81&access_token=${state.token}&fields=photo_200,photo_50`);

      // функция коммит вызывает мутацию
      commit('setUser', {
        ...(await accountResponse.json()).response,
        ...(await accountUserResponse.json()).response[0],
      });
    },

    async getGroups({ state, commit }) {
      const groupsResponse = await fetch(`https://api.vk.com/method/groups.get?v=5.124&access_token=${state.token}&extended=1`);

      const groups = (await groupsResponse.json()).response.items;
      const groupsId = groups.map((o) => o.id).join(',');

      const groupsMembersResponse = await fetch(`https://api.vk.com/method/groups.getById?v=5.124&access_token=${state.token}&group_ids=${groupsId}&fields=members_count,activity,status`);
      const groupsMembers = (await groupsMembersResponse.json()).response;

      commit('setGroups', groupsMembers);
    },

    async getGroup({ state, commit }, id) {
      const groupResponse = await fetch(`https://api.vk.com/method/groups.getById?v=5.124&access_token=${state.token}&group_id=${id}&fields=status,description,site`);
      const info = (await groupResponse.json()).response[0];

      const groupAddressResponse = await fetch(`https://api.vk.com/method/groups.getAddresses?v=5.124&access_token=${state.token}&group_id=${id}`);
      const address = (await groupAddressResponse.json()).response.items[0];
      if (address) {
        const citiesResponse = await fetch(`https://api.vk.com/method/database.getCitiesById?v=5.124&access_token=${state.token}&city_ids=${address.city_id}`);
        // eslint-disable-next-line prefer-destructuring
        address.city = (await citiesResponse.json()).response[0];
      }

      commit('setGroup', {
        info,
        address,
      });
    },

    async getPosts({ state }, id) {
      const groupWallResponse = await fetch(`https://api.vk.com/method/wall.get?v=5.157&access_token=${state.token}&owner_id=-${id}&count=10`);
      const posts = (await groupWallResponse.json()).response.items;

      return posts;
    },

    async getComments({ state }, payload) {
      const commentsPostResponse = await fetch(`https://api.vk.com/method/wall.getComments?v=5.124&access_token=${state.token}&owner_id=${payload.groupId}&post_id=${payload.postId}&extended=1&need_likes=1&offset=${payload.offset}`);
      return (await commentsPostResponse.json()).response;
    },

    async getCommentsForThread({ state }, payload) {
      const commentsPostResponse = await fetch(`https://api.vk.com/method/wall.getComments?v=5.124&access_token=${state.token}&owner_id=${payload.groupId}&comment_id=${payload.commentId}&post_id=${payload.postId}&extended=1&&need_likes=1`);
      return (await commentsPostResponse.json()).response;
    },
  },

  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },

    setGroups(state, payload) {
      state.groups = payload;
    },

    setGroup(state, payload) {
      state.group = payload;
    },
  },
});
