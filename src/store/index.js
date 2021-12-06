import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const birthdayVisibilityType = {
  NONE: 0,
  FULL: 1,
  PARTIAL: 2,
};

export const sexType = {
  NONE: 0,
  WOMAN: 1,
  MAN: 2,
};

export default new Vuex.Store({
  state: {
    token: process.env.VUE_APP_VK_TOKEN,
    account: null,
    groups: [],
    group: null,
    users: [],
    giftsCount: 0,
    gifts: [],
  },

  getters: {
    account: (state) => {
      if (!state.account) {
        return null;
      }

      return {
        ...state.account,
        user: state.users.find((o) => o.id === state.account.id),
      };
    },
    userName: (state) => `${state.account.first_name} ${state.account.last_name}`,
    groups: (state) => state.groups,
    group: (state) => state.group,
    users: (state) => state.users,
    partnerName: (state) => {
      if (!state.account.relation_partner) {
        return null;
      }

      const partner = state.users.find((o) => o.id === state.account.relation_partner.id);
      if (!partner) {
        return null;
      }

      return state.account.sex === sexType.MAN
        ? `${partner.first_name_abl} ${partner.last_name_abl}`
        : `${partner.first_name_ins} ${partner.last_name_ins}`;
    },
    giftsCount: (state) => state.giftsCount,
    gifts: (state) => state.gifts,
  },

  actions: {
    async init({ state, commit }) {
      const accountResponse = await fetch(`https://api.vk.com/method/account.getProfileInfo?v=5.81&access_token=${state.token}`);
      const account = (await accountResponse.json()).response;
      commit('setAccount', account);

      {
        const usersResponse = await fetch(`https://api.vk.com/method/users.get?v=5.81&access_token=${state.token}&fields=photo_200,photo_50,education,counters`);
        const user = (await usersResponse.json()).response[0];
        commit('setUser', user);
      }

      if (account.relation_partner) {
        const usersResponse = await fetch(`https://api.vk.com/method/users.get?v=5.81&access_token=${state.token}`
        + `&user_ids=${account.relation_partner.id}`
        + '&fields=first_name_ins,last_name_ins,first_name_abl,last_name_abl');
        const user = (await usersResponse.json()).response[0];
        commit('setUser', user);
      }
    },

    async getGroups({ state, commit }) {
      const groupsResponse = await fetch(`https://api.vk.com/method/groups.get?v=5.124&access_token=${state.token}&extended=1`);

      const groups = (await groupsResponse.json()).response.items;
      const groupsId = groups.map((o) => o.id).join(',');

      const groupsMembersResponse = await fetch(`https://api.vk.com/method/groups.getById?v=5.124&access_token=${state.token}`
      + `&group_ids=${groupsId}`
      + '&fields=members_count,activity,status');
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
      const commentsPostResponse = await fetch(`https://api.vk.com/method/wall.getComments?v=5.124&access_token=${state.token}`
      + `&owner_id=${payload.groupId}`
      + `&post_id=${payload.postId}`
      + '&extended=1'
      + '&need_likes=1'
      + `&offset=${payload.offset}`);
      return (await commentsPostResponse.json()).response;
    },

    async getCommentsForThread({ state }, payload) {
      const commentsPostResponse = await fetch(`https://api.vk.com/method/wall.getComments?v=5.124&access_token=${state.token}`
      + `&owner_id=${payload.groupId}`
      + `&comment_id=${payload.commentId}`
      + `&post_id=${payload.postId}`
      + '&extended=1&&need_likes=1');
      return (await commentsPostResponse.json()).response;
    },

    async like({ state }, payload) {
      const response = await fetch(`https://api.vk.com/method/likes.add?v=5.124&access_token=${state.token}`
      + `&type=${payload.type}`
      + `&owner_id=${payload.ownerId}`
      + `&item_id=${payload.itemId}`);
      return (await response.json()).response;
    },

    async dislike({ state }, payload) {
      const response = await fetch(`https://api.vk.com/method/likes.delete?v=5.124&access_token=${state.token}`
        + `&type=${payload.type}`
        + `&owner_id=${payload.ownerId}`
        + `&item_id=${payload.itemId}`);
      return (await response.json()).response;
    },

    async loadGifts({ state, commit }) {
      if (state.giftsCount > 0) {
        return;
      }
      const giftsResponse = await fetch(`https://api.vk.com/method/gifts.get?v=5.124&access_token=${state.token}`);
      const gifts = (await giftsResponse.json()).response;
      commit('setGifts', gifts);
    },
  },

  mutations: {
    setAccount(state, payload) {
      state.account = payload;
    },

    setUser(state, payload) {
      if (!state.users.find((o) => o.id === payload.id)) {
        state.users.push(payload);
      }
    },

    setUsers(state, payload) {
      for (let i = 0; i < payload.length; i += 1) {
        if (!state.users.find((o) => o.id === payload[i].id)) {
          state.users.push(payload[i]);
        }
      }
    },

    setGroups(state, payload) {
      state.groups = payload;
    },

    setGroup(state, payload) {
      state.group = payload;
    },

    setGifts(state, payload) {
      state.gifts = payload.items;
      state.giftsCount = payload.count;
    },
  },
});
