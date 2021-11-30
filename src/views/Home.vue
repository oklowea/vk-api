<template>
    <div class="user">
      <div class="user__photo">
        <img :src="user.photo_200" alt="" />
      </div>
      <div class="user__description">
        {{ userName }}
      </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Home',

  components: {

  },

  data() {
    return {
    };
  },

  computed: {
    ...mapGetters([
      'user',
      'userName',
    ]),
  },

  methods: {
    // экшены вызываются с диспатчем
  },
};
</script>
