<template>
  <div v-if="groupsCount" class="groups bg">
    <div class="groups__header">
      <div class="groups-header__title">Подписки</div>
      <div class="groups-header__count">{{ groupsCount }}</div>
    </div>
    <div class="groups__list">
      <div v-for="group in someGroups" :key="group.id" class="groups-list__item">
        <div class="groups-list__icon">
          <img :src="group.photo_100" alt="">
        </div>
        <div class="groups-list__description">
          <div class="groups-list__title">{{ group.name }}</div>
          <div class="groups-list__subtitle">{{ groupStatus(group.id) }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters('groups', [
      'groups',
      'groupsCount',
    ]),

    someGroups() {
      return this.groups.slice(0, 5);
    },
  },

  async created() {
    await this.$store.dispatch('groups/getGroups');
  },

  methods: {
    groupStatus(id) {
      const group = this.groups.find((o) => o.id === id);

      if (!group.status) {
        return group.activity;
      }
      return group.status;
    },
  },
};
</script>

<style lang="scss" scoped>
.groups {
  border-radius: 5px 5px 0 0;
  border-bottom: 1px solid var(--gray-80);

  &__header {
    display: flex;
    font-size: 12px;
    padding: 12px 15px 0 15px;
  }

  &__list {
    padding: 12px 15px 15px 15px;
  }
}

.groups-header {
  &__count {
    padding: 0 6px;
    color: var(--gray-400);
  }
}

.groups-list {
  &__item {
    display: flex;
    margin-bottom: 12px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__icon {
    padding-right: 12px;

    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }

  &__title {
    font-size: 12.5px;
    color: var(--link);
    padding: 4px 0 2px 0;
  }

  &__subtitle {
    font-size: 12px;
    color: var(--gray-400);
  }
}
</style>
