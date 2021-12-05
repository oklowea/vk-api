<template>
  <div class="group">
    <div class="group__wrapper">
      <div class="group__logo">
        <router-link :to="{ name: 'group', params: { id: group.id }}">
          <img :src="group.photo_100" alt="" />
        </router-link>
      </div>
      <div class="group__description">
        <div class="group__title">
          <router-link :to="{ name: 'group', params: { id: group.id }}">
            {{ group.name }}
          </router-link>
        </div>
        <div class="group__activity">{{ group.activity }}</div>
        <div class="group__members">
          {{ (group.members_count).toLocaleString() }}
          {{ memberLabel }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import pluralize from '@/helpers/pluralize';

export default {
  props: {
    group: {
      type: Object,
      required: true,
    },
  },

  computed: {
    memberLabel() {
      return pluralize(this.group.members_count, ['подписчик', 'подписчика', 'подписчиков']);
    },
  },
};
</script>

<style lang="scss" scoped>
.group {
  padding: 0 20px;
  font-size: 13px;

  &:last-child .group__wrapper {
    border-bottom: none;
  }

  &__wrapper {
    border-bottom: 1px solid var(--gray-80);
    display: flex;
    justify-content: flex-start;
    padding: 20px 0;
  }

  &__logo {
    margin-right: 12px;

    a {
      display: inline-block;
      height: 80px;
    }

    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
    }
  }

  &__description {
    margin-top: 8px;
    color: var(--steel-gray-540);
  }

  &__title {
    margin-bottom: 6px;
    font-weight: bold;

    a {
      text-decoration: none;
      color: var(--link);
    }
  }

  &__activity {
    margin-bottom: 6px;
  }
}
</style>
