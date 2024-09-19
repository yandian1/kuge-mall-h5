<template>
  <div class="skeleton-card">
    <slot></slot>
  </div>
</template>

<script setup lang="ts" name="SkeletonCard">
//
</script>

<style lang="less" scoped>
.skeleton-card {
  padding: var(--card-padding-y) var(--card-padding-x);
  border-radius: var(--card-border-radius);
  background-color: #fff;
}
</style>