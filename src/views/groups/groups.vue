<template>
  <div class="bg">
    <GroupItem
      v-for="group in groups" :key="group.id"
      :group="group" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import GroupItem from '@/components/groups/group.vue';

export default {
  components: {
    GroupItem,
  },
  computed: {
    ...mapGetters([
      'groups',
    ]),
  },

  created() {
    this.$store.dispatch('getGroups');
  },
};
</script>
