<template>
  <div class="modal" v-if="isLoaded">
    <div class="modal-background" @click="closeModalWindow"></div>
    <div class="modal-content">
      <div class="modal-content__left" :class="classObj">
        <img class="size-img" :src="biggestSizePhoto.url" alt="" />
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

export default {
  components: {
    CloseIcon,
  },

  data() {
    return {
      isLoaded: false,
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
      return this.photos[this.photos.length - 1].sizes.find((o) => o.type === 'z');
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
  },

  async created() {
    await this.$store.dispatch('photos/loadPhotos');
    this.isLoaded = true;
  },

  methods: {
    closeModalWindow() {
      this.$emit('close-modal-window');
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

    &:hover {
      cursor: pointer;
    }
  }
}
</style>
