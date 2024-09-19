<template>
  <div class="app-empty">
    <div>
      <slot name="img">
        <svg-icon :icon="icon" :size="150" />
      </slot>
    </div>
    <div>
      <slot>
        <div>{{desc}}</div>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts" name="AppEmpty">
defineProps({
  icon: {
    type: String,
    default: 'empty',
  },
  desc: {
    type: String,
    default: '空空如也~',
  },
})
</script>

<style lang="less" scoped>
.app-empty {
  text-align: center;
  .text {
    font-size: var(--font-size--large);
  }
}
</style>