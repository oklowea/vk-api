const groupsService = {
  async getGroups() {
    const response = await fetch(`https://api.vk.com/method/groups.get?v=5.124&access_token=${process.env.VUE_APP_VK_TOKEN}&extended=1`);
    return (await response.json()).response.items;
  },

  async getByIds(ids) {
    const response = await fetch(`https://api.vk.com/method/groups.getById?v=5.124&access_token=${process.env.VUE_APP_VK_TOKEN}`
      + `&group_ids=${ids}`
      + '&fields=members_count,activity,status');
    return (await response.json()).response;
  },

  async getById(id) {
    const response = await fetch(`https://api.vk.com/method/groups.getById?v=5.124&access_token=${process.env.VUE_APP_VK_TOKEN}`
      + `&group_id=${id}`
      + '&fields=members_count,activity,status,description,site');
    return (await response.json()).response[0];
  },

  async getAddress(id) {
    const response = await fetch(`https://api.vk.com/method/groups.getAddresses?v=5.124&access_token=${process.env.VUE_APP_VK_TOKEN}&group_id=${id}`);
    return (await response.json()).response.items[0];
  },

  async getCitiesById(cityId) {
    const response = await fetch(`https://api.vk.com/method/database.getCitiesById?v=5.124&access_token=${process.env.VUE_APP_VK_TOKEN}&city_ids=${cityId}`);
    return (await response.json()).response[0];
  },

  async getWall(id) {
    const response = await fetch(`https://api.vk.com/method/wall.get?v=5.157&access_token=${process.env.VUE_APP_VK_TOKEN}&owner_id=-${id}&count=10`);
    return (await response.json()).response.items;
  },

  async getCommentsWall(payload) {
    const response = await fetch(`https://api.vk.com/method/wall.getComments?v=5.124&access_token=${process.env.VUE_APP_VK_TOKEN}`
      + `&owner_id=${payload.ownerId}`
      + `&post_id=${payload.postId}`
      + '&extended=1'
      + '&need_likes=1'
      + `&offset=${payload.offset}`);
    return (await response.json()).response;
  },

  async getCommentsWallForThread(payload) {
    const response = await fetch(`https://api.vk.com/method/wall.getComments?v=5.124&access_token=${process.env.VUE_APP_VK_TOKEN}`
      + `&owner_id=${payload.ownerId}`
      + `&post_id=${payload.postId}`
      + `&comment_id=${payload.commentId}`
      + '&extended=1'
      + '&need_likes=1'
      + `&offset=${payload.offset}`);
    return (await response.json()).response;
  },
};

export default groupsService;
