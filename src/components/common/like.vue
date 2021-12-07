<template>
  <div
    @click="toggleLike"
    class="app-like"
    :class="{ 'app-like--liked': hasLike, 'app-like--small': isSmall }">
    <div class="app-like__icon">
      <LikesIcon
        :has-like="hasLike"
        :is-small="isSmall"/>
    </div>
    <div class="app-like__value">{{ count.toLocaleString() }}</div>
  </div>
</template>

<script>
import LikesIcon from '@/components/icons/likes.vue';

export default {
  name: 'app-like',

  components: {
    LikesIcon,
  },

  props: {
    isSmall: {
      type: Boolean,
      default: false,
    },

    count: {
      type: Number,
      required: true,
    },

    hasLike: {
      type: Boolean,
      required: true,
    },

    type: {
      type: String,
      required: true,
    },

    ownerId: {
      type: Number,
      required: true,
    },

    itemId: {
      type: Number,
      required: true,
    },
  },

  methods: {
    async toggleLike() {
      let response;
      if (this.hasLike) {
        response = await this.$store.dispatch('likes/dislike', {
          type: this.type,
          ownerId: this.ownerId,
          itemId: this.itemId,
        });
      } else {
        response = await this.$store.dispatch('likes/like', {
          type: this.type,
          ownerId: this.ownerId,
          itemId: this.itemId,
        });
      }

      this.$emit('toggle-like', {
        count: response.likes,
        hasLike: !this.hasLike,
      });
    },
  },
};
</script>

<style lang="scss">
.app-like {
  display: inline-flex;
  align-items: center;

  &__value {
    font-size: 14px;
    color: var(--steel-gray-540);
    margin-left: 6px;
  }

  svg path {
    fill: var(--steel-gray-400);
  }

  &:hover {
    cursor: pointer;

    svg path {
      fill: var(--steel-gray-540);
    }
  }

  &.app-like--liked {
    svg path {
      fill: var(--red);
    }

    .app-like__value {
      color: var(--red);
    }

    &:hover {
      svg path {
        fill: var(--red);
      }
    }
  }

  &--small {
    .app-like__value {
      font-size: 12px;
      margin-left: 4px;
    }
  }
}
</style>
