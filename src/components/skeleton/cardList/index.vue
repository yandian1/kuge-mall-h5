<template>
  <div class="skeleton-card-list">
    <slot></slot>
  </div>
</template>

<script setup lang="ts" name="SkeletonCardList">
//
</script>

<style lang="less" scoped>
.skeleton-card-list {
  display: grid;
  grid-row-gap: var(--skeleton-row-gap);
}
</style>