<template>
  <van-back-top :right="right" :bottom="bottom">
    <van-icon name="back-top" color="#000" style="font-weight: bold; font-size: 15px" />
  </van-back-top>
</template>

<script setup lang="ts" name="BackTop">
withDefaults(
  defineProps<{
    right?: string
    bottom?: string
  }>(),
  {
    right: '20px',
    bottom: 'calc(calc(2 * var(--bottom-bar-height)) + env(safe-area-inset-bottom) + 20px)',
  }
)
</script>

<style lang="less" scoped>
</style>
