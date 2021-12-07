import likesService from '@/services/likes';

export default {
  namespaced: true,

  actions: {
    async like(o, payload) {
      return likesService.addLikes(payload);
    },

    async dislike(o, payload) {
      return likesService.deleteLikes(payload);
    },
  },
};
