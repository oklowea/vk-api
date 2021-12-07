import friendsService from '@/services/friends';

export default {
  namespaced: true,

  state: {
    friends: [],
    friendsCount: 0,
  },

  getters: {
    friends: (state) => state.friends,
    friendsCount: (state) => state.friendsCount,
  },

  actions: {
    async loadFriends({ state, commit }) {
      if (state.friendsCount > 0) {
        return;
      }
      const friends = await friendsService.getFriends();
      commit('setFriends', friends);
    },
  },

  mutations: {
    setFriends(state, payload) {
      state.friends = payload.items;
      state.friendsCount = payload.count;
    },
  },
};
