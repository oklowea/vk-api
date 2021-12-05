<template>
  <div class="columns" :class="{
    'columns--left-is-wide': !isRightWide,
    'columns--right-is-wide': isRightWide,
  }">
    <div class="columns__column">
      <slot name="column-left" />
    </div>
    <div class="columns__column">
      <slot name="column-right" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppContent',

  props: {
    isRightWide: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.columns {
  display: flex;

  &--left-is-wide {
    .columns__column {
      &:first-child {
        width: 552px;
        margin-right: 14px;
      }

      &:last-child {
        width: 232px;
      }
    }
  }

  &--right-is-wide {
    .columns__column {
      &:first-child {
        width: 232px;
      }

      &:last-child {
        width: 552px;
        margin-left: 14px;
      }
    }
  }
}
</style>
