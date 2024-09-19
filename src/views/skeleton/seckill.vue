<template>
  <div class="page page-grey">
    <div class="header">
      <skeleton-item class="album"/>
    </div>

    <div class="body">
      <div class="title-list">
        <skeleton-item v-for="item in 8" :key="item"/>
      </div>
      <skeleton-card-list>
        <skeleton-card class="goods-card" v-for="item in 8" :key="item">
          <skeleton-item class="content-a"/>
          <skeleton-item class="content-b"/>
          <skeleton-item class="content-c"/>
          <skeleton-item class="content-d"/>
        </skeleton-card>
      </skeleton-card-list>
    </div>
  </div>
</template>

<script setup lang="ts" name="Seckill">
//
</script>

<style lang="less" scoped>
.page {
  height: 100vh;
  overflow: hidden;

  .header {
    .album {
      height: 225px;
    }
  }

  .body {
    padding-top: calc(2 * var(--card-padding-x));
    background-color: #fff;

    .title-list {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-column-gap: 20px;
      grid-row-gap: calc(2 * var(--grid-size));
      padding: 0 var(--card-padding-x) calc(1.2 * var(--card-padding-x));
    }

    .goods-card {
      display: grid;
      grid-template-columns: 72px 1fr;
      grid-column-gap: var(--skeleton-row-gap);
      grid-row-gap: var(--skeleton-row-gap);
      grid-template-areas: 'a b'
                         'a c'
                         'a d';

      padding-top: calc(.8 * var(--grid-size));
      padding-bottom: calc(.8 * var(--grid-size));

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
}
</style>
