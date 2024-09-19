<template>
  <div class="page page-grey">
    <div class="list">
      <div class="item">
        <div class="title">头像</div>
        <div class="value">
          <van-uploader>
            <div class="avatar-box">
              <app-image :src="avatar" radius="50%" width="40px" height="40px"/>
              <svg-icon icon="more" color="#666" class="icon"/>
            </div>
          </van-uploader>
        </div>
      </div>
      <div class="item" @click="router.push({name: 'Nickname'})">
        <div class="title">昵称</div>
        <div class="value">
          <span class="text">{{ userStore.user.name }}</span>
          <svg-icon icon="more" color="#666" class="icon"/>
        </div>
      </div>
      <div class="item" @click="router.push({name: 'Phone'})">
        <div class="title">手机号</div>
        <div class="value">
          <span class="text">{{ userStore.user.account }}</span>
          <svg-icon icon="more" color="#666" class="icon"/>
        </div>
      </div>
    </div>

    <div class="logout">
      <van-button
        class="btn"
        loading-text="退出登录"
        :disabled="confirmLoading"
        :loading="confirmLoading"
        @click="logout"
        block
      >
        退出登录
      </van-button>
    </div>
  </div>
</template>

<script setup lang="ts" name="Profile">
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/user'
import avatar from '@/assets/img/my/avatar.png'
import { ref } from "vue";

const router = useRouter()
const userStore = useUserStore()
const confirmLoading = ref(false)

const logout = () => {
  if (confirmLoading.value) return
  confirmLoading.value = true
  userStore
    .logout()
    .then(() => {
      confirmLoading.value = false
      router.replace({ name: 'Login' })
    })
    .catch(() => {
      confirmLoading.value = false
    })
}
</script>

<style lang="less" scoped>
.page {
  .list {
    background-color: #fff;

    .item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 50px;
      padding: 0 var(--page-padding-y);
      border-bottom: 1px solid #f7f8f9;

      .title {
        font-size: var(--font-size--large);
      }

      .value {
        display: flex;
        align-items: center;

        .avatar-box {
          display: flex;
          align-items: center;

          .avatar {
            width: 34px;
            height: 34px;
            border-radius: 50%;
          }

          .icon {
            margin-left: var(--grid-size);
          }
        }

        .text {
          color: var(--font-color-black-l2);
        }
      }

      &:last-child {
        border-bottom: none;
      }
    }
  }

  .logout {
    margin-top: calc(2 * var(--grid-size));
    .btn {
      border: none;
    }
  }
}
</style>
