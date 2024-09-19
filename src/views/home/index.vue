<template>
  <div class="page page-grey page-tabbar">
    <div class="head">
      <app-search placeholder="请输入搜索关键词" mode="static" show-search @click="router.push({name: 'Search'})"/>
    </div>

    <div class="body">
      <app-card class="swipe-card" v-if="homeData.swipeList.length">
        <van-swipe
          class="my-swipe"
          :autoplay="3000"
          indicator-color="white"
        >
          <van-swipe-item v-for="(swipe, index) in homeData.swipeList" :key="index">
            <app-image :src="swipe.img" class="img" fit="cover"/>
          </van-swipe-item>
        </van-swipe>
      </app-card>

      <app-card class="grid-card" v-if="homeData.gridList.length">
        <div class="grid">
          <div class="grid-item" v-for="(grid, index) in homeData.gridList" :key="index"
               @click="clickGrid(grid)">
            <div class="icon">
              <app-image :src="grid.img" class="img" fit="cover"/>
            </div>
            <div class="text">{{ grid.title }}</div>
          </div>
        </div>
      </app-card>

      <app-card
        v-if="homeData.seckill.goodsList.length"
        class="seckill-card" title="秒杀专区"
        @click="router.push('/seckill/' + homeData.seckill.id)"
        more
      >
        <div class="goods-list">
          <div class="goods-list__item" v-for="(goods, index) in homeData.seckill.goodsList" :key="index">
            <app-image :src="goods.firstImg" :ratio="1" radius="4px" class="img"/>
            <div class="text van-multi-ellipsis--l2" style="-webkit-line-clamp: 1">
              {{ goods.name }}
            </div>
          </div>
        </div>
      </app-card>

      <div class="goods-tabs" v-if="homeData.goodsTabs.length">
        <van-tabs :ellipsis="false" shrink>
          <van-tab v-for="tab in homeData.goodsTabs">
            <template #title>
              <div class="tab-title">{{ tab.title }}</div>
              <div class="tab-subTitle">{{ tab.subTitle }}</div>
            </template>
            <div class="goods-list">
              <goods-card
                v-for="(goods, index) in tab.goodsList"
                :key="index"
                :goods="goods"
                @click="router.push({ name: 'Goods', params: { id: goods.id } })"
              />
            </div>
            <div class="no-more" v-if="tab.goodsList.length">没有更多了</div>
          </van-tab>
        </van-tabs>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="Home">
import { ref } from 'vue'
import { useRouter } from "vue-router"
import { showToast } from "vant"
import { useAppStore } from "@/store/app"
import * as prodApi from '@/api/product/home'
import * as ProdTypes from '@/api/product/home/types'

const router = useRouter()
const appStore = useAppStore()
const homeData = ref<ProdTypes.Homepage>({
  id: '',
  swipeList: [],
  gridList: [],
  seckill: {
    id: undefined,
    goodsList: []
  },
  goodsTabs: [],
})

const clickGrid = (grid: ProdTypes.Homepage['gridList'][number]) => {
  if (!grid.target || grid.target === '/') {
    showToast('敬请期待~')
    return
  }

  router.push(grid.target)
}

const getHomepage = () => {
  appStore.pageSkeleton = true
  prodApi
    .getHomepage()
    .then((res) => {
      appStore.pageSkeleton = false
      const data = JSON.parse(res.data.data.detail)
      const swipeList = data.swipeList || []
      const gridList = data.gridList || []
      const seckill = data.seckill || {
        id: undefined,
        goodsList: []
      }
      const goodsTabs = data.goodsTabs || []
      if (!swipeList.length && !gridList.length && !seckill.goodsList.length && !goodsTabs.length) {
        appStore.pageError = '空空如也'
      } else {
        homeData.value = { id: data.id, swipeList, gridList, seckill, goodsTabs }
      }
    })
    .catch((error) => {
      appStore.pageSkeleton = false
      appStore.pageError = error.data.msg
    })
}

const init = () => {
  getHomepage()
}

init()
</script>

<style lang="less" scoped>
.page {

  .head {
    position: sticky;
    top: 0;
    z-index: 1;
    padding: var(--page-padding-y) var(--page-padding-x);
    background-color: #fff;

    :deep(.app-search) {
      background-color: var(--grey);
    }
  }

  .body {
    padding-top: var(--page-padding-x);

    .swipe-card {
      padding: 0;
      margin-left: var(--page-padding-x);
      margin-right: var(--page-padding-x);
      overflow: hidden;

      .img {
        width: 100%;
        height: 180px;
      }
    }

    .grid-card {
      padding-left: 0;
      padding-right: 0;
      margin-left: var(--page-padding-x);
      margin-right: var(--page-padding-x);
      margin-top: calc(2 * var(--grid-size));

      .grid {
        display: flex;
        flex-wrap: wrap;
        margin-bottom: calc(-2 * var(--grid-size));

        &-item {
          flex-basis: 25%;
          margin-bottom: calc(3.6 * var(--grid-size));
          text-align: center;

          .icon {
            margin-bottom: calc(2 * var(--grid-size));

            .img {
              width: 28%;
            }
          }

          .text {
            font-size: var(--font-size--small);
            color: var(--font-color-default);
          }

        }
      }
    }

    .seckill-card {
      margin-left: var(--page-padding-x);
      margin-right: var(--page-padding-x);
      margin-top: calc(2 * var(--grid-size));

      .goods-list {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        grid-column-gap: calc(2 * var(--grid-size));

        &__item {
          .img {
            display: block;
            width: 100%;
          }

          .text {
            margin-top: calc(2 * var(--grid-size));
            font-size: var(--font-size--small);
          }
        }
      }
    }

    .goods-tabs {
      margin-left: var(--page-padding-x);
      margin-right: var(--page-padding-x);
      margin-top: calc(4 * var(--grid-size));

      :deep(.van-tabs) {
        .van-tabs__nav {
          padding: 0;
          margin-left: calc(-2 * var(--grid-size));
          margin-right: calc(-2 * var(--grid-size));
          background-color: transparent;

          .van-tab {
            padding-left: calc(4 * var(--grid-size));
            padding-right: calc(4 * var(--grid-size));
            font-weight: normal;
            text-align: center;

            .tab-title {
              margin-bottom: calc(2 * var(--grid-size));
              font-size: var(--font-size--large);
            }

            .tab-subTitle {
              font-size: var(--font-size--small);
              color: var(--font-color-black-l2);
            }

            &.van-tab--active {
              .tab-title {
                color: var(--font-color-red);
              }

              .tab-subTitle {
                color: var(--font-color-red);
              }
            }
          }

          .van-tabs__line {
            display: none;
          }
        }
      }

      .goods-list {
        display: grid;
        grid-column-gap: var(--page-padding-x);
        grid-row-gap: var(--page-padding-x);
        grid-template-columns: 1fr 1fr;
        margin-top: calc(2 * var(--grid-size));
      }

      .no-more {
        padding: calc(4 * var(--grid-size)) 0 calc(2 * var(--grid-size));
        text-align: center;

        color: var(--van-list-text-color);
        font-size: var(--van-list-text-font-size);
      }
    }
  }
}
</style>
