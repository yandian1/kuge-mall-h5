<template>
  <div class="page page-pad page-tabbar page-grey">
    <app-card
      v-if="order.address"
      class="address-card"
      @click="router.push({name: 'AddressList', query: { id: order.address.id }})"
    >
      <div class="top">
        <div class="tag" v-if="order.address.isDefault">默认</div>
        <div class="text">{{ order.address.province + order.address.city + order.address.county }}</div>
      </div>
      <div class="mid">
        <span class="text">{{ order.address.detail }}</span>
        <svg-icon icon="more" color="#333" class="icon"/>
      </div>
      <div class="btm">
        <span>{{ order.address.name }}</span>
        <span class="ml-6">{{ order.address.phone }}</span>
      </div>
    </app-card>

    <order-shop
      v-for="(shopItem, shopIdx) in order.shopList"
      :key="shopIdx"
      :data="shopItem"
      class="shop-card"
    >
      <template #orderGoods="{ orderGoods }">
        <order-goods :data="orderGoods" />
        <div class="cell-card" v-if="orderGoods?.couponList?.length">
          <div class="item">
            <div class="item-title">优惠券</div>
            <div class="item-value" @click="openCoupon(orderGoods)">
              <template v-if="orderGoods.couponPrice > 0">
                <span style="color: var(--red)">-</span><price :value="orderGoods.couponPrice" :size="14" :wave="false"/>
              </template>
              <template v-else>
                <span style="color: var(--red)">{{ orderGoods.couponList.length }}</span>
                <span>张可用</span>
              </template>
            </div>
          </div>
        </div>
      </template>
    </order-shop>

    <app-card class="cell-card">
      <div class="item">
        <div class="item-title">商品金额</div>
        <div class="item-value">
          <price :value="order.goodsPrice" :size="14" :wave="false"/>
        </div>
      </div>
      <div class="item">
        <div class="item-title">运费</div>
        <div class="item-value">
          <price :value="order.deliveryPrice" :size="14" :wave="false"/>
        </div>
      </div>
      <div class="item">
        <div class="item-title">优惠</div>
        <div class="item-value">
          <span v-if="order.couponPrice" style="color: var(--red)">-</span><price :value="order.couponPrice" :size="14" :wave="false"/>
        </div>
      </div>
    </app-card>

    <app-card class="cell-card">
      <div class="item">
        <div class="item-title">发票</div>
        <div class="item-value" @click="showToast('敬请期待~')">
          <span>电子</span>
          <svg-icon icon="more" color="var(--font-color-black-l1)"/>
        </div>
      </div>
    </app-card>

    <app-card class="cell-card">
      <div class="item">
        <div class="item-title">留言</div>
        <div class="item-value">
          <app-input v-model="message" class="input" placeholder="选填，给商家留言" />
        </div>
      </div>
    </app-card>

    <fix-bar>
      <div class="settle-bar">
        <price :value="order.actualPrice" :size="20"/>
        <van-button
          class="btn"
          type="primary"
          loading-text="提交订单"
          :disabled="confirmLoading"
          :loading="confirmLoading"
          @click="createOrder"
        >
          提交订单
        </van-button>
      </div>
    </fix-bar>

    <coupon v-model:show="couponPop.show" :list="couponPop.opts" :id="couponPop.id" @confirm="selectCoupon"/>
  </div>
</template>

<script setup lang="ts" name="ConfirmOrder">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { showConfirmDialog, showToast } from 'vant'
import { useAppStore } from "@/store/app"
import { useOrderStore } from "@/store/order"
import { useLoading } from "@/hooks/loading"
import * as orderApi from '@/api/order/order/index'
import * as OrderTypes from '@/api/order/order/types'
import { useUserStore } from "@/store/user.ts";

type CouponItem = {
  skuId: ID
  memberCouponId: ID
}

const route = useRoute()
const router = useRouter()
const appStore = useAppStore()
const userStore = useUserStore()
const orderStore = useOrderStore()
const loadingInstance = useLoading()
const message = ref('')
const confirmLoading = ref(false)
const id = parseInt(route.query.id as string)
const num = parseInt(route.query.num as string)
const byCart = route.query.byCart as string === '1'
const couponList = [] as CouponItem[]
const order = ref<OrderTypes.ConfirmOrderInfo>({
  actualPrice: 0,
  goodsPrice: 0,
  couponPrice: 0,
  deliveryPrice: 0,
  shopList: [],
  address: {} as OrderTypes.Address
})
const couponPop = ref({
  show: false,
  opts: [] as OrderTypes.CouponItem[],
  skuId: '' as ID,
  id: '' as ID,
})

