<template>
  <div class="page page-grey">
    <div class="header">
      <div class="tabs">
        <div
          v-for="(status, index) in statusOpts"
          :key="index"
          :class="{
            tab: true,
            'tab-active': params.status === status.value
          }"
          @click="changeStatus(status.value)"
        >
          {{ status.label }}
        </div>
      </div>
    </div>

    <div class="body">
      <app-list :list-api="memberCouponApi.getMemberCouponPage" :params="params" ref="listRef">
        <template #item="{ item }">
          <app-card class="coupon-card">
            <div class="left">
              <template v-if="item.type === CouponType.deduct.code">
                <price :value="item.deduct" :size="30" :decimal="0"/>
              </template>
              <template v-else>{{ item.discount }}</template>
              <div class="threshold">
                {{ item.threshold ? `满${item.threshold}元可用` : '无门槛' }}
              </div>
            </div>
            <div class="mid">
              <div class="name">{{ item.name }}</div>
              <div class="type">{{ item.typeDesc }}</div>
              <div class="time">{{ item.startTime?.slice(0, 10) }} - {{ item.endTime?.slice(0, 10) }}</div>
            </div>
            <van-button
              v-if="params.status === 'unUse'"
              class="right"
              type="primary"
              @click="router.push({name: 'SearchResult', query: {coupId: item.id}})"
            >
              去使用
            </van-button>
          </app-card>
        </template>
      </app-list>
    </div>
  </div>
</template>

<script setup lang="ts" name="CouponList">
import { onMounted, reactive, ref } from "vue"
import { useRouter } from "vue-router"
import * as memberCouponApi from '@/api/member/memberCoupon'
import { CouponType } from "@/constant"


const router = useRouter()
const statusOpts = [
  {
    label: '待使用',
    value: 'unUse',
  },
  {
    label: '已使用',
    value: 'used',
  },
  {
    label: '已过期',
    value: 'expired',
  },
]
const params = reactive({
  status: 'unUse',
})
const listRef = ref()

const changeStatus = (status: string) => {
  params.status = status
  listRef.value.startOnFirstPage()
}

const init = () => {
  listRef.value.init()
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
    padding: calc(1.5 * var(--page-padding-y)) var(--page-padding-x);
    background-color: #fff;

    .tabs {
      display: flex;
      justify-content: space-between;
      padding: 0 var(--card-padding-x);

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

    .coupon-card {
      margin-bottom: var(--page-padding-x);

      :deep(.card-content) {
        display: flex;
        align-items: center;

        .left {
          width: 90px;
          text-align: center;

          .threshold {
            margin-top: calc(2 * var(--grid-size));
          }
        }

        .mid {
          flex: 1;
          margin: 0 10px;

          .name {
            font-size: 18px;
          }

          .type {
            margin-top: calc(2.5 * var(--grid-size));
            color: var(--font-color-black-l2);
          }

          .time {
            margin-top: calc(2.5 * var(--grid-size));
            color: var(--font-color-black-l2);
            font-size: var(--font-size--small);
          }
        }

        .right {
          padding: 0;
          width: 54px;
          height: 24px;
          border-radius: 24px;
          font-size: var(--font-size--small);
        }
      }

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}
</style>
