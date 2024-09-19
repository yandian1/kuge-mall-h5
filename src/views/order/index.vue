<template>
  <div class="page page-grey">
    <div class="header">
      <app-search placeholder="请输入商品名称" v-model="params.goodsName" @search="search" />

      <div class="tabs">
        <div
          v-for="(status, index) in statusOpts"
          :key="index"
          :class="{
            tab: true,
            'tab-active': activeStatus === status.value
          }"
          @click="changeStatus(status.value)"
        >
          {{ status.label }}
        </div>
      </div>
    </div>

    <div class="body">
      <app-list :list-api="orderApi.getOrderPage" :params="params" ref="listRef">
        <template #item="{ item: order }">
          <order-shop
            class="shop-card"
            :data="order"
            @click="router.push({name: 'OrderDetail', params: { id: order.id }})"
          >
            <template #header>
              <div class="shop-card__header">
                <div class="name">{{ order.shopName }}</div>
                <div class="countdown" v-if="order.surplus > 0">
                  <span>等待付款：</span>
                  <van-count-down class="time" :time="order.surplus" format="HH时mm分ss秒" @finish="finishHandler"/>
                </div>
                <div v-else class="status">{{ order.statusDesc }}</div>
              </div>
            </template>

            <template #orderGoods="{ orderGoods }">
              <order-goods :data="orderGoods">
                <template #name>
                  <van-highlight :keywords="params.goodsName" :source-string="orderGoods.name" />
                </template>
              </order-goods>
            </template>

            <template #footer>
              <div
                v-if="
                  order.status === OrderStatus.unPay.code
                "
                class="shop-card__footer"
              >
                <div v-if="order.status === OrderStatus.unPay.code" class="btn" @click.stop="cancelOrder(order.id)">
                  取消订单
                </div>
                <div class="btn" v-if="order.status === OrderStatus.unPay.code" @click.stop="router.push({name: 'Pay', query: {sn: order.sn}})">
                  去支付
                </div>
              </div>
            </template>
          </order-shop>
        </template>
      </app-list>

      <back-top />
    </div>
  </div>
</template>

<script setup lang="ts" name="OrderList">
import { ref, reactive, onMounted } from 'vue'
import { showConfirmDialog } from "vant"
import { useRoute, useRouter } from "vue-router"
import { useAppStore } from "@/store/app"
import { OrderStatus } from '@/constant'
import * as orderApi from '@/api/order/order'

const route = useRoute()
const router = useRouter()
const appStore = useAppStore()
const listRef = ref()
const activeStatus = ref(route.query.status as string)
const params = reactive({
  goodsName: '',
  status: activeStatus.value,
})
const statusOpts = [
  {
    label: '全部',
    value: '',
  },
  {
    label: '待支付',
    value: OrderStatus.unPay.code,
  },
  {
    label: '待发货',
    value: OrderStatus.unSend.code,
  },
  {
    label: '待收货',
    value: OrderStatus.unReceive.code,
  },
]

const cancelOrder = (id: ID) => {
  showConfirmDialog({
    message: '确认要取消订单吗？',
    cancelButtonText: '我再想想',
    confirmButtonText: '取消订单',
  })
    .then(() => {
      orderApi
        .cancelOrder(id)
        .then(() => {
          listRef.value.startOnFirstPage()
        })
        .catch(() => {
        })
    })
    .catch(() => {
    })
}

const search = () => {
  listRef.value.startOnFirstPage()
}

const changeStatus = (status: string) => {
  activeStatus.value = status
  params.status = status
  listRef.value.startOnFirstPage()
}

const finishHandler = () => {
  listRef.value.fetchList()
}

const init = () => {
  appStore.pageSkeleton = true
  listRef.value.fetchList().then(() => {
    appStore.pageSkeleton = false
  })
}

onMounted(() => {
  init()
})
</script>

<style lang="less" scoped>
.page {

  .header {
    position: sticky;
    top: 0;
    z-index: 1;
    padding: var(--page-padding-y);
    background-color: #fff;

    :deep(.app-search) {
      background-color: var(--grey);
      .input {
        background-color: var(--grey);
      }
    }

    .tabs {
      display: flex;
      justify-content: space-between;
      padding: 0 calc(var(--page-padding-y));
      margin-top: calc(var(--page-padding-y) + calc(1.5 * var(--grid-size)));

      .tab {
        display: flex;
        align-items: center;
        color: var(--font-color-black-l2);

        &-active {
          color: var(--font-color-red);
        }
      }
    }
  }

  .body {
    padding: var(--page-padding-x);

    .shop-card {
      margin-bottom: var(--page-padding-x);

      &__header {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .countdown {
          display: flex;
          padding: 4px 6px;
          border-radius: 10px;
          background-color: #ffbfcc;
          color: var(--font-color-red);
          font-size: var(--font-size--small);

          .time {
            line-height: 1;
            color: var(--font-color-red);
            font-size: 12px;
          }
        }

        .status {
          font-size: var(--font-size--small);
          color: var(--font-color-black-l2);
        }
      }

      &__footer {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding-top: calc(2 * var(--grid-size));

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

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}
</style>
