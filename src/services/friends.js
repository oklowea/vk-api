const friendsService = {
  async getFriends() {
    const response = await fetch(`https://api.vk.com/method/friends.get?v=5.124&access_token=${process.env.VUE_APP_VK_TOKEN}&fields=online,photo_100`);
    return (await response.json()).response;
  },
};

export default friendsService;
