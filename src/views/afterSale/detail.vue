<template>
  <div class="page page-pad page-grey">

    <app-card class="progress-card">
      <div class="status">{{ afterSale.statusDesc }}</div>
      <div class="steps">
        <div class="step" v-for="(step, index) in stepMap[afterSale.status]" :key="index">
          <div class="bar">
            <svg-icon icon="selected2" :size="12" color="#333" class="icon"/>
          </div>
          <div class="text">{{ step }}</div>
        </div>
      </div>
    </app-card>

    <order-shop
      class="shop-card"
      :data="afterSale"
    >
      <template #header>
        {{ afterSale.shopName }}
      </template>
    </order-shop>

    <app-card class="cell-card">
      <div class="item" v-if="afterSale.actualAmount">
        <div class="item-title">退款金额</div>
        <div class="item-value">
          <price :value="afterSale.actualAmount"/>
        </div>
      </div>
      <div class="item">
        <div class="item-title">售后类型</div>
        <div class="item-value">{{ afterSale.type }}</div>
      </div>
      <div class="item">
        <div class="item-title">售后原因</div>
        <div class="item-value">{{ afterSale.reason }}</div>
      </div>
      <div class="item">
        <div class="item-title">售后单号</div>
        <div class="item-value">{{ afterSale.sn }}</div>
      </div>
      <div class="item">
        <div class="item-title">退货数量</div>
        <div class="item-value">{{ afterSale.applyNum }}</div>
      </div>
    </app-card>
  </div>
</template>

<script setup lang="ts" name="AfterSaleDetail">
import { ref } from "vue"
import { useRoute } from 'vue-router'
import { AfterSaleStatus } from "@/constant"
import * as afterSaleApi from '@/api/order/afterSale'
import * as AfterSaleTypes from "@/api/order/afterSale/types"

const route = useRoute()
const afterSale = ref({} as AfterSaleTypes.AfterSale)
const stepMap = {
  [AfterSaleStatus.pending.code]: ['提交申请', '商家审核'],
  [AfterSaleStatus.refunding.code]: ['提交申请', '商家审核', '已同意','退款中'],
  [AfterSaleStatus.refunded.code]: ['提交申请', '商家审核', '已同意', '已退款'],
  [AfterSaleStatus.rejected.code]: ['提交申请', '商家审核', '未通过'],
  [AfterSaleStatus.cancelled.code]: ['提交申请', '商家审核', '已取消'],
}

const getAfterSale = () => {
  afterSaleApi
    .getAfterSale(route.params.id as string)
    .then((res) => {
      afterSale.value = res.data.data
    })
    .catch(() => {
    })
}

const init = () => {
  getAfterSale()
}

init()
</script>

<style lang="less" scoped>
.page {
  .progress-card {
    .status {
      font-size: var(--font-size--large);
    }

    .steps {
      display: flex;
      margin-top: calc(3 * var(--grid-size));

      .step {
        position: relative;
        width: 92px;
        margin-right: 0px;

        .bar {
          .icon {
            background-color: #fff;
          }
        }

        .text {
          margin-top: calc(2.5 * var(--grid-size));
          font-size: var(--font-size--small);
          color: var(--font-color-black-l2);
        }

        &:after {
          content: '';
          position: absolute;
          height: 1px;
          top: 7px;
          left: 10px;
          right: 0;
          background-color: #333;
        }

        &:last-child {
          width: auto;

          .text {
            color: var(--font-color-black-l1);
          }

          &:after {
            display: none;
          }
        }
      }
    }
  }

  .shop-card {
    margin-top: calc(2 * var(--grid-size));
  }

  .cell-card {
    margin-top: calc(2 * var(--grid-size));
  }
}
</style>
