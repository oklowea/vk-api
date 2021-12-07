import groupsService from '@/services/groups';

export default {
  namespaced: true,

  state: {
    groups: [],
    group: null,
  },

  getters: {
    groups: (state) => state.groups,
    group: (state) => state.group,
  },

  actions: {
    async getGroups({ commit }) {
      const groups = await groupsService.getGroups();
      const groupIds = groups.map((o) => o.id).join(',');

      const groupsExtended = await groupsService.getByIds(groupIds);
      commit('setGroups', groupsExtended);
    },

    async getGroup({ commit }, id) {
      const info = await groupsService.getById(id);

      const address = await groupsService.getAddress(id);
      if (address) {
        address.city = await groupsService.getCitiesById(address.city_id);
      }

      commit('setGroup', {
        info,
        address,
      });
    },

    async getPosts(o, id) {
      return groupsService.getWall(id);
    },

    async getComments(o, payload) {
      return groupsService.getCommentsWall(payload);
    },

    async getCommentsForThread(o, payload) {
      return groupsService.getCommentsWallForThread(payload);
    },
  },

  mutations: {
    setGroups(state, payload) {
      state.groups = payload;
    },

    setGroup(state, payload) {
      state.group = payload;
    },
  },
};
