const photosService = {
  async getPhotosUser() {
    const response = await fetch(`https://api.vk.com/method/photos.get?v=5.81&access_token=${process.env.VUE_APP_VK_TOKEN}&album_id=profile&extended=1`);
    return (await response.json()).response;
  },
};

export default photosService;
