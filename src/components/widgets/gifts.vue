<template>
  <div v-if="giftsCount" class="user-gifts bg">
    <div class="user-gifts__header">
      <div class="user-gifts__title">Подарки</div>
      <div class="user-gifts__count">{{ giftsCount }}</div>
    </div>
    <div class="user-gifts__lists">
      <div
        v-for="lastGift in lastGifts"
        :key="lastGift.id" class="user-gifts-list__item">
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
.user-gifts {
  border-radius: 5px;

  &__header {
    display: flex;
    font-size: 12px;
    padding: 12px 15px;
  }

  &__count {
    padding: 0 6px;
    color: var(--gray-400);
  }

  &__lists {
    display: flex;
    justify-content: space-between;
    padding: 0 15px 15px 15px;
  }
}

.user-gifts-list {
  &__item {
    img {
      width: 64px;
      height: 64px;
    }
  }
}
</style>
