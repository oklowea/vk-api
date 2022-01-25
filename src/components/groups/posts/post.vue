<template>
  <div class="post bg">
    <div class="post-group">
      <div class="post-group__photo">
        <img :src="profilePhoto" alt="" />
      </div>
      <div class="post-group__data">
        <div class="post-group__title">
          <a href="">{{ profileName }}</a>
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

    profiles: {
      type: Array,
      required: true,
    },
  },

  computed: {
    ...mapGetters('groups', [
      'group',
    ]),

    date() {
      return dateConversion(this.post.date);
    },

    ownerPost() {
      return this.profiles.find((o) => o.id === this.post.from_id);
    },

    profilePhoto() {
      if (this.post.from_id === -this.group.info.id) {
        return this.group.info.photo_50;
      }
      return this.ownerPost.photo_50;
    },

    profileName() {
      if (this.post.from_id === -this.group.info.id) {
        return this.group.info.name;
      }
      return `${this.ownerPost.first_name} ${this.ownerPost.last_name}`;
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
