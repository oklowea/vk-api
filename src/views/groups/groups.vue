<template>
  <app-content>
    <template v-slot:column-left>
      <div class="bg">
        <GroupItem
          v-for="group in groups" :key="group.id"
          :group="group" />
      </div>
    </template>
    <template v-slot:column-right>11</template>
  </app-content>
</template>

<script>
import { mapGetters } from 'vuex';
import GroupItem from '@/components/groups/group.vue';
import AppContent from '@/components/common/layouts/content.vue';

export default {
  components: {
    AppContent,
    GroupItem,
  },

  computed: {
    ...mapGetters('groups', [
      'groups',
    ]),
  },

  created() {
    this.$store.dispatch('groups/getGroups');
  },
};
</script>
