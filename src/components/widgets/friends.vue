<template>
  <div class="friends bg">
    <div class="friends__item">
      <div class="friends__header">
        <div class="friends-header__title">Друзья</div>
        <div class="friends-header__count">{{ friendsCount }}</div>
      </div>
      <div class="friends__list">
        <div class="friends-list__item">
          <div v-for="friend in someFriends[0]" :key="friend.id"
               class="friends-list__person">
            <div class="friends-list__person-photo">
              <img :src="friend.photo_100" alt="" />
            </div>
            <div class="friends-list__person-name">{{ friend.first_name }}</div>
          </div>
        </div>
        <div class="friends-list__item">
          <div v-for="friend in someFriends[1]" :key="friend.id"
               class="friends-list__person">
            <div class="friends-list__person-photo">
              <img :src="friend.photo_100" alt="" />
            </div>
            <div class="friends-list__person-name">{{ friend.first_name }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="friends__item">
      <div class="friends__header">
        <div class="friends-header__title">Друзья онлайн</div>
        <div class="friends-header__count">{{ onlineFriends[2] }}</div>
      </div>
      <div class="friends__list">
        <div class="friends-list__item">
          <div v-for="friend in onlineFriends[0]" :key="friend.id"
               class="friends-list__person">
            <div class="friends-list__person-photo">
              <img :src="friend.photo_100" alt="" />
            </div>
            <div class="friends-list__person-name">{{ friend.first_name }}</div>
          </div>
        </div>
        <div class="friends-list__item">
          <div v-for="friend in onlineFriends[1]" :key="friend.id"
               class="friends-list__person">
            <div class="friends-list__person-photo">
              <img :src="friend.photo_100" alt="" />
            </div>
            <div class="friends-list__person-name">{{ friend.first_name }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters('friends', [
      'friends',
      'friendsCount',
    ]),

    onlineFriends() {
      const onlineFriends = this.friends.filter((o) => o.online === 1);
      const firstThree = onlineFriends.slice(0, 3);
      const secondThree = onlineFriends.slice(3, 6);

      return [firstThree, secondThree, onlineFriends.length];
    },

    someFriends() {
      const firstThree = this.friends.slice(0, 3);
      const secondThree = this.friends.slice(3, 6);

      return [firstThree, secondThree];
    },
  },

  async created() {
    await this.$store.dispatch('friends/loadFriends');
  },
};
</script>

<style lang="scss" scoped>
.friends {
  margin-bottom: 15px;
  border-radius: 5px;

  &__item {
    border-bottom: 1px solid var(--gray-80);
  }

  &__header {
    display: flex;
    font-size: 12px;
    padding: 12px 15px 0 15px;
  }

  &__list {
    padding: 6px 10px 8px 10px;
  }
}

.friends__item:last-child {
  border-bottom: none;
}

.friends-header {
  &__count {
    padding: 0 6px;
    color: var(--gray-400);
  }
}

.friends-list {
  &__item {
    display: flex;
  }

  &__person {
    padding: 6px 0 5px 0;
  }

  &__person-photo {
    margin: 0 10px;
    padding-bottom: 7px;

    img {
      border-radius: 50%;
      width: 50px;
      height: 50px;
    }
  }

  &__person-name {
    font-size: 12px;
    color: var(--blue-1000);
    text-align: center;
  }
}
</style>
