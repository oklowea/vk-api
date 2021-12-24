<template>
  <div class="counters bg">
    <div v-if='account.user.counters.friends' class="counter">
      <div class="counter__value">{{ account.user.counters.friends }}</div>
      <div class="counter__title">{{ friends }}</div>
    </div>
    <div v-if='account.user.counters.photos' class="counter">
      <div class="counter__value">{{ account.user.counters.photos }}</div>
      <div class="counter__title">{{ photos }}</div>
    </div>
    <div v-if='account.user.counters.user_photos' class="counter">
      <div class="counter__value">{{ account.user.counters.user_photos }}</div>
      <div class="counter__title">{{ userPhotos }}</div>
    </div>
    <div v-if='account.user.counters.videos' class="counter">
      <div class="counter__value">{{ account.user.counters.videos }}</div>
      <div class="counter__title">{{ videos }}</div>
    </div>
    <div v-if='account.user.counters.audios' class="counter">
      <div class="counter__value">{{ account.user.counters.audios }}</div>
      <div class="counter__title">{{ audios }}</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import pluralize from '@/helpers/pluralize';

export default {
  name: 'Counter',

  computed: {
    ...mapGetters('account', [
      'account',
    ]),

    friends() {
      return pluralize(this.account.user.counters.friends, ['друг', 'друга', 'друзей']);
    },

    photos() {
      return pluralize(this.account.user.counters.photos, ['фотография', 'фотографии', 'фотографий']);
    },

    userPhotos() {
      return pluralize(this.account.user.counters.user_photos, ['отметка', 'отметки', 'отметок']);
    },

    videos() {
      return pluralize(this.account.user.counters.videos, ['видеозапись', 'видеозаписи', 'видиозаписей']);
    },

    audios() {
      return pluralize(this.account.user.counters.audios, ['аудиозапись', 'аудиозаписи', 'аудиозаписей']);
    },
  },
};
</script>

<style lang="scss" scoped>
.counters {
  display: flex;
  justify-content: center;
  border-top: 1px solid var(--gray-80);
}

.counter {
  padding: 15px;
  text-align: center;

  &__value {
    font-size: 19px;
    padding-bottom: 3px;
    color: var(--link);
  }

  &__title {
    color: var(--steel-gray-540);
    font-size: 13px;
  }
}
</style>
