<template>
  <div
    :class="{
      'safe-area': true,
      'safe-area__bottom': position === 'bottom'
    }"
  />
</template>

<script setup lang="ts" name="SafeArea">
defineProps<{
  position: 'left' | 'right' | 'top' | 'bottom'
}>()
</script>

<style lang="less" scoped>
.safe-area {
  &__bottom {
    height: constant(safe-area-inset-bottom);
    height: env(safe-area-inset-bottom);
  }
}
</style>