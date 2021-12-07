const giftsService = {
  async getGifts() {
    const response = await fetch(`https://api.vk.com/method/gifts.get?v=5.124&access_token=${process.env.VUE_APP_VK_TOKEN}`);
    return (await response.json()).response;
  },
};

export default giftsService;
