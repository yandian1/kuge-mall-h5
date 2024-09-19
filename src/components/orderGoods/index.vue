<template>
  <div class="order-goods">
    <slot name="img">
      <app-image class="img" :src="data.img" :preview="preview"/>
    </slot>
    <div class="text">
      <div class="top">
        <div class="name van-multi-ellipsis--l2">
          <slot name="name">
            {{ data.name }}
          </slot>
        </div>
<!--        <div class="status">{{data.statusDesc}}</div>-->
      </div>
        <div class="attr van-multi-ellipsis--l2" style="-webkit-line-clamp: 1">
          <slot name="attr">
            {{ data.attrs }}
          </slot>
        </div>
      <div class="btm">
        <price :value="data.price" :size="17"/>
        <slot name="num">
          <div class="num">x{{ data.num }}</div>
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="OrderGoods">
withDefaults(
  defineProps<{
    data: Recordable
    preview?: boolean
  }>(),
  {
    data: () => ({}),
    preview: false
  }
)
</script>

<style lang="less" scoped>
.order-goods {
  display: flex;

  .img {
    width: 80px;
    height: 80px;
    vertical-align: middle;
    border-radius: 6px;
    overflow: hidden;
  }

  .text {
    display: flex;
    flex-direction: column;
    flex: 1;
    margin-left: calc(2.5 * var(--grid-size));

    .top {
      display: flex;
      justify-content: space-between;
      .name {
        flex: 1;
        line-height: var(--line-height-default);
      }
    }

    .attr {
      margin-top: calc(1.5 * var(--grid-size));
      font-size: var(--font-size--small);
      color: var(--font-color-black-l3);
      line-height: var(--line-height-default);
    }

    .btm {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      margin-top: auto;

      .num {
        color: var(--font-color-black-l2);
      }
    }
  }
}
</style>