
<template>
  <div class="page page-grey page-tabbar">
    <div class="header">
      <skeleton-item class="search"/>
      <div class="status">
        <skeleton-item class="item" v-for="item in 4" :key="item"/>
      </div>
    </div>

    <div class="body">
      <skeleton-card-list>
        <skeleton-card class="shop-card" v-for="item in 10" :key="item">
          <skeleton-item class="shop-card__title"/>
          <div class="shop-card__content">
            <skeleton-item class="content-a"/>
            <skeleton-item class="content-b"/>
            <skeleton-item class="content-c"/>
            <skeleton-item class="content-d"/>
          </div>
          <!--          <div class="shop-card__footer">-->
          <!--            <skeleton-item class="item" v-for="item in 4" :key="item"/>-->
          <!--          </div>-->
        </skeleton-card>
      </skeleton-card-list>
    </div>
  </div>
</template>

<script setup lang="ts" name="AfterSaleList">
//
</script>

<style lang="less" scoped>
.page {
  height: 100vh;
  overflow: hidden;

  .header {
    padding: var(--page-padding-y);
    background-color: #fff;
    .search {
      height: 28px;
      border-radius: 30px;
    }
    .status {
      display: flex;
      justify-content: space-between;
      margin-top: var(--page-padding-y);
      .item {
        width: 22%;
      }
    }
  }

  .body {
    padding: var(--page-padding-x);
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

    &__footer {
      display: flex;
      justify-content: space-between;
      margin-top: var(--skeleton-row-gap);
      .item {
        width: 20%;
      }
    }
  }
}
</style>
