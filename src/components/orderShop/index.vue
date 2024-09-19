<template>
  <app-card>
    <template #header>
      <slot name="header" :title="data.name">{{ data.name }}</slot>
    </template>

    <div
      v-for="(orderGoods, index) in orderGoodsList"
      :key="index"
      :class="{
        'order-shop-goods': true,
        'van-hairline--bottom': divider && (index !== orderGoodsList.length - 1),
        'order-shop-goods--divider': divider,
      }"
    >
      <slot
        name="orderGoods"
        :orderGoods="orderGoods"
        :index="index"
      >
        <order-goods :data="orderGoods"/>
      </slot>
    </div>

    <template #footer>
      <slot name="footer" />
    </template>
  </app-card>
</template>

<script setup lang="ts" name="OrderShop">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    data: Recordable
    rowGap?: string
    divider?: false
  }>(),
  {
    data: () => ({}),
    rowGap: 'calc(5 * var(--grid-size))',
    divider: false
  }
)

const orderGoodsList = computed(() => {
  if (props.data.orderGoods && Object.keys(props.data.orderGoods).length) {
    return [props.data.orderGoods]
  }
  return props.data.goodsList || props.data.orderItems || []
})
</script>

<style lang="less" scoped>
.order-shop-goods {
  margin-bottom: v-bind(rowGap);
  &:last-child {
    padding-bottom: 0;
    margin-bottom: 0;
    border-bottom: none;
  }
  &--divider {
    padding-bottom: v-bind(rowGap);
  }
}
</style>