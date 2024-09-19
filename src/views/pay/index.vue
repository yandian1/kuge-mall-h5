<template>
  <div class="page page-pad page-grey">
    <div class="price">
      <price :value="preInfo.price" :size="24"/>
    </div>

    <app-card class="pay-card">
      <div class="item" v-for="(opt, idx) in payOpts" :key="idx" @click="payType = opt.val">
        <div class="item-title">
          <svg-icon :icon="opt.icon" :size="18"/>
          <div class="text">{{ opt.text }}</div>
        </div>
        <div class="item-value">
          <svg-icon
            :icon="opt.val === payType ? 'selected' : 'circle'"
            :color="opt.val === payType ? '#ff0033' : '#afafaf'"
            :size="18"
          />
        </div>
      </div>
    </app-card>

    <van-button
      class="confirm safe-padding-bottom"
      type="primary"
      loading-text="确认付款"
      :disabled="confirmLoading"
      :loading="confirmLoading"
      @click="confirm"
    >
      确认付款
    </van-button>

    <van-popup :show="qrcShow" class="qrc-pop" round>
      <div>
        <van-loading v-if="qrcLoading"/>
        <template v-else-if="codeUrl">
          <qrcode-vue :value="codeUrl" :size="200"/>
          <div class="text">请使用微信扫码支付</div>
        </template>
      </div>
    </van-popup>

    <van-dialog
      v-model:show="interceptor.show"
      title="确认要离开收银台?"
      cancel-button-text="继续支付"
      confirm-button-text="确认离开"
      show-cancel-button
      :close-on-popstate="false"
      :before-close="beforeDialogClose"
    >
      <div style="padding: 16px 20px; line-height: 1.7">您的订单在30分钟内未支付将被取消，请尽快完成支付</div>
    </van-dialog>
  </div>
</template>

<script setup lang="ts" name="Pay">
import { ref, reactive, onUnmounted } from 'vue'
import { useRoute, useRouter, onBeforeRouteLeave } from 'vue-router'
import { showToast } from 'vant'
import * as payApi from '@/api/order/pay/index'
import { PayStatus } from '@/constant'
import QrcodeVue from 'qrcode.vue'

const route = useRoute()
const router = useRouter()
const sn = route.query.sn as string
const batchSn = route.query.batchSn as string
const from = route.query.from as string
const codeUrl = ref('')
const preInfo = ref({
  price: undefined as unknown as number,
})
const payType = ref(1)
let timer: NodeJS.Timeout
const qrcShow = ref(false)
const qrcLoading = ref(false)
const confirmLoading = ref(false)
const payOpts = [
  {
    text: '微信支付',
    icon: 'wx',
    val: 1,
  },
  // {
  //   text: '支付宝支付',
  //   icon: 'zfb',
  //   val: 2,
  // },
]
const interceptor = reactive({
  show: false,
  canLeave: true
})

const getPreInfo = () => {
  return payApi
    .getPreInfo({ batchSn, sn })
    .then((res) => {
      preInfo.value = res.data.data
      interceptor.canLeave = false
    })
    .catch(() => {
    })
}

const getCodeUrl = () => {
  return payApi
    .getCodeUrl({ batchSn, sn, payType: payType.value })
    .then((res) => {
      codeUrl.value = res.data.data
      pollingPayStatus()
    })
    .catch(() => {
    })
}

// 获取订单状态
const getPayStatus = () => {
  payApi
    .getPayStatus({batchSn, sn})
    .then((res) => {
      // 如果不是未支付状态，取消轮询
      const data = res.data.data
      if (PayStatus.unPay.code !== data) {
        paySuccessHandler(data)
      }
    })
    .catch(() => {
    })
}

const confirm = () => {
  qrcShow.value = true
  qrcLoading.value = true
  interceptor.canLeave = true
  getCodeUrl().then(() => {
    qrcLoading.value = false
  })
}

// 轮询订单状态
const pollingPayStatus = () => {
  timer = setInterval(() => {
    getPayStatus()
  }, 3000)
}

const paySuccessHandler = (data: string) => {
  clearInterval(timer)
  switch (data) {
    case PayStatus.refunded.code:
      showToast({
        message: '已退款',
        type: 'fail',
      })
      break
    case PayStatus.paid.code:
      showToast({
        message: '支付成功',
        type: 'success',
      })
      router.replace({ name: 'PayResult', query: { batchSn, sn } })
      break
    case PayStatus.closed.code:
      showToast({
        message: '已关闭',
        type: 'fail',
      })
      break
  }
  qrcShow.value = false
}


const beforeDialogClose = (action: string) => {
  interceptor.show = false

  // 确认离开
  if (action === 'confirm') {
    interceptor.canLeave = true
    router.replace({ name: 'OrderList', query: { status: '' } })
    return
  }

  // 继续支付
  if (action === 'cancel') {
    interceptor.canLeave = false
  }
}

onBeforeRouteLeave(() => {
  if (from !== 'confirmOrder') return true

  if (interceptor.canLeave) {
    return true
  } else {
    interceptor.show = true
    return false
  }
})

onUnmounted(() => {
  clearInterval(timer)
})

const init = () => {
  getPreInfo()
}

init()
</script>

<style lang="less" scoped>
.page {
  .price {
    padding-top: calc(6 * var(--grid-size));
    text-align: center;
  }

  .pay-card {
    margin-top: calc(9 * var(--grid-size));

    .item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 0;
      border-bottom: 1px solid #f7f8f9;

      &-title {
        display: flex;
        align-items: center;

        .text {
          margin-left: calc(2 * var(--grid-size));
          color: #666;
        }
      }

      &-value {
        display: flex;

        .icon {
          margin-left: var(--grid-size);
        }
      }

      &:first-child {
        padding-top: 0;
      }

      &:last-child {
        padding-bottom: 0;
        border-bottom: none;
      }
    }
  }

  .confirm {
    position: fixed;
    z-index: 1;
    left: var(--page-padding-x);
    right: var(--page-padding-x);
    bottom: var(--bottom-button-offset);
    height: var(--action-button-height);
    border-radius: var(--action-button-radius);
  }

  .qrc-pop {
    display: flex;
    align-items: center;
    justify-content: center;
    width: calc(200px + calc(8 * var(--grid-size)));
    height: calc(200px + calc(18 * var(--grid-size)));
    padding: calc(5 * var(--grid-size)) calc(4 * var(--grid-size));
    vertical-align: middle;

    .text {
      margin-top: calc(4 * var(--grid-size));
      line-height: 1;
      text-align: center;
      font-size: var(--font-size--default);
      color: var(--font-color-default);
    }
  }
}
</style>
