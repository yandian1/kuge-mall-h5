<template>
  <div class="page page-grey">
    <div class="nickname">
      <app-input style="width: 100%" placeholder="请输入昵称" v-model="formState.name" autofocus clearable />
    </div>

    <div class="confirm">
      <van-button
        class="btn"
        type="primary"
        loading-text="确认"
        :disabled="confirmLoading || !formState.name"
        :loading="confirmLoading"
        @click="setName"
        block
      >
        确认
      </van-button>
    </div>
  </div>
</template>

<script setup lang="ts" name="Nickname">
import { reactive, ref } from "vue"
import { showToast } from 'vant'
import { useRouter } from "vue-router"
import { useUserStore } from "@/store/user"
import * as memberApi from '@/api/member/member'

const router = useRouter()
const userStore = useUserStore()
const formState = reactive({
  name: '',
})
const confirmLoading = ref(false)

const verify = () => {
  const name = formState.name.trim()

  if (!name) {
    showToast('请输入昵称')
    return false
  }

  return true
}

const setName = () => {
  if (!verify()) return

  if (confirmLoading.value) return
  confirmLoading.value = true

  memberApi
    .setName(formState)
    .then(() => {
      confirmLoading.value = false
      userStore.user.name = formState.name
      showToast('设置成功~')
      router.back()
    })
    .catch(() => {
      confirmLoading.value = false
    })
}
</script>

<style lang="less" scoped>
.page {
  .nickname {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 50px;
    padding: 0 var(--page-padding-y);
    background-color: #fff;
  }

  .confirm {
    margin-top: calc(4 * var(--grid-size));
    margin-left: var(--page-padding-x);
    margin-right: var(--page-padding-x);
    .btn {
      height: var(--action-button-height);
      border-radius: var(--action-button-radius);
    }
  }
}
</style>
