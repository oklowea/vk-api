<template>
  <div class="post bg">
    <div class="post-group">
      <div class="post-group__photo">
        <img :src="group.info.photo_50" alt="" />
      </div>
      <div class="post-group__data">
        <div class="post-group__title">
          <a href="">{{ group.info.name }}</a>
        </div>
        <div class="post-group__time">{{ date }}</div>
      </div>
    </div>

    <div class="post-content">
      <div class="post-content__text">{{ post.text }}</div>
      <PostImage
        v-if="post.attachments"
        :attachments="post.attachments"/>
    </div>

    <Footer :post="post" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import PostImage from '@/components/groups/posts/post-image.vue';
import dateConversion from '@/helpers/date-conversion';
import Footer from '@/components/groups/posts/footer.vue';

export default {
  components: {
    PostImage,
    Footer,
  },

  props: {
    post: {
      type: Object,
      required: true,
    },
  },

  computed: {
    ...mapGetters([
      'group',
    ]),

    date() {
      return dateConversion(this.post.date);
    },
  },
};
</script>

<style lang="scss" scoped>
.post {
  padding: 15px 20px 0 20px;
  margin-bottom: 15px;
  border-radius: 5px;
  border: 1px solid var(--gray-80);
  box-shadow: inset 0px -1px 0px var(--gray-120);
}
.post-group {
  display: flex;
  justify-content: flex-start;

  &__title {
    margin: 8px 0 3px 0;

    a {
      color: var(--link);
      font-weight: bold;
      text-decoration: none;
    }
  }

  &__time {
    color: var(--gray-400);
  }

  &__photo {
    margin-right: 15px;

    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
  }
}
.post-content {
  &__text {
    padding: 8px 0;
  }
}
</style>
