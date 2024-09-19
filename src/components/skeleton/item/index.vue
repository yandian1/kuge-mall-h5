<template>
  <div class="skeleton-item van-skeleton--animate"></div>
</template>

<script setup lang="ts" name="SkeletonItem">
//
</script>

<style lang="less" scoped>
.skeleton-item {
  height: var(--skeleton-height);
  border-radius: var(--skeleton-border-radius);
  background-color: var(--van-skeleton-avatar-background);
}

@keyframes skeletonLoading {
  to {
    background-position-x: -20%
  }
}
</style>