const accountService = {
  async getProfileInfo() {
    const response = await fetch(`https://api.vk.com/method/account.getProfileInfo?v=5.81&access_token=${process.env.VUE_APP_VK_TOKEN}`);
    return (await response.json()).response;
  },

  async getUsers(id) {
    const userId = id ? `&user_ids=${id}` : '';
    const response = await fetch(`https://api.vk.com/method/users.get?v=5.81&access_token=${process.env.VUE_APP_VK_TOKEN}`
    + `${userId}`
    + '&fields=photo_50,photo_max_orig,education,counters,first_name_ins,last_name_ins,first_name_abl,last_name_abl');
    return (await response.json()).response[0];
  },
};

export default accountService;
