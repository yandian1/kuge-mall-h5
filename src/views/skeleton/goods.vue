<template>
  <div class="page page-grey">

    <div class="header">
      <skeleton-item class="album"/>
      <div class="indicator"></div>
    </div>

    <div class="content">
      <skeleton-item class="price"/>
      <skeleton-item class="name"/>

      <skeleton-cell-card class="info" :size="2" />

      <skeleton-card class="detail">
        <skeleton-list>
          <skeleton-item class="item" v-for="item in 6" :key="item"/>
        </skeleton-list>
      </skeleton-card>
    </div>

    <fix-bar>
      <div class="bottom-bar">
        <div class="left">
          <skeleton-item class="item" v-for="item in 3" :key="item"/>
        </div>
        <div class="right">
          <skeleton-item class="item" v-for="item in 2" :key="item"/>
        </div>
      </div>
    </fix-bar>
  </div>
</template>

<script setup lang="ts" name="Goods">
//
</script>

<style lang="less" scoped>
.page {
  height: 100vh;
  overflow: hidden;

  .header {
    position: relative;

    .album {
      height: 100vw;
    }

    .indicator {
      position: absolute;
      right: calc(4 * var(--grid-size));
      bottom: calc(4 * var(--grid-size));
      width: 30px;
      height: var(--skeleton-height);
      border-radius: 20px;
      background-color: #fff;
    }
  }

  .content {
    margin-top: calc(5 * var(--grid-size));
    margin-left: var(--page-padding-x);
    margin-right: var(--page-padding-x);

    .price {
      width: 40%;
      margin-bottom: var(--skeleton-row-gap);
    }

    .name {
      width: 80%;
    }

    .info {
      margin-top: calc(4 * var(--grid-size));
    }

    .detail {
      margin-top: calc(4 * var(--grid-size));
      .item:first-child {
        width: 40%;
        margin: 0 auto;
      }
    }
  }

  :deep(.fix-bar) {
    border-top: 1px solid #f7f8f9;
    background-color: #fff;

    .bottom-bar {
      display: flex;
      justify-content: space-between;
      margin: 0 calc(2 * var(--grid-size));

      .left {
        display: flex;
        .item {
          height: 20px;
          width: 40px;
          margin-right: 10px;
          border-radius: 20px;
          &:last-child {
            margin-right: 0;
          }
        }
      }

      .right {
        display: flex;
        .item {
          height: 20px;
          width: 90px;
          border-radius: 20px;
          margin-right: 10px;
          &:last-child {
            margin-right: 0;
          }
        }
      }
    }
  }
}
</style>
