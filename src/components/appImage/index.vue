<template>
  <van-image :class="{ratio: ratio}" v-bind="attrs" @click="clickHandle">
    <template v-slot:loading>
      <svg-icon icon="dove" color="#efefef" style="width: 70%; height: 70%; opacity: .5"/>
    </template>
  </van-image>
</template>

<script setup lang="ts" name="AppImage">
import { computed, useAttrs } from "vue"
import { showImagePreview } from 'vant'

const attrs = useAttrs()
const props = defineProps({
  preview: {
    type: Boolean,
    default: false
  },
  ratio: {
    type: Number,
  },
})

const clickHandle = () => {
  if (props.preview) {
    showImagePreview([attrs.src as string])
  }
}

const height = computed(() => {
  if (props.ratio) {
    return (1 / props.ratio) * 100 + '%'
  } else {
    return 0
  }
})
</script>

<style lang="less" scoped>
.ratio {
  position: relative;
  width: 100%;
  height: 0;
  padding-top: v-bind(height);

  :deep(.van-image__img) {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
</style>