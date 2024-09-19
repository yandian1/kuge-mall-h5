<template>
  <div class="page page-pad page-grey">
    <div class="header">
      <app-image :src="avatar" radius="50%" class="avatar"/>
      <div class="text">
        <div class="name">{{ userStore.user.account }}</div>
      </div>
      <div class="config">
        <svg-icon icon="config" :size="18" color="#fff" @click="userStore.token ? router.push({name: 'Profile'}) : router.push({name: 'Login'})"/>
      </div>
    </div>

    <app-card class="order-card" title="我的订单" more-text="全部" :click-more="clickMore">
      <div class="list">
        <div v-for="opts in orderOpts" @click="clickOrderOpts(opts)">
          <template v-if="opts.icon === 'unPay'">
            <van-badge :content="unPayCount" v-if="unPayCount">
              <svg-icon :icon="opts.icon" :size="18" color="#333"/>
            </van-badge>
            <svg-icon v-else :icon="opts.icon" :size="18" color="#333"/>
          </template>

          <svg-icon v-else :icon="opts.icon" :size="18" color="#333"/>

          <div class="text">{{ opts.text }}</div>
        </div>
      </div>
    </app-card>

    <app-card class="cell-card cell-card__left-primary">
      <div class="item" v-for="(opt, idx) in manageOpts" :key="idx" @click="clickManageOpt(opt)">
        <div class="item-title">{{ opt.text }}</div>
        <div class="item-value">
          <svg-icon icon="more" color="#999"/>
        </div>
      </div>
    </app-card>
  </div>
</template>

<script setup lang="ts" name="My">
import { ref, onActivated } from "vue"
import { showToast } from "vant"
import { useRouter } from "vue-router"
import { useUserStore } from '@/store/user'
import * as orderApi from '@/api/order/order'
import { OrderStatus } from "@/constant"
import avatar from '@/assets/img/my/avatar.png'

const router = useRouter();
const userStore = useUserStore()
const unPayCount = ref(0)
const orderOpts = [
  {
    icon: 'unPay',
    text: '待支付',
    url: '/order/list?status=' + OrderStatus.unPay.code
  },
  {
    icon: 'unSend',
    text: '待发货',
    url: '/order/list?status=' + OrderStatus.unSend.code
  },
  {
    icon: 'unReceive',
    text: '待收货',
    url: '/order/list?status=' + OrderStatus.unReceive.code
  },
  {
    icon: 'afterSale',
    text: '售后',
    url: '/afterSale/list?status='
  },
]
const manageOpts = [
  {
    text: '地址管理',
    url: '/address/list',
  },
  {
    text: '优惠券',
    url: '/coupon/list',
  },
  {
    text: '发票管理',
    url: '',
  },
  {
    text: '意见反馈',
    url: '',
  },
]

const getUnPayCount = () => {
  return orderApi
    .getUnPayCount()
    .then((res) => {
      unPayCount.value = res.data.data
    })
    .catch(() => {
    })
}

const clickOrderOpts = (opts: Recordable) => {
  if (!userStore.token) {
    router.push({name: 'Login'})
    return
  }

  router.push(opts.url)
}

const clickMore = () => {
  userStore.token ? router.push('/order/list?status=') : router.push({name: 'Login'})
}

const clickManageOpt = (opt: Recordable) => {
  if (!userStore.token) {
    router.push({name: 'Login'})
    return
  }
  if (opt.url) {
    router.push(opt.url)
  } else {
    showToast('敬请期待~')
  }
}

onActivated(() => {
  if (userStore.token) {
    getUnPayCount()
  }
})
</script>

<style lang="less" scoped>
.page {
  background: var(--page-grey) url("@/assets/img/my/my-bg.png") no-repeat center top / 100% 160px;

  .header {
    display: flex;
    padding-top: var(--grid-size);

    .avatar {
      width: 60px;
      height: 60px;
      border-radius: 50%;
    }

    .text {
      display: flex;
      align-items: center;
      margin-left: calc(2 * var(--grid-size));

      .name {
        font-size: 16px;
        color: #fff;
      }
    }

    .config {
      display: flex;
      align-items: center;
      margin-left: auto;
    }
  }

  .order-card {
    margin-top: calc(5 * var(--grid-size));

    .list {
      display: flex;
      justify-content: space-between;
      text-align: center;
      margin-top: calc(5 * var(--grid-size));

      .text {
        margin-top: calc(2 * var(--grid-size));
      }
    }
  }

  .cell-card {
    margin-top: calc(4 * var(--grid-size));

    .item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 0;

      &:first-child {
        padding-top: 0;
      }

      &:last-child {
        padding-bottom: 0;
      }
    }
  }
}
</style>
