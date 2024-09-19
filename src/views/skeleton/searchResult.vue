<template>
  <div class="page page-grey page-tabbar">

    <div class="header">
      <skeleton-item class="search"/>
    </div>

    <div class="body">
      <div class="list">
        <div class="item" v-for="item in 8" :key="item">
          <skeleton-item class="pic"/>
          <div class="text">
            <skeleton-item class="title"/>
            <div class="flex">
              <skeleton-item class="price"/>
              <skeleton-item class="price"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="SearchResult">
//
</script>

<style lang="less" scoped>
.page {
  height: 100vh;
  overflow: hidden;

  .header {
    padding: var(--page-padding-y) var(--page-padding-x);
    background-color: #fff;
    .search {
      height: 28px;
      border-radius: 30px;
    }
  }

  .body {
    padding: var(--page-padding-y) var(--page-padding-x);
    .list {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-column-gap: 6px;
      grid-row-gap: 6px;

      .item {
        padding: 4px;
        border-radius: var(--card-border-radius);
        background-color: #fff;
        .pic {
          height: 206px;
        }
        .text {
          .title {
            height: calc(3.3 * var(--grid-size));
            margin-bottom: calc(2 * var(--grid-size));
          }
          .price {
            height: calc(3.3 * var(--grid-size));
            width: 50px;
            margin-right: calc(2 * var(--grid-size));
          }
          padding: calc(3 * var(--grid-size)) calc(2 * var(--grid-size));
        }
      }
    }
  }
}
</style>
