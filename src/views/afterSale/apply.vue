<template>
  <div class="page page-pad page-tabbar page-grey">

    <div class="body">
      <order-shop
        class="shop-card"
        :data="orderItem"
      >
        <template #header>
          {{ orderItem.shopName }}
        </template>
      </order-shop>

      <app-card class="cell-card">
        <div class="item">
          <div class="item-title">售后类型</div>
          <div class="item-value" @click="typePop.show = true">
            {{ params.type }}
            <svg-icon icon="more" color="#666"/>
          </div>
        </div>
        <div class="item">
          <div class="item-title">售后原因</div>
          <div class="item-value" @click="reasonPop.show = true">
            {{ params.reason }}
            <svg-icon icon="more" color="#666"/>
          </div>
        </div>
        <div class="item">
          <div class="item-title">退货数量</div>
          <div class="item-value">
            <input class="input" v-model="params.applyNum" placeholder="请输入商品数量"/>
          </div>
        </div>
      </app-card>
    </div>

    <div class="footer">
      <van-button
        class="btn"
        type="primary"
        loading-text="提交"
        :disabled="confirmLoading"
        :loading="confirmLoading"
        @click="applyAfterSale"
        block
      >
        提交
      </van-button>
    </div>

    <!--    <fix-bar>-->
    <!--      <div class="bottom-bar">-->
    <!--        <van-button-->
    <!--          class="submit"-->
    <!--          type="primary"-->
    <!--          loading-text="提交"-->
    <!--          :disabled="confirmLoading"-->
    <!--          :loading="confirmLoading"-->
    <!--          @click="applyAfterSale"-->
    <!--        >-->
    <!--          提交-->
    <!--        </van-button>-->
    <!--      </div>-->
    <!--    </fix-bar>-->

    <van-action-sheet v-model:show="typePop.show" :actions="typePop.opts" @select="selectType"/>

    <van-action-sheet v-model:show="reasonPop.show" :actions="reasonPop.opts" @select="selectReason"/>
  </div>
</template>

<script setup lang="ts" name="AfterSaleApply">
import { ref, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { showToast } from "vant"
import * as afterSaleApi from '@/api/order/afterSale'
import * as orderItemApi from '@/api/order/orderItem'
import * as OrderItemTypes from "@/api/order/orderItem/types"

const route = useRoute()
const router = useRouter()
const type = parseFloat(route.query.type as string)
const typeMap: Recordable = {
  1: '仅退款',
  2: '退货退款'
}
const confirmLoading = ref(false)
const orderItemId = route.query.orderItemId as string
const orderItem = ref({} as OrderItemTypes.OrderItem)
const params = reactive({
  orderItemId: orderItemId,
  applyNum: '1',
  type: typeMap[type],
  reason: '',
})
const typePop = reactive({
  show: false,
  opts: type === 1 ? [
    {
      name: '仅退款',
    },
  ] : [
    {
      name: '仅退款',
    },
    {
      name: '退款退货',
    },
  ]
})
const reasonPop = reactive({
  show: false,
  opts: [
    {
      name: '不想买了',
    },
    {
      name: '7天无理由退货',
    },
  ]
})

const selectType = (item: Recordable) => {
  typePop.show = false
  params.type = item.name
}


const selectReason = (item: Recordable) => {
  reasonPop.show = false
  params.reason = item.name
}

// 申请售后
const applyAfterSale = () => {
  if (!params.applyNum.trim()) {
    showToast({
      message: '请输入退货数量'
    })
    return
  }

  if (isNaN(parseFloat(params.applyNum))) {
    showToast({
      message: '退货数量请输入数字'
    })
    return
  }

  if (params.applyNum.includes(".")) {
    showToast({
      message: '退货数量请输入整数'
    })
    return
  }

  if (parseInt(params.applyNum) > orderItem.value.orderGoods.num) {
    showToast({
      message: '退货数量必须小于购物买商品数量'
    })
    return
  }

  if (!params.type) {
    showToast({
      message: '请选择售后类型'
    })
    return
  }

  if (!params.reason) {
    showToast({
      message: '请选择售后原因'
    })
    return
  }

  if (confirmLoading.value) return
  confirmLoading.value = true

  const { applyNum, ...others } = params
  afterSaleApi
    .applyAfterSale({
      ...others,
      applyNum: parseInt(params.applyNum)
    })
    .then((res) => {
      confirmLoading.value = false
      router.replace({ name: 'AfterSaleDetail', params: { id: res.data.data } })
    })
    .catch(() => {
      confirmLoading.value = false
    })
}

// 获取子订单详情
const getOrderItem = () => {
  orderItemApi
    .getOrderItem(orderItemId)
    .then((res) => {
      orderItem.value = res.data.data
    })
    .catch(() => {
    })
}

const init = () => {
  getOrderItem()
}

init()
</script>

<style lang="less" scoped>
.page {

  .cell-card {
    margin-top: calc(2 * var(--grid-size));

    .item {

      &-title {
      }

      &-value {
        display: flex;
        justify-content: flex-end;
        flex: 1;
      }
    }
  }

  .footer {
    position: fixed;
    z-index: 1;
    left: 0;
    right: 0;
    bottom: 0;
    padding: var(--page-padding-y) var(--page-padding-x);
    background-color: #fff;
    .btn {
      height: var(--action-button-height);
      border-radius: var(--action-button-radius);
      overflow: hidden;
    }
  }



  :deep(.fix-bar) {
    background-color: #fff;

    .bottom-bar {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding: 0 calc(2 * var(--grid-size));

      .submit {
        min-width: 65px;
        height: var(--action-button-height);
        border-radius: var(--action-button-radius);
      }
    }
  }
}
</style>
