import giftsService from '@/services/gifts';

export default {
  namespaced: true,

  state: {
    giftsCount: 0,
    gifts: [],
  },

  getters: {
    giftsCount: (state) => state.giftsCount,
    gifts: (state) => state.gifts,
  },

  actions: {
    async loadGifts({ state, commit }) {
      if (state.giftsCount > 0) {
        return;
      }
      const gifts = await giftsService.getGifts();
      commit('setGifts', gifts);
    },
  },

  mutations: {
    setGifts(state, payload) {
      state.gifts = payload.items;
      state.giftsCount = payload.count;
    },
  },
};
