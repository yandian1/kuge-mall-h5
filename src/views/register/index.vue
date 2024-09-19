<template>
  <div class="page">
    <div class="form">
      <div class="form-item">
        <div class="form-item__label">手机号</div>
        <div class="form-item__content">
          <input class="input" v-model="formState.account" placeholder="请填写手机号" />
        </div>
      </div>
      <div class="form-item">
        <div class="form-item__label">密码</div>
        <div class="form-item__content">
          <div class="verify-code-box">
            <input class="input" type="password" v-model="formState.password" placeholder="请填写密码" />
          </div>
        </div>
      </div>
    </div>

    <div class="confirm" @click="register">确认</div>
  </div>
</template>

<script setup lang="ts" name="Register">
import { reactive } from 'vue'
import { useUserStore } from '@/store/user'
import { useRouter } from 'vue-router'

const router = useRouter()
const userStore = useUserStore()
const formState = reactive({
  account: '18755781039',
  password: '123456',
})

const register = () => {
  userStore
    .register(formState)
    .then(() => {
      router.replace('/')
    })
    .catch(() => {})
}
</script>

<style lang="less" scoped>
.page {

  .form {
    .form-item {
      display: flex;
      align-items: center;
      height: 46px;
      padding: 0 calc(2 * var(--grid-size));
      background-color: #fff;
      border-bottom: 1px solid #f7f8f9;
      &__label {
        width: 82px;
      }
      &__content {
        flex: 1;
        .input {
          display: block;
          width: 100%;
          font-size: var(--font-size--default);
          color: var(--font-color-default);
          &::placeholder {
            color: var(--font-color-black-l2);
            font-size: var(--font-size--default);
          }
        }
        .verify-code-box {
          display: flex;
          align-items: center;
          .input {
            flex: 1;
          }
          .btn {
            right: var(--grid-size);
            color: var(--font-color-red);
            font-size: var(--font-size--small);
          }
        }
      }
      &:last-child {
        border-bottom: none;
      }
    }
  }

  .confirm {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 30px;
    margin-left: calc(2 * var(--grid-size));
    margin-right: calc(2 * var(--grid-size));
    margin-top: calc(2 * var(--grid-size));
    border-radius: 15px;
    background: var(--font-color-red);
    color: #fff;
    text-align: center;
  }
}
</style>
