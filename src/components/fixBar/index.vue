<template>
  <div class="fix-bar safe-padding-bottom">
    <div style="width: 100%">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts" name="FixBar">
import {computed} from "vue"

const props = defineProps({
  bottom: {
    type: Number,
    default: 0
  },
  left: {
    type: Number,
    default: 0
  },
  right: {
    type: Number,
    default: 0
  },
})

const leftPos = computed(() => props.left + 'px')
const rightPos = computed(() => props.right + 'px')
const bottomPos = computed(() => props.bottom + 'px')
</script>

<style lang="less" scoped>
.fix-bar {
  position: fixed;
  z-index: 9;
  left: v-bind(leftPos);
  right: v-bind(rightPos);
  bottom: v-bind(bottomPos);
  display: flex;
  align-items: center;
  min-height: var(--bottom-bar-height);
}
</style>