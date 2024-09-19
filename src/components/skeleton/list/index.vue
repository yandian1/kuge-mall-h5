<template>
  <div class="skeleton-list">
    <slot></slot>
  </div>
</template>

<script setup lang="ts" name="SkeletonList">
//
</script>

<style lang="less" scoped>
.skeleton-list {
  display: grid;
  grid-row-gap: var(--skeleton-row-gap);
}
</style>