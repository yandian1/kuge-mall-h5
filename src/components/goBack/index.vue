<template>
  <div class="go-back van-back-top van-back-top--active" @click="router.back">
    <van-icon name="arrow-left" color="#fff" class="icon" />
  </div>
</template>

<script setup lang="ts" name="GoBack">
import { useRouter } from "vue-router"

const router = useRouter()
</script>

<style lang="less" scoped>
.go-back {
  color: #333;
  font-weight: bold;
  font-size: 16px;
  left: 20px;
  background-color: rgba(0, 0, 0, 0.4);
  bottom: calc(calc(2 * var(--bottom-bar-height)) + env(safe-area-inset-bottom) + 20px);
  .icon {
    //font-weight: bold;
  }
}
</style>