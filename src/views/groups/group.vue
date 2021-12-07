<template>
  <app-content>
    <template v-slot:column-left>
      <div v-if="group" class="group">
        <div class="bg">
          <div class="group-header">
            <div class="group-header__title">{{ group.info.name }}</div>
            <div class="group-header__status">{{ group.info.status }}</div>
          </div>

          <div v-if="hasInformation" class="group-text">Информация</div>

          <div v-if="hasInformation" class="group-info">
            <div v-if="group.info.description" class="group-info__item">
              <div class="group-info__icon"><DescriptionIcon /></div>
              <div class="group-info__value" v-html="description"></div>
            </div>
            <div v-if="group.info.site" class="group-info__item">
              <div class="group-info__icon"><WebsiteIcon /></div>
              <div class="group-info__value">
                <a :href="group.info.site">{{ group.info.site }}</a>
              </div>
            </div>
            <div v-if="group.address" class="group-info__item">
              <div class="group-info__icon"><AddressIcon /></div>
              <div class="group-info__value">
                {{ group.address.address }}, {{ group.address.city.title }}
              </div>
            </div>
          </div>
        </div>

        <PostItem
          v-for="post in posts" :key="post.id"
          :post="post" />
      </div>
    </template>
    <template v-slot:column-right>11</template>
  </app-content>
</template>

<script>

import { mapGetters } from 'vuex';
import PostItem from '@/components/groups/posts/post.vue';
import DescriptionIcon from '@/components/icons/description.vue';
import WebsiteIcon from '@/components/icons/website.vue';
import AddressIcon from '@/components/icons/address.vue';
import AppContent from '@/components/common/layouts/content.vue';

export default {
  components: {
    PostItem,
    DescriptionIcon,
    WebsiteIcon,
    AddressIcon,
    AppContent,
  },

  data() {
    return {
      posts: [],
    };
  },

  async created() {
    await this.$store.dispatch('groups/getGroup', this.id);
    this.posts = await this.$store.dispatch('groups/getPosts', this.id);
  },

  computed: {
    id() {
      return Number(this.$route.params.id);
    },

    ...mapGetters('groups', [
      'group',
    ]),

    hasInformation() {
      return this.group.info.description || this.group.info.site
        || (this.group.address && this.group.address.address);
    },

    description() {
      return this.group.info.description.replace(/\n/gm, '<br />');
    },
  },
};
</script>

<style lang="scss" scoped>
.group {
  font-size: 13px;
}
.group-header {
  padding: 14px 18px;
  border-bottom: 1px solid var(--gray-80);

  &__title {
    font-size: 19px;
  }
}
.group-text {
  border-bottom: 1px solid var(--gray-80);
  padding: 18px 18px 16px 18px;
}
.group-info {
  padding: 16px 18px 16px 18px;
  margin-bottom: 13px;

  &__item {
    display: flex;
    margin-bottom: 6px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__icon {
    margin-right: 8px;
    position: relative;
    top: -4px;
  }
}
</style>