const getConfirmOrderInfo = () => {
  return orderApi
    .getConfirmOrderInfo({ id, num, byCart, addressId: orderStore.addressId, couponList })
    .then((res) => {
      const data = res.data.data
      order.value = data
      if (!data.address) {
        showConfirmDialog({
          message: '您没有添加地址，是否去添加？',
        })
          .then(() => {
            router.push({ name: 'AddressAdd' })
          })
          .catch(() => {
          })
      }
    })
    .catch((error) => {
      return Promise.reject(error)
    })
}

const createOrder = () => {
  if (!order.value.address?.id) {
    showConfirmDialog({
      message: '您没有添加地址，是否去添加？',
    })
      .then(() => {
        router.push({ name: 'AddressAdd' })
      })
      .catch(() => {
      })
    return
  }

  if (message.value?.length > 200) {
    showToast({
      message: '留言内容字数不能超过200个',
      type: 'fail'
    })
    return
  }

  const params = {
    byCart,
    addressId: order.value.address.id,
    shopList: order.value.shopList?.map((shop) => {
      return {
        id: shop.id,
        goodsList: shop.goodsList?.map((goods) => {
          return {
            spuId: goods.spuId,
            skuId: goods.skuId,
            skuNum: goods.num,
            memberCouponId: goods.memberCouponId
          }
        }),
      }
    }),
    message: message.value
  }

  if (confirmLoading.value) return
  confirmLoading.value = true
  
  orderApi
    .createOrder(params)
    .then((res) => {
      confirmLoading.value = false
      if (byCart) {
        userStore.getCartCount()
        router.replace({ name: 'Pay', query: { batchSn: res.data.data, from: 'confirmOrder' } })
      } else {
        router.push({ name: 'Pay', query: { batchSn: res.data.data, from: 'confirmOrder' } })
      }
    })
    .catch(() => {
      confirmLoading.value = false
    })
}

const openCoupon = (goods: OrderTypes.Goods) => {
  const couponItem = couponList.find(coupon => coupon.skuId === goods.skuId)
  // 已选中优惠券
  if (couponItem) {
    couponPop.value = {
      show: true,
      opts: goods.couponList,
      skuId: couponItem.skuId,
      id: couponItem.memberCouponId,
    }
  } else {
    // 未选中优惠券
    couponPop.value = {
      show: true,
      opts: goods.couponList,
      skuId: goods.skuId,
      id: '',
    }
  }
}

const selectCoupon = (id: ID) => {
  couponPop.value.show = false
  if (id === '') {
    // 取消
    const index = couponList.findIndex(coupon => coupon.skuId === couponPop.value.skuId);
    couponList.splice(index, 1);
  } else {
    // 选中
    couponList.push({
      skuId: couponPop.value.skuId,
      memberCouponId: id
    })
  }
  if (loadingInstance.isLoading()) return

  loadingInstance.loading()
  getConfirmOrderInfo()
    .then(() => {
      loadingInstance.clear()
    })
    .catch(() => {
      loadingInstance.clear()
    })
}

const init = () => {
  appStore.pageSkeleton = true
  getConfirmOrderInfo()
    .then(() => {
      appStore.pageSkeleton = false
    })
    .catch(() => {
      appStore.pageSkeleton = false
    })
}

init()
</script>

<style lang="less" scoped>
.page {
  .address-card {
    .top {
      display: flex;
      align-items: center;

      .tag {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 20px;
        margin-right: var(--grid-size);
        border-radius: 6px;
        background-color: var(--font-color-red);
        font-size: 12px;
        color: #fff;
      }

      .text {
        color: #666;
      }
    }

    .mid {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: calc(2 * var(--grid-size));

      .text {
        color: var(--font-color-black-l1);
        font-size: var(--font-size--large);
      }
    }

    .btm {
      margin-top: calc(2 * var(--grid-size));
      color: #666;
    }
  }

  .shop-card {
    margin-top: calc(2 * var(--grid-size));
    .cell-card {
      margin-top: calc(5 * var(--grid-size));
    }
  }

  .cell-card {
    margin-top: calc(2 * var(--grid-size));
    .input {
      :deep(input) {
        text-align: right;
        ::placeholder {
          text-align: right;
        }
      }
    }
  }

  :deep(.fix-bar) {
    padding: 0 var(--page-padding-x);
    background-color: #fff;

    .settle-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .btn {
        min-width: 90px;
        height: var(--action-button-height);
        border-radius: var(--action-button-radius);
      }
    }
  }
}
</style>
