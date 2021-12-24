<template>
  <div v-if="account && account.user">
    <div class="header">
      <div class="header__bg">
        <div class="header__item">
          <LogoIcon />
        </div>
        <div class="header__item">
          <img :src="account.user.photo_50" alt="" />
        </div>
      </div>
    </div>
    <div class="layout">
      <div class="menu">
        <div class="menu__item">
          <div class="menu__icon">
            <HouseIcon />
          </div>
          <router-link :to="{ name: 'home' }" class="menu__title">Моя страница</router-link>
        </div>
        <div class="menu__item">
          <div class="menu__icon">
            <GroupsIcon />
          </div>
          <router-link :to="{ name: 'groups' }" class="menu__title">Сообщества</router-link>
<!--          <div class="menu__count">34</div>-->
        </div>
      </div>

      <div class="content">
        <router-view/>
      </div>
    </div>
  </div>
  <div v-else>
    Loading...
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import HouseIcon from '@/components/icons/house.vue';
import GroupsIcon from '@/components/icons/groups.vue';
import LogoIcon from '@/components/icons/logo.vue';

export default {
  components: {
    HouseIcon,
    GroupsIcon,
    LogoIcon,
  },

  computed: {
    ...mapGetters('account', [
      'account',
    ]),
  },
};
</script>

<style lang="scss">
.header {
  background: var(--blue-640);
  height: 42px;

  &__item {
    &:last-child {
      img {
        width: 28px;
        height: 28px;
        border-radius: 50%;
      }
    }
  }

  &__bg {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 965px;
    height: 42px;
    margin: 0 auto;
  }
}

.layout {
  width: 965px;
  margin: 15px auto 0 auto;
  display: flex;
  justify-content: flex-start;
  padding-bottom: 100px;

  .menu {
    width: 153px;
    margin-right: 14px;
  }

  .content {
    width: 798px;
  }
}

.menu {
  &__item {
    position: relative;
    display: flex;
    align-items: center;
    margin: 2px 0;
    height: 27px;

    &:hover {
      background: var(--light-blue-100);
    }
  }

  &__icon {
    margin-right: 7px;
    display: flex;
    align-items: center;

    svg {
      opacity: 0.45;

      path {
        fill: var(--link);
      }
    }
  }

  &__title {
    font-size: 12.5px;
    color: var(--link);
    text-decoration: none;

    &:after {
      content: '';
      display: block;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      z-index: 2;
    }
  }

  &__count {
    position: absolute;
    top: 0;
    right: 0;
    font-size: 12.5px;
    color: var(--link);
    background: var(--gray-120);
    line-height: 27px;
    padding: 0 5px;
    border-radius: 2px;
  }
}
</style>
