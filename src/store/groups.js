import groupsService from '@/services/groups';

export default {
  namespaced: true,

  state: {
    groups: [],
    groupsCount: 0,
    group: null,
  },

  getters: {
    groups: (state) => state.groups,
    groupsCount: (state) => state.groupsCount,
    group: (state) => state.group,
  },

  actions: {
    async getGroups({ state, commit }) {
      const groups = await groupsService.getGroups();
      const groupIds = groups.items.map((o) => o.id).join(',');

      if (state.groupsCount > 0) {
        return;
      }

      commit('setCount', groups);

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

    async getPosts(o, payload) {
      return groupsService.getWall(payload);
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

    setCount(state, payload) {
      state.groupsCount = payload.count;
    },

    setGroup(state, payload) {
      state.group = payload;
    },
  },
};
