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
          <div class="footer-comment__item">
            <AppLike
              @toggle-like="toggleLike"
              :has-like="hasLike"
              :is-small="true"
              :count="postComment.likes.count"
              type="comment"
              :owner-id="postComment.owner_id"
              :item-id="postComment.id"
            />
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
          <div
            @click.prevent="getCommentsMore"
            v-if="postComment.thread.count > 10 && offset < currentLevelCount - 10"
            class="footer-comment__show-more">
            <a href="">Показать следующие комментарии</a>
          </div>
        </template>
      </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import pluralize from '@/helpers/pluralize';
import dateConversion from '@/helpers/date-conversion';
import AppLike from '@/components/common/like.vue';

export default {
  name: 'CommentItem',

  components: {
    AppLike,
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

  data() {
    return {
      postCommentsThread: [],
      postProfilesThread: [],
      offset: 0,
      currentLevelCount: 0,
    };
  },

  computed: {
    ...mapGetters('groups', [
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

    hasLike() {
      return Boolean(this.postComment.likes.user_likes);
    },
  },

  methods: {
    async openComments() {
      const response = await this.$store.dispatch('groups/getCommentsForThread', {
        postId: this.post.id,
        ownerId: this.post.owner_id,
        commentId: this.postComment.id,
        offset: 0,
      });
      this.postCommentsThread = response.items;
      this.postProfilesThread = response.profiles;
      this.currentLevelCount = response.current_level_count;
    },

    async getCommentsMore() {
      if (this.offset < this.currentLevelCount) {
        this.offset += 10;
        const response = await this.$store.dispatch('groups/getCommentsForThread', {
          postId: this.post.id,
          ownerId: this.post.owner_id,
          commentId: this.postComment.id,
          offset: this.offset,
        });

        this.postCommentsThread = this.postCommentsThread.concat(response.items);
        this.postProfilesThread = this.postProfilesThread.concat(response.profiles);
      }
    },

    toggleLike(payload) {
      this.postComment.likes.count = payload.count;
      this.postComment.likes.user_likes = payload.hasLike;
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

  &__show-more {
    margin: 0 0 12px 50px;

     a {
       text-decoration: none;
       color: var(--link);
       font-weight: bold;
     }
  }
}
</style>
