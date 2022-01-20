<template>
  <div class="modal" v-if="isLoaded">
    <div class="modal-background" @click="closeModalWindow"></div>
    <div class="modal-content">
      <div class="modal-content__left" :class="classObj">
        <img class="size-img" :src="biggestSizePhoto.url" alt="" />
        <div @click="previousPhoto" class="arrow arrow__left">
          <ArrowLeft />
        </div>
        <div @click="nextPhoto" class="arrow arrow__right">
          <ArrowRight />
        </div>
      </div>
      <div class="modal-content__right bg">
        <div class="info">
          <div class="info__item">
            <img :src="account.user.photo_50" alt="" />
          </div>
          <div class="info__item">
            <div class="info__name"> {{ userName }} </div>
            <div class="info__loading"> {{ date }} </div>
          </div>
        </div>

        <div class="reactions">
          <div class="reaction">
            <div class="reaction__item">
              <AppLike
                @toggle-like="toggleLike"
                :has-like="hasLike"
                :count="this.photos[this.currentPhotoIndex].likes.count"
                type="photo"
                :owner-id="this.account.user.id"
                :item-id="this.photos[this.currentPhotoIndex].id"
              />
            </div>
            <div class="reaction__item">
              <SharedIcon />
            </div>
          </div>
        </div>

      </div>
    </div>
    <div class="modal-close" @click="closeModalWindow">
      <CloseIcon />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import CloseIcon from '../icons/close.vue';
import dateConversion from '@/helpers/date-conversion';
import ArrowRight from '../icons/arrow-right.vue';
import ArrowLeft from '../icons/arrow-left.vue';
import AppLike from '@/components/common/like.vue';
import SharedIcon from '@/components/icons/shared.vue';

export default {
  components: {
    CloseIcon,
    ArrowRight,
    ArrowLeft,
    AppLike,
    SharedIcon,
  },

  data() {
    return {
      isLoaded: false,
      currentPhotoIndex: 0,
    };
  },

  computed: {
    ...mapGetters('photos', [
      'photos',
    ]),

    ...mapGetters('account', [
      'account',
      'userName',
    ]),

    biggestSizePhoto() {
      return this.photos[this.currentPhotoIndex].sizes.find((o) => o.type === 'z');
    },

    isHorizontalPhoto() {
      return this.biggestSizePhoto.width > this.biggestSizePhoto.height;
    },

    classObj() {
      return {
        'modal-content__left--horizontal': this.isHorizontalPhoto,
        'modal-content__left--vertical': !this.isHorizontalPhoto,
      };
    },

    date() {
      return dateConversion(this.photos[this.photos.length - 1].date);
    },

    hasLike() {
      return Boolean(this.photos[this.currentPhotoIndex].likes.user_likes);
    },
  },

  async created() {
    await this.$store.dispatch('photos/loadPhotos');
    this.currentPhotoIndex = this.photos.length - 1;
    this.isLoaded = true;
    window.addEventListener('keydown', this.onKeyPress);
  },

  beforeDestroy() {
    window.removeEventListener('keydown', this.onKeyPress);
  },

  methods: {
    onKeyPress(e) {
      switch (e.key) {
        case 'ArrowRight': this.nextPhoto(); break;
        case 'ArrowLeft': this.previousPhoto(); break;
        case 'Escape': this.closeModalWindow(); break;
        default:
      }
    },

    closeModalWindow() {
      this.$emit('close-modal-window');
    },

    nextPhoto() {
      this.currentPhotoIndex -= 1;

      if (this.currentPhotoIndex < 0) {
        this.currentPhotoIndex = this.photos.length - 1;
      }
    },

    previousPhoto() {
      this.currentPhotoIndex += 1;

      if (this.currentPhotoIndex === this.photos.length) {
        this.currentPhotoIndex = 0;
      }
    },

    toggleLike(payload) {
      this.photos[this.currentPhotoIndex].likes.count = payload.count;
      this.photos[this.currentPhotoIndex].likes.user_likes = payload.hasLike;
    },
  },
};
</script>

<style lang="scss" scoped>
.modal {
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.modal-background {
  height: inherit;
  background: var(--black);
  opacity: 0.7;
  z-index: 1;
}

.modal-content {
  width: 80%;
  height: calc(100% - 40px);
  position: absolute;
  top: 20px;
  left: 50%;
  margin-left: -40%;
  display: flex;
  justify-content: left;
  z-index: 9999;

  &__left {
    position: relative;
    width: 75%;
    background: var(--black-for-photo);
    border-radius: 5px 0 0 5px;

    &--vertical {
      text-align: center;
    }

    &--horizontal {
      display: flex;
      align-items: center;
    }

    .arrow {
      position: absolute;
      top: 50%;
      margin-top: -24px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      width: 48px;
      height: 48px;
      background-color: var(--background-for-icons);

      &:hover {
        cursor: pointer;

        ::v-deep path {
          fill: var(--white);
        }
      }

      svg {
        width: 32px;
        height: 32px;
        position: relative;
        left: -2px;

        ::v-deep path {
          fill: #c2c4c7;
        }
      }

      &__left {
        left: 12px;
      }

      &__right {
        right: 12px;
      }
    }
  }

  &__right {
    width: 25%;
    border-radius: 0 5px 5px 0;
  }
}

.info {
  display: flex;
  justify-content: left;
  padding: 13px 20px 10px 15px;
  border-bottom: 1px solid var(--gray-80);

  &__item {
    font-size: 13px;

    &:first-child {
      margin-right: 10px;

      img {
        max-width: 40px;
        max-height: 40px;
        border-radius: 50%;
      }
    }
  }

  &__name {
    color: var(--link);
    margin: 4px 0;
  }

  &__loading {
    color: var(--steel-gray-400);
  }
}

.reactions {
  padding: 17px 15px;
  border-bottom: 1px solid var(--gray-80);
}

.reaction {
  display: flex;
  justify-content: left;
  align-items: center;

  &__item {
    &:first-child {
      margin-right: 20px;
    }
  }
}

.size-img {
  max-width: 100%;
  max-height: 100%;
}

.modal-close {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 9999;

  svg {
    width: 20px;
    height: 20px;

    ::v-deep path {
      fill: #c2c4c7;
    }

    &:hover {
      cursor: pointer;

      ::v-deep path {
        fill: var(--white);
      }
    }
  }
}
</style>
