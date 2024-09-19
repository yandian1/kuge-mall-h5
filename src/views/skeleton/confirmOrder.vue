<template>
  <div class="page page-pad page-grey">
    <skeleton-card-list>
      <skeleton-card class="address-card">
        <skeleton-list>
          <skeleton-item class="top"/>
          <skeleton-item class="mid"/>
          <skeleton-item class="btm"/>
        </skeleton-list>
        <skeleton-item class="rgt"/>
      </skeleton-card>

      <skeleton-card class="shop-card">
        <skeleton-item class="shop-card__title"/>
        <div class="shop-card__content" v-for="item in 2" :key="item">
          <skeleton-item class="content-a"/>
          <skeleton-item class="content-b"/>
          <skeleton-item class="content-c"/>
          <skeleton-item class="content-d"/>
        </div>
      </skeleton-card>

      <skeleton-card class="cell-card">
        <div class="row" v-for="item in 3" :key="item">
          <skeleton-item class="row-title"/>
          <skeleton-item class="row-content"/>
        </div>
      </skeleton-card>

      <skeleton-card class="cell-card">
        <div class="row" v-for="item in 2" :key="item">
          <skeleton-item class="row-title"/>
          <skeleton-item class="row-content"/>
        </div>
      </skeleton-card>

      <skeleton-card class="cell-card">
        <div class="row" v-for="item in 2" :key="item">
          <skeleton-item class="row-title"/>
          <skeleton-item class="row-content"/>
        </div>
      </skeleton-card>
    </skeleton-card-list>

    <fix-bar>
      <div class="bottom-bar">
        <skeleton-item class="left"/>
        <skeleton-item class="right"/>
      </div>
    </fix-bar>
  </div>
</template>

<script setup lang="ts" name="ConfirmOrder">
//
</script>

<style lang="less" scoped>
.page {
  height: 100vh;
  overflow: hidden;

  .address-card {
    position: relative;

    .top {
      width: 40%;
    }

    .mid {
      width: 70%;
    }

    .btm {
      width: 40%;
    }

    .rgt {
      position: absolute;
      width: var(--skeleton-height);
      height: var(--skeleton-height);
      top: 0;
      bottom: 0;
      right: 0;
      margin: auto 0;
      transform: translateX(-50%);
      border-radius: 50%;
    }
  }

  .shop-card {
    &__title {
      width: 40%;
    }

    &__content {
      display: grid;
      grid-template-columns: 72px 1fr;
      grid-column-gap: var(--skeleton-row-gap);
      grid-row-gap: var(--skeleton-row-gap);
      grid-template-areas: 'a b'
                           'a c'
                           'a d';
      margin-top: var(--skeleton-row-gap);

      .content-a {
        grid-area: a;
        height: 72px;
      }

      .content-b {
        grid-area: b;
      }

      .content-c {
        grid-area: c;
      }

      .content-d {
        grid-area: d;
      }
    }
  }

  .cell-card {
    .row {
      display: flex;
      justify-content: space-between;
      margin-bottom: var(--skeleton-row-gap);

      &-title {
        width: 40%;
      }

      &-content {
        width: 40%;
      }

      &:last-child {
        margin-bottom: 0;
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
        height: 20px;
        width: 45px;
        border-radius: 20px;
      }

      .right {
        height: 20px;
        width: 90px;
        border-radius: 20px;
      }
    }
  }
}
</style>
