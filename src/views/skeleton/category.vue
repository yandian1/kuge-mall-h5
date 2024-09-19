<template>
  <div class="page page-pad page-grey page-tabbar">
    <skeleton-item class="head"/>
    <div class="body">
      <div class="side">
        <skeleton-item class="l1" v-for="item in 16" :key="item" />
      </div>
      <div class="main">
        <div class="l2" v-for="item in 4" :key="item">
          <skeleton-item class="title" />
          <div class="l3-list">
            <div class="l3" v-for="item in 6" :key="item">
              <skeleton-item class="img" />
              <skeleton-item class="text" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="Category">
//
</script>

<style lang="less" scoped>
.page {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  background: none !important;

  .head {
    height: var(--search-height);
    border-radius: 30px;
  }

  .body {
    display: flex;
    overflow-y: hidden;
    flex: 1;
    margin-top: 20px;
    .side {
      width: 100px;
      overflow-y: hidden;
      .l1 {
        margin-bottom: 28px;
      }
    }
    .main {
      flex: 1;
      margin-left: 15px;
      .l2 {
        margin-bottom: 35px;
        .title {
          width: 155px;
        }
        .l3-list {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-column-gap: calc(2 * var(--grid-size));
          grid-row-gap: calc(3 * var(--grid-size));
          margin-top: 12px;
          .l3 {
            .img {
              width: 70px;
              height: 70px;
            }
            .text {
              width: 70px;
              margin-top: calc(2 * var(--grid-size));
            }
          }
        }
      }
    }
  }
}
</style>
