<template>
  <app-content :is-right-wide="true">
    <template v-slot:column-left>
      <div class="user-photo bg">
        <img :src="account.user.photo_200" alt="" />
      </div>
      <GiftsWidget />
      <FriendsWidget />
    </template>
    <template v-slot:column-right>
      <div class="user-info bg">
        <div class="user-info__main-data">
          <div class="user-info__name">{{ userName }}</div>
          <div class="user-info__status">{{ account.status }}</div>
        </div>
        <div class="user-info__short-data">
          <div v-if="birthDate" class="user-info__item">
            <div class="user-info__text">Дата рождения:</div>
            <div class="user-info__value">
              <a href="">{{ birthDate }}</a>
            </div>
          </div>
          <div class="user-info__item">
            <div class="user-info__text">Семейное положение:</div>
            <div class="user-info__value">
              {{ relationShips }}
              <a href="">
                {{ partnerName }}
              </a>
            </div>
          </div>
          <div v-if="universityName" class="user-info__item">
            <div class="user-info__text">Образование:</div>
            <div class="user-info__value">
              <a href="">
                {{ universityName }}
              </a>
            </div>
          </div>
        </div>
        <div class="user-info__counters">
          <div></div>
        </div>
      </div>
<!--      {{ account.user.counters.friends}}-->
<!--      {{ account.user.counters.photos}}-->
<!--      {{ account.user.counters.user_photos}}-->
<!--      {{ account.user.counters.audios}}-->
    </template>
  </app-content>
</template>

<script>
import { mapGetters } from 'vuex';
import AppContent from '@/components/common/layouts/content.vue';
import { birthdayVisibilityType, sexType } from '@/store/account';
import GiftsWidget from '@/components/widgets/gifts.vue';
import FriendsWidget from '@/components/widgets/friends.vue';

export default {
  name: 'Home',

  components: {
    AppContent,
    GiftsWidget,
    FriendsWidget,
  },

  data() {
    return {
    };
  },

  computed: {
    ...mapGetters('account', [
      'account',
      'userName',
      'partnerName',
    ]),

    universityName() {
      if (!this.account.user.graduation) {
        return '';
      }

      const year = String(this.account.user.graduation);
      return `${this.account.user.university_name} '${year[2]}${year[3]}`;
    },

    birthDate() {
      if (!this.account.bdate) {
        return '';
      }

      const monthCurrent = this.account.bdate.split('.')[1] - 1;
      const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

      if (this.account.bdate_visibility === birthdayVisibilityType.FULL) {
        return `${this.account.bdate.split('.')[0]} ${months[monthCurrent]}.${this.account.bdate.split('.')[1]} г.`;
      }
      if (this.account.bdate_visibility === birthdayVisibilityType.PARTIAL) {
        return `${this.account.bdate.split('.')[0]} ${months[monthCurrent]}`;
      }
      return '';
    },

    relationShips() {
      if (this.account.relation === 0) {
        return '';
      }

      const optionsMan = ['не женат', 'есть подруга', 'помолвлен', 'женат', 'всё сложно',
        'в активном поиске', 'влюблён', 'в гражданском браке', 'не указано'];
      const optionsWoman = ['не замужем', 'есть друг', 'помолвлена',
        'замужем', 'всё сложно', 'в активном поиске', 'влюблена', 'в гражданском браке', 'не указано'];

      if (!this.account.relation_partner) {
        return this.account.sex === sexType.MAN
          ? optionsMan[this.account.relation - 1]
          : optionsWoman[this.account.relation - 1];
      }

      if (this.account.sex === sexType.MAN) {
        let postfix;
        switch (this.account.relation) {
          case 3:
          case 8:
            postfix = 'c'; break;
          case 4: postfix = 'на'; break;
          case 7: postfix = 'в'; break;
          default: postfix = ''; break;
        }

        return `${optionsMan[this.account.relation - 1]} ${postfix}`;
      }

      if (this.account.sex === sexType.WOMAN) {
        let postfix;
        switch (this.account.relation) {
          case 3:
          case 8:
            postfix = 'c'; break;
          case 4: postfix = 'за'; break;
          case 7: postfix = 'в'; break;
          default: postfix = ''; break;
        }

        return `${optionsWoman[this.account.relation - 1]} ${postfix}`;
      }

      return '';
    },
  },
};
</script>

<style lang="scss" scoped>
.user-photo {
  padding: 15px 15px 6px 15px;
  margin-bottom: 15px;
  border-radius: 5px;
}

.user-info {
  padding: 15px 20px;
  border-radius: 5px;
  font-size: 13px;

  &__main-data {
    padding-bottom: 15px;
    border-bottom: 1px solid var(--gray-80);
  }

  &__name {
    font-size: 19px;
  }

  &__short-data {
    padding-top: 15px;
  }

  &__item {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 6px;
  }

  &__text {
    color: var(--steel-gray-400);
    width: 30%;
  }

  &__value {
    a {
      text-decoration: none;
      color: var(--link);
    }
  }
}
</style>
