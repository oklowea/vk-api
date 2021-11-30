<template>
  <div class="footer-comment">
    <div class="footer-comment__profile-photo">
      <img :src="profilePhoto" alt="" />
    </div>
    <div class="footer-comment__description">
      <div class="footer-comment__profile-name">
        {{ profileName }}
      </div>
      <div class="footer-comment__text">{{ postComment.text }}</div>

      <div class="footer-comment__bottom">
        <div class="footer-comment__item">
          <div class="footer-comment__date">{{ date }}</div>
          <div class="footer-comment__respond">
            <a href="">Oтветить</a>
          </div>
        </div>
        <div v-if="postComment.likes.count" class="footer-comment__item">
            <div class="footer-comment__likes">
              <div class="footer-comment-likes__icon">
                <smallLikesIcon />
              </div>
              <div class="footer-comment-likes__value">{{ postComment.likes.count }}</div>
            </div>
        </div>
      </div>

      <div v-if="hasLoadMore" class="footer-comment__count">
        <a @click.prevent="openComments" href="">
          {{ postComment.thread.count }} {{ answersLabel }}
        </a>
      </div>

      <template v-if="postCommentsThread.length">
        <CommentItem
          v-for="postCommentThread in postCommentsThread" :key="postCommentThread.id"
          :post="post"
          :post-profiles="postProfilesThread"
          :post-comment="postCommentThread"
        />
      </template>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import pluralize from '@/helpers/pluralize';
import dateConversion from '@/helpers/date-conversion';
import smallLikesIcon from '@/components/icons/small-likes.vue';

export default {
  name: 'CommentItem',

  data() {
    return {
      postCommentsThread: [],
      postProfilesThread: [],
    };
  },

  components: {
    smallLikesIcon,
  },

  props: {
    postComment: {
      type: Object,
      required: true,
    },
    postProfiles: {
      type: Array,
      required: true,
    },
    post: {
      type: Object,
      required: true,
    },
  },

  computed: {
    ...mapGetters([
      'group',
    ]),

    profile() {
      for (let i = 0; i < this.postProfiles.length; i += 1) {
        if (this.postComment.from_id === this.postProfiles[i].id) {
          return this.postProfiles[i];
        }
      }
      return null;
    },

    date() {
      return dateConversion(this.postComment.date);
    },

    hasLoadMore() {
      if (!this.postComment.thread) {
        return false;
      }
      return this.postComment.thread.count && this.postCommentsThread.length === 0;
    },

    profilePhoto() {
      if (this.postComment.from_id === -this.group.info.id) {
        return this.group.info.photo_50;
      }
      return this.profile.photo_50;
    },

    profileName() {
      if (this.postComment.from_id === -this.group.info.id) {
        return this.group.info.name;
      }
      return `${this.profile.first_name} ${this.profile.last_name}`;
    },

    answersLabel() {
      return pluralize(this.postComment.thread.count, ['ответ', 'ответа', 'ответов']);
    },
  },

  methods: {
    async openComments() {
      const response = await this.$store.dispatch('getCommentsForThread', {
        postId: this.post.id,
        groupId: this.post.owner_id,
        commentId: this.postComment.id,
      });
      this.postCommentsThread = response.items;
      this.postProfilesThread = response.profiles;
    },
  },
};
</script>

<style lang="scss" scoped>
.footer-comment {
  display: flex;
  padding: 7px 0;

  &:last-child .footer-comment__description {
    border-bottom: none;
  }

  &__profile-photo {
    margin-right: 10px;

    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }

  &__description {
    width: 100%;
    border-bottom: 1px solid var(--gray-80);
  }

  &__profile-name {
    font-weight: bold;
    color: var(--link);
    padding-bottom: 4px;
  }

  &__bottom {
    display: flex;
    justify-content: space-between;
    font-size: 12.5px;
    padding: 4px 0 8px 0;
  }

  &__item {
    &:first-child {
      display: flex;
    }
  }

  &__date {
    color: var(--gray-400);
    margin-right: 8px;
  }

  &__respond {
    a {
      text-decoration: none;
      color: var(--link);
    }
  }

  &__likes {
    display: flex;
    align-items: flex-end;
  }

  &__count {
    padding-bottom: 8px;
     a {
       text-decoration: none;
       color: var(--link);
     }
  }
}

.footer-comment-likes__value {
  margin-left: 4px;
  color: var(--link);
}

</style>
