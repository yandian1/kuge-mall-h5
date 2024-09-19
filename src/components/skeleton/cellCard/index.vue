<template>
  <skeleton-card class="skeleton-cell-card">
    <div class="row" v-for="item in size" :key="item">
      <skeleton-item class="row-title"/>
      <skeleton-item class="row-content"/>
    </div>
  </skeleton-card>
</template>

<script setup lang="ts" name="SkeletonCellCard">
defineProps({
  size: {
    type: Number,
  },
})
</script>

<style lang="less" scoped>
.skeleton-cell-card {
  .row {
    display: flex;
    justify-content: space-between;
    margin-bottom: var(--skeleton-row-gap);

    &-title {
      width: 40%;
    }

    &-content {
      width: 40%;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>