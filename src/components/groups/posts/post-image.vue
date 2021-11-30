<template>
  <div v-if="typePhoto === 1" class="post-image">
    <img class="post-image__big-photo" :src="bigPhoto" alt="" />
    <div class="post-image__small">
      <div
        v-for="(smallPhoto, index) in smallPhotos" :key="index"
        class="post-image__small-photo">
        <img :src="smallPhoto" alt="" />
      </div>
    </div>
  </div>
  <div v-else-if="typePhoto === 2" class="post-image">
    <div class="post-image__arr">
      <div v-for="(photo, index) in photoInLine[0]" :key="index" class="post-image__item">
        <img :src="photo" alt="" />
      </div>
    </div>
    <div class="post-image__arr">
      <div v-for="(photo, index) in photoInLine[1]" :key="index" class="post-image__item">
        <img :src="photo" alt="" />
      </div>
    </div>
  </div>
  <div v-else class="post-image">
    <img class="post-image__big-photo" :src="bigPhoto" alt="" />
  </div>
</template>

<script>
export default {
  props: {
    attachments: {
      type: Array,
      required: true,
    },
  },

  computed: {
    bigPhoto() {
      const images = this.attachments.filter((o) => o.type === 'photo');
      if (images.length === 0) {
        return '';
      }

      const x = images[0].photo.sizes.find((o) => o.type === 'x');
      if (x) {
        return x.url;
      }

      return images[0].photo.sizes.find((o) => o.type === 'p').url;
    },

    smallPhotos() {
      const images = this.attachments.filter((o) => o.type === 'photo');
      if (images.length < 2) {
        return [];
      }

      return images
        .slice(1)
        .map((el) => el.photo.sizes.find((o) => o.type === 's').url);
    },

    photoInLine() {
      const images = this.attachments.filter((o) => o.type === 'photo');
      if (images.length === 0) {
        return [];
      }
      const arrOne = images.slice(0, 5).map((el) => el.photo.sizes.find((o) => o.type === 'm').url);
      const arrTwo = images.slice(5).map((el) => el.photo.sizes.find((o) => o.type === 'm').url);

      return [arrOne, arrTwo];
    },

    typePhoto() {
      const images = this.attachments.filter((o) => o.type === 'photo');
      if (images.length === 0) {
        return null;
      }

      if (images.length === 1) {
        return 3;
      }

      const z = images[0].photo.sizes.find((o) => o.type === 'z');
      if (z && z.width > z.height) {
        return 1;
      }

      return 2;
    },
  },
};
</script>

<style lang="scss" scoped>
.post-image {
  padding-bottom: 20px;
  border-bottom: 1px solid var(--gray-80);

  &__big-photo {
    max-width: 100%;
  }

  &__small {
    display: flex;
    justify-content: space-between;
    margin: -2px;

    &-photo {
      margin: 2px;
      max-height: 32px;
      overflow: hidden;

      img {
        max-width: 100%;
      }
    }
  }
  &__arr {
    display: flex;
    margin: -2px;
  }

  &__item {
    margin: 2px;
    width: 20%;
    text-align: center;

    img {
      max-width: 100%;
      max-height: 72px;
      overflow: hidden;
    }
  }
}
</style>
