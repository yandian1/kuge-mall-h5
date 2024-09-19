<template>
  <div class="page page-pad page-tabbar page-grey">
    <div class="countdown" v-if="OrderStatus.unPay.code === orderDetail.status">
      <div class="clock">
        <svg-icon icon="clock2" :size="18" color="#333"/>
        <span class="text">等待付款</span>
      </div>
      <div class="surplus">
        <span class="text">还剩</span>
        <van-count-down class="time" :time="orderDetail.surplus" format="HH时mm分ss秒" @finish="getOrderDetail"/>
        <span class="text">订单自动取消</span>
      </div>
    </div>

    <app-card class="address-card">
      <div class="addr">{{ orderDetail.receiverAddress }}</div>
      <div class="user">
        <span>{{ orderDetail.receiverName }}</span>
        <span class="ml-6">{{ orderDetail.receiverPhone }}</span>
      </div>
    </app-card>

    <order-shop class="shop-card" :data="orderDetail" row-gap="calc(6 * var(--grid-size))" divider>
      <template #header>
        <div class="shop-card__header">
          <div class="name">{{ orderDetail.shopName }}</div>
          <div class="status">{{ orderDetail.statusDesc }}</div>
        </div>
      </template>

      <template #orderGoods="{ orderGoods }">
        <order-goods :data="orderGoods"/>
        <div class="tips">
          <div
            class="tips-item"
            v-if="orderGoods.status === OrderStatus.afterSaleIng.code"
          >
            {{OrderStatus.afterSaleIng.msg}}
          </div>
          <div
            class="tips-item"
            v-if="orderGoods.status === OrderStatus.afterSaleRefunded.code"
          >
            {{OrderStatus.afterSaleRefunded.msg}}
          </div>
        </div>
        <div
          v-if="
            orderGoods.status === OrderStatus.unReceive.code
            || orderGoods.status === OrderStatus.received.code
            || orderGoods.status === OrderStatus.unSend.code
            || orderGoods.status === OrderStatus.completed.code
            || orderGoods.status === OrderStatus.afterSaleIng.code
          "
          class="order-goods-opt"
        >
          <div
            class="btn"
            v-if="orderGoods.status === OrderStatus.unReceive.code"
            @click="receiveGoods(orderGoods.id)"
          >
            确认收货
          </div>
          <div
            class="btn"
            v-if="orderGoods.status === OrderStatus.unReceive.code || orderGoods.status === OrderStatus.received.code || orderGoods.status === OrderStatus.afterSaleIng.code"
            @click="showToast('点击了查看物流')"
          >
            查看物流
          </div>
          <div
            class="btn"
            v-if="orderGoods.status === OrderStatus.unSend.code"
            @click="router.push({
              name: 'AfterSaleApply',
              query: { orderId: orderDetail.id, orderItemId: orderGoods.id, type: 1 },
            })"
          >
            申请退款
          </div>
          <div
            class="btn"
            v-if="orderGoods.status === OrderStatus.received.code"
            @click="router.push({
              name: 'AfterSaleApply',
              query: { orderId: orderDetail.id, orderItemId: orderGoods.id, type: 2 },
            })"
          >
            申请售后
          </div>
        </div>
      </template>
    </order-shop>

    <app-card class="cell-card">
      <div class="item">
        <div class="item-title">
          {{ OrderStatus.unPay.code === orderDetail.status ? '待付款' : '实付款' }}
        </div>
        <div class="item-value">
          <price :value="orderDetail.price" :size="14" :wave="false"/>
        </div>
      </div>
      <div class="item">
        <div class="item-title">订单编号</div>
        <div class="item-value">{{ orderDetail.sn }}</div>
      </div>
      <div class="item">
        <div class="item-title">下单时间</div>
        <div class="item-value">{{ orderDetail.createTime }}</div>
      </div>
    </app-card>

    <fix-bar v-if="OrderStatus.unPay.code === orderDetail.status">
      <div class="bottom-bar">
        <price :value="orderDetail.price" :size="20"/>
        <div class="btn" @click="router.push({name: 'Pay', query: {sn: orderDetail.sn}})">立即支付</div>
      </div>
    </fix-bar>
  </div>
</template>

<script setup lang="ts" name="OrderDetail">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { showToast, showConfirmDialog } from 'vant'
import { useAppStore } from "@/store/app"
import { OrderStatus } from "@/constant"
import * as orderApi from '@/api/order/order'
import * as OrderTypes from '@/api/order/order/types'
import * as orderItemApi from '@/api/order/orderItem'

const route = useRoute()
const router = useRouter()
const appStore = useAppStore()
const orderId = route.params.id as string
const orderDetail = ref({} as OrderTypes.OrderDetail)

const getOrderDetail = () => {
  console.log("getOrderDetail")
  return orderApi
    .getOrderDetail(orderId)
    .then((res) => {
      orderDetail.value = res.data.data
    })
    .catch(() => {
    })
}

const receiveGoods = (orderItemId: ID) => {
  showConfirmDialog({
    message: '您是否已收到该订单商品',
    cancelButtonText: '否',
    confirmButtonText: '是',
  })
    .then(() => {
      orderItemApi
        .receiveGoods(orderItemId)
        .then(() => {
          getOrderDetail()
        })
        .catch(() => {
        })
    })
    .catch(() => {
    })
}

const init = () => {
  console.log("init")
  appStore.pageSkeleton = true
  getOrderDetail().then(() => {
    appStore.pageSkeleton = false
  })
}

init()
</script>

<style lang="less" scoped>
.page {
  .countdown {
    padding-top: calc(3 * var(--grid-size));
    margin-bottom: calc(4 * var(--grid-size));
    text-align: center;

    .clock {
      .icon {
      }

      .text {
        margin-left: var(--grid-size);
        font-size: 18px;
      }
    }

    .surplus {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: var(--grid-size);

      .time {
        margin: 0 2px;
        color: var(--font-color-red);
      }
    }
  }

  .address-card {
    .add {
      font-size: var(--font-size--large);
    }

    .user {
      margin-top: calc(3 * var(--grid-size));
      color: #666;
    }
  }

  .shop-card {
    margin-top: calc(2 * var(--grid-size));

    &__header {
      display: flex;
      justify-content: space-between;
      .status {
        font-size: var(--font-size--small);
        color: var(--font-color-black-l2);
      }
    }

    .tips {
      margin-top: calc(5 * var(--grid-size));
      &-item {
        color: var(--font-color-red);
        font-size: var(--font-size--small);
      }
    }

    .order-goods-opt {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      margin-top: calc(5 * var(--grid-size));

      .btn {
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 70px;
        height: 24px;
        margin-right: calc(3 * var(--grid-size));
        color: var(--font-color-black-l2);
        border-radius: 24px;
        border: 1px solid var(--btn-border-color);
        &:last-child {
          margin-right: 0;
        }
      }
    }

  }

  .cell-card {
    margin-top: calc(2 * var(--grid-size));
  }

  :deep(.fix-bar) {
    background-color: #fff;

    .bottom-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 calc(2 * var(--grid-size));

      .btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 90px;
        height: 30px;
        border-radius: 15px;
        color: #fff;
        background-color: #ff0033;
      }
    }
  }
}
</style>
