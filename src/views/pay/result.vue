<template>
  <div class="page page-pad">
    <div class="info">
      <div class="left">
        <div class="status">付款成功</div>
        <div class="amount">实付：{{ payResult.amount }}</div>
        <div class="type">微信支付</div>
        <div class="btn" @click="router.replace({name: 'OrderList'})">查看订单</div>
      </div>
      <div class="right">
        <div class="status">完成</div>
        <svg-icon icon="selected2" color="#fff" :size="24"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="PayResult">
import { ref } from "vue"
import { useRoute, useRouter } from 'vue-router'
import { useAppStore } from "@/store/app"
import * as payApi from '@/api/order/pay/index'

const route = useRoute()
const router = useRouter()
const appStore = useAppStore()
const sn = route.query.sn as string
const batchSn = route.query.batchSn as string
const payResult = ref({
  payStatus: '',
  amount: 0,
})

const getPayResult = () => {
  return payApi
    .getPayResult({ batchSn, sn }, { showError: false })
    .then((res) => {
      payResult.value = res.data.data
    })
    .catch((error) => {
      return Promise.reject(error)
    })
}

const init = () => {
  getPayResult().catch((error) => {
    appStore.pageError = error.data.msg
  })
}

init()
</script>

<style lang="less" scoped>
.page {
  background-color: #ff0033;

  div {
    color: #fff;
  }

  .info {
    display: flex;
    justify-content: space-between;
    width: 216px;
    margin: 0 auto;
    padding-top: calc(7 * var(--grid-size));

    .left {
      .status {
        font-size: 20px;
      }

      .amount {
        margin-top: calc(2 * var(--grid-size));
      }

      .type {
        margin-top: calc(2 * var(--grid-size));
      }

      .btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 90px;
        height: var(--action-button-height);
        border-radius: var(--action-button-radius);
        border: 1px solid #fff;
        margin-top: calc(3 * var(--grid-size));
      }
    }

    .right {
      text-align: center;

      .status {
        margin-bottom: calc(2 * var(--grid-size));
        font-size: 18px;
      }
    }
  }
}
</style>
