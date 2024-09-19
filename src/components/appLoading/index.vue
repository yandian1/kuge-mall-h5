<template>
  <van-loading color="var(--red)" class="loading" />
</template>

<script setup lang="ts" name="AppLoading">
import { Loading as VanLoading } from 'vant'
// 上面的导入不能删除，否则 createApp 无法创建 appLoading 组件，见 /hooks/useLoading.ts
</script>

<style lang="less" scoped>
.loading {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>