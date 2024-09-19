<template>
  <div class="page page-pad page-grey page-tabbar">
    <skeleton-item class="search"/>

    <skeleton-item class="banner"/>

    <div class="grid">
      <div class="grid-item" v-for="item in 8" :key="item">
        <skeleton-item class="icon"/>
        <skeleton-item class="text"/>
      </div>
    </div>

    <skeleton-item class="seckill"/>

    <div class="goods-tabs">
      <div class="goods-tabs__header">
        <div class="title">
          <skeleton-item class="item" v-for="item in 4" :key="item"/>
        </div>
        <div class="sub-title">
          <skeleton-item class="item" v-for="item in 4" :key="item"/>
        </div>
      </div>
      <div class="goods-tabs__body">
        <skeleton-item class="item" v-for="item in 8" :key="item"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="Home">
//
</script>

<style lang="less" scoped>
.page {
  height: 100vh;
  overflow: hidden;
  background: none !important;

  .search {
    height: var(--search-height);
    border-radius: 30px;
  }

  .banner {
    height: 180px;
    border-radius: var(--card-border-radius);
    margin-top: calc(3.5 * var(--grid-size));
  }

  .grid {
    margin-top: calc(6.8 * var(--grid-size));
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-column-gap: 18px;
    grid-row-gap: 22px;
    justify-items: center;

    &-item {
      .icon {
        height: 40px;
        width: 40px;
        border-radius: 50%;
      }
      .text {
        margin-top: calc(1.9 * var(--grid-size));
        height: calc(3.3 * var(--grid-size));
      }
    }
  }

  .seckill {
    height: 110px;
    border-radius: var(--card-border-radius);
    margin-top: calc(6 * var(--grid-size));
  }

  .goods-tabs {
    margin-top: calc(6 * var(--grid-size));

    &__header {
      .title {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-column-gap: 20px;

        .item {
          //height: 16px;
          //border-radius: 20px;
        }
      }

      .sub-title {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-column-gap: 20px;
        margin-top: calc(2 * var(--grid-size));

        .item {
          //height: 14px;
          //border-radius: 15px;
        }
      }
    }

    &__body {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-column-gap: 6px;
      grid-row-gap: 6px;
      margin-top: calc(3 * var(--grid-size));

      .item {
        height: 192px;
        border-radius: var(--card-border-radius);
      }
    }
  }
}
</style>
