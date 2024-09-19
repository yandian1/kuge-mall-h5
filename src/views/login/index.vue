<template>
  <div class="page page-grey">
    <div class="form">
      <div class="form-item">
        <div class="form-item__label">手机号</div>
        <div class="form-item__content">
          <app-input v-model="formState.account" placeholder="请填写手机号" type="number" clearable/>
        </div>
      </div>
      <div class="form-item">
        <div class="form-item__label">验证码</div>
        <div class="form-item__content">
          <div class="verify-code-box">
            <app-input v-model="formState.code" placeholder="请填写验证码" clearable/>
            <div
              :class="{
                btn: true,
                'btn-disable': sendCodeIng || !formState.account || countdownSec > 0
              }"
              @click="sendCode"
            >
              {{ countdownSec <= 0 ? '获取验证码' : '剩余' + countdownSec + '秒' }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="login">
      <van-button
        class="btn"
        type="primary"
        loading-text="登录"
        :disabled="confirmLoading || !formState.account || !formState.code"
        :loading="confirmLoading"
        @click="login"
        block
      >
        登录
      </van-button>
    </div>
  </div>
</template>

<script setup lang="ts" name="Login">
import { reactive, ref } from "vue"
import { showToast } from 'vant'
import { useRouter } from "vue-router"
import { useUserStore } from "@/store/user"
import * as thirdApi from '@/api/thirdpart'
import pattern from "@/utils/pattern"

const router = useRouter()
const countdownSec = ref(0)
const confirmLoading = ref(false)
const sendCodeIng = ref(false)
const userStore = useUserStore()
const formState = reactive({
  account: undefined,
  code: undefined,
})


const handleCountDown = () => {
  countdownSec.value = 60
  const timer = setInterval(() => {
    countdownSec.value--
    if (countdownSec.value === 0) {
      clearInterval(timer)
    }
  }, 1000)
}


const sendCode = () => {
  if (sendCodeIng.value) return
  sendCodeIng.value = true
  thirdApi
    .sendCode({
      account: formState.account
    })
    .then(() => {
      sendCodeIng.value = false
      showToast("发送成功~")
      handleCountDown()
    })
    .catch(() => {
      sendCodeIng.value = false
    })
}

const verify = () => {
  const account = (formState.account || '').toString().trim()
  const code = (formState.code || '').toString().trim()

  if (!account) {
    showToast('请输入手机号')
    return
  }

  if (!pattern.phone.test(account)) {
    showToast('请输入正确手机号')
    return false
  }


  if (!code) {
    showToast('请输入验证码')
    return
  }

  return true
}

const login = () => {
  if (!verify()) return

  if (confirmLoading.value) return
  confirmLoading.value = true
  userStore
    .login(formState)
    .then(() => {
      confirmLoading.value = false
      router.back()
    })
    .catch(() => {
      confirmLoading.value = false
    })
}
</script>

<style lang="less" scoped>
.page {
  .form {
    //padding-top: calc(2 * var(--grid-size));
    background-color: #fff;
    .form-item {
      display: flex;
      align-items: center;
      height: 50px;
      padding: 0 calc(4 * var(--grid-size));
      border-bottom: 1px solid #f7f8f9;

      &__label {
        width: 82px;
        font-size: var(--font-size--large);
      }

      &__content {
        flex: 1;

        :deep(.app-input) {
          flex: 1;
          .input {
            font-size: var(--font-size--large);
            color: var(--font-color-default);
          }
        }

        .verify-code-box {
          display: flex;
          align-items: center;
          justify-content: space-between;

          .btn {
            right: var(--grid-size);
            color: var(--font-color-red);
            font-size: var(--font-size--small);

            &-disable {
              pointer-events: none;
              opacity: 0.5;
            }
          }
        }
      }

      &:last-child {
        border-bottom: none;
      }
    }
  }

  .login {
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
