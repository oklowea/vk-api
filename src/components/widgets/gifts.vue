<template>
  <div v-if="giftsCount" class="gifts bg">
    <div class="gifts__header">
      <div class="gifts__title">Подарки</div>
      <div class="gifts__count">{{ giftsCount }}</div>
    </div>
    <div class="gifts__list">
      <div
        v-for="lastGift in lastGifts"
        :key="lastGift.id" class="gift-list__item">
        <img :src="lastGift.gift.thumb_96" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters('gifts', [
      'giftsCount',
      'gifts',
    ]),

    lastGifts() {
      return this.gifts.slice(0, 3);
    },
  },

  async created() {
    await this.$store.dispatch('gifts/loadGifts');
  },
};
</script>

<style lang="scss" scoped>
.gifts {
  border-radius: 5px;
  margin-bottom: 15px;

  &__header {
    display: flex;
    font-size: 12px;
    padding: 12px 15px;
  }

  &__count {
    padding: 0 6px;
    color: var(--gray-400);
  }

  &__list {
    display: flex;
    justify-content: space-between;
    padding: 0 15px 15px 15px;
  }
}

.gift-list {
  &__item {
    img {
      width: 64px;
      height: 64px;
    }
  }
}
</style>
