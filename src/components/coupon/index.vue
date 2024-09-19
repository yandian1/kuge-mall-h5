<template>
  <van-popup v-model:show="show" round closeable position="bottom">
    <div class="body">
      <app-card class="coupon-card" v-for="(item, index) in list" :key="index" @click="clickRadio(item.memberCouponId)">
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
        <div class="right">
          <svg-icon
            :icon="id === item.memberCouponId ? 'selected' : 'circle'"
            :color="id === item.memberCouponId ? '#ff0033' : '#afafaf'"
            :size="18"
          />
        </div>
      </app-card>
    </div>

    <div class="footer">
      <van-button
        class="btn"
        type="primary"
        @click="submit"
        block
      >
        确定
      </van-button>
    </div>
  </van-popup>
</template>

<script setup lang="ts" name="Coupon">
import { CouponType } from "@/constant"
import * as OrderTypes from "@/api/order/order/types"

defineProps<{
  list: OrderTypes.CouponItem[]
}>()
const emits = defineEmits(['confirm'])
const id = defineModel<ID>('id')
const show = defineModel<boolean>('show')

const clickRadio = (curId: ID) => {
  if (curId === id.value) {
    id.value = ''
  } else {
    id.value = curId
  }
}

const submit = () => {
  emits('confirm', id.value)
}
</script>

<style lang="less" scoped>
.van-popup {
  display: flex;
  flex-direction: column;
  height: 60%;

  .body {
    flex: 1;
    padding: calc(4 * var(--grid-size)) 0;
    overflow-y: auto;

    .coupon-card {
      border-bottom: 1px solid #eee;
      margin-top: calc(2 * var(--grid-size));
      border-radius: 0;

      :deep(.card-content) {
        display: flex;
        align-items: center;

        .left {
          padding-left: calc(2 * var(--grid-size));

          .threshold {
            margin-top: calc(2 * var(--grid-size));
          }
        }

        .mid {
          flex: 1;
          margin: 0 20px;

          .name {
            font-size: 16px;
          }

          .type {
            margin-top: calc(2 * var(--grid-size));
          }

          .time {
            margin-top: calc(2 * var(--grid-size));
          }
        }

        .right {

        }
      }

      &:last-child {
        border: none;
      }
    }
  }

  .footer {
    padding-left: var(--card-padding-x);
    padding-right: var(--card-padding-x);
    padding-bottom: var(--bottom-button-offset);

    .btn {
      height: var(--action-button-height);
      border-radius: var(--action-button-radius);
    }
  }
}
</style>
