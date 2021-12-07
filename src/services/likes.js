const likesService = {
  async addLikes(payload) {
    const response = await fetch(`https://api.vk.com/method/likes.add?v=5.124&access_token=${process.env.VUE_APP_VK_TOKEN}`
      + `&type=${payload.type}`
      + `&owner_id=${payload.ownerId}`
      + `&item_id=${payload.itemId}`);
    return (await response.json()).response;
  },

  async deleteLikes(payload) {
    const response = await fetch(`https://api.vk.com/method/likes.delete?v=5.124&access_token=${process.env.VUE_APP_VK_TOKEN}`
      + `&type=${payload.type}`
      + `&owner_id=${payload.ownerId}`
      + `&item_id=${payload.itemId}`);
    return (await response.json()).response;
  },
};

export default likesService;
