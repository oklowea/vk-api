import photosService from '@/services/photos';

export default {
  namespaced: true,

  state: {
    photos: [],
  },

  getters: {
    photos: (state) => state.photos,
  },

  actions: {
    async loadPhotos({ commit }) {
      const photos = await photosService.getPhotosUser();
      commit('setPhotos', photos);
    },
  },

  mutations: {
    setPhotos(state, payload) {
      state.photos = payload.items;
    },
  },
};
