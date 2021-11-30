<template>
  <div class="footer">
    <div class="footer-count">
      <div class="footer-count__left">
        <div class="footer-count__item">
          <div class="footer-count__icon"><LikesIcon /></div>
          <div class="footer-count__value">{{ (post.likes.count).toLocaleString() }}</div>
        </div>
        <div @click="openComments" class="footer-count__item">
          <div class="footer-count__icon"><CommentsIcon /></div>
          <div class="footer-count__value">{{ (post.comments.count).toLocaleString() }}</div>
        </div>
        <div class="footer-count__item">
          <div class="footer-count__icon"><SharedIcon /></div>
          <div class="footer-count__value">{{ (post.reposts.count).toLocaleString() }}</div>
        </div>
      </div>
      <div class="footer-count__right">
        <div class="footer-count__item">
          <div class="footer-count__icon"><ViewsIcon /></div>
          <div class="footer-count__value footer-count__value--other">{{ views }}</div>
        </div>
      </div>
    </div>
    <div v-if="showComments" class="footer-comments">
      <div class="footer-comments__meaning">
        <CommentItem
          v-for="postComment in postComments" :key="postComment.id"
          :post-comment="postComment"
          :post-profiles="postProfiles"
          :post="post"
        />
      </div>
      <div
        @click.prevent="getCommentsMore"
        v-if="post.comments.count > 10 && offset < currentLevelCount - 10"
        class="footer-comments__show-more">
        <a href="">Показать следующие комментарии</a>
      </div>
    </div>
  </div>
</template>

<script>
import numberRounding from '@/helpers/number-rounding';
import LikesIcon from '@/components/icons/likes.vue';
import CommentsIcon from '@/components/icons/comments.vue';
import SharedIcon from '@/components/icons/shared.vue';
import ViewsIcon from '@/components/icons/views.vue';
import CommentItem from '@/components/groups/posts/comment.vue';

export default {
  data() {
    return {
      showComments: false,
      postComments: [],
      postProfiles: [],
      isLoaded: false,
      offset: 0,
      currentLevelCount: 0,
    };
  },

  components: {
    LikesIcon,
    CommentsIcon,
    SharedIcon,
    ViewsIcon,
    CommentItem,
  },
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  computed: {
    views() {
      return numberRounding(this.post.views.count);
    },
  },

  methods: {
    async openComments() {
      this.showComments = !this.showComments;
      if (this.isLoaded) {
        return;
      }
      const response = await this.$store.dispatch('getComments', {
        postId: this.post.id,
        groupId: this.post.owner_id,
        offset: 0,
      });
      this.postComments = response.items;
      this.postProfiles = response.profiles;
      this.currentLevelCount = response.current_level_count;
      this.isLoaded = true;
    },
    async getCommentsMore() {
      if (this.offset < this.currentLevelCount) {
        this.offset += 10;
        const response = await this.$store.dispatch('getComments', {
          postId: this.post.id,
          groupId: this.post.owner_id,
          offset: this.offset,
        });

        this.postComments = this.postComments.concat(response.items);
        this.postProfiles = this.postProfiles.concat(response.profiles);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.footer-count {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 13px 0;

  &__left {
    display: flex;
  }

  &__item {
    display: flex;
    align-items: center;
    margin-right: 21px;

    &:hover {
      cursor: pointer;
    }
  }

  &__icon {
    margin-right: 6px;
  }

  &__value {
    font-size: 14px;
    color: var(--steel-gray-540);

    &--other {
      font-size: 13px;
      color: var(--steel-gray-400);
    }
  }
}

.footer-count__right .footer-count__item {
  margin-right: 0;
}

.footer-comments {
  border-top: 1px solid var(--gray-80);
  margin: 0 -20px;
  padding: 0 20px;

  &__show-more {
    margin-bottom: 16px;

    a {
      text-decoration: none;
      color: var(--link);
      font-weight: bold;
    }
  }
}
</style>
