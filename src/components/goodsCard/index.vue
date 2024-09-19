<template>
  <div class="goods">
    <app-image :src="goods.firstImg" class="img" :ratio="0.85" fit="cover"/>
    <div class="text">
      <div class="name van-multi-ellipsis--l2">
        <slot name="name">
          {{ goods.name }}
        </slot>
      </div>
      <div class="price">
        <price :value="goods.price" :size="17" />
        <price :value="goods.linePrice" :size="12" line-through class="ml-6" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="GoodsCard">
type Goods = {
  firstImg: string
  name: string
  price: string
  linePrice: string
}

withDefaults(
  defineProps<{
    goods: Goods
  }>(),
  {
    goods: () => ({} as Goods),
  }
)
</script>

<style lang="less" scoped>
.goods {
  background-color: #fff;
  border-radius: 4px;
  overflow: hidden;

  .img {
    display: block;
    width: 100%;
    //height: 300px;
  }

  .text {
    padding: calc(3 * var(--grid-size)) calc(2 * var(--grid-size));

    .name {
      margin-bottom: calc(1 * var(--grid-size));
      line-height: var(--line-height-default);
    }
  }
}
</style>
