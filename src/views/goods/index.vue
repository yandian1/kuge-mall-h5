<template>
  <div class="page page-tabbar page-grey">

    <van-swipe class="album" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(img, index) in detail.imgList" :key="index" @click="clickSwipeItem(index)">
        <app-image :src="img" class="img" fit="cover"/>
      </van-swipe-item>
      <template #indicator="{ active, total }">
        <div class="indicator">
          <div class="current">{{ active + 1 }}</div>
          <div class="total">{{ total }}</div>
        </div>
      </template>
    </van-swipe>

    <div class="content">
      <div class="top">
        <price :value="skuPop.selected.price" :size="26"/>
        <price :value="skuPop.selected.linePrice" :size="14" class="ml-6" line-through/>
        <div class="name">{{ detail.name }}</div>
      </div>

      <app-card class="cell-card">
        <div class="item">
          <div class="item-title">选择</div>
          <div class="item-value" @click="skuPop.show=true">
            <span class="text">
              已选：{{ Object.values(JSON.parse(skuPop.selected.attrs || '{}')).join(',') }}
            </span>
            <svg-icon icon="more" class="icon"/>
          </div>
        </div>
        <div class="item">
          <div class="item-title">服务</div>
          <div class="item-value">
            <div class="services">
              <span class="service" v-for="(item, index) in detail.services" :key="index">{{ item }}</span>
            </div>
          </div>
        </div>
      </app-card>

      <app-card class="detail-card">
        <div class="detail-card__title">商品详情</div>
        <div ref="goodsDetail" class="detail-card__content" v-html="detail.detail" @click="clickGoodsDetail"></div>
      </app-card>
    </div>

    <fix-bar class="frosted">
      <div class="bottom-bar">
        <div class="icon-box">
          <div class="item" @click="router.push('/')">
            <svg-icon icon="home" :size="18" color="#333"/>
            <div class="text">首页</div>
          </div>
          <div class="item" @click="router.push('/cart')">
            <van-badge :content="userStore.cartCount" v-if="userStore.cartCount">
              <svg-icon icon="cart" :size="18" color="#333"/>
            </van-badge>
            <svg-icon v-else icon="cart" :size="18" color="#333"/>

            <div class="text">购物车</div>
          </div>
          <div class="item">
            <svg-icon icon="server" :size="18" color="#333"/>
            <div class="text">客服</div>
          </div>
        </div>
        <div class="btn-box">
          <div class="btn-cart" @click="addCart">添加购物车</div>
          <div class="btn-buy" @click="buyNow">立即购买</div>
        </div>
      </div>
    </fix-bar>

    <goods-sku v-model:show="skuPop.show" v-model:selected="skuPop.selected" :mode="skuPop.mode" :info="detail"/>
  </div>
</template>

<script setup lang="ts" name="Goods">
import { nextTick, ref } from 'vue'
import { showImagePreview } from 'vant'
import { useRoute, useRouter } from 'vue-router'
import { useAppStore } from "@/store/app"
import { useUserStore } from "@/store/user"
import * as spuApi from '@/api/product/spu'
import * as SpuTypes from '@/api/product/spu/types'
import { escape2Html } from "@/utils"

const route = useRoute()
const router = useRouter()
const appStore = useAppStore()
const userStore = useUserStore()
const spuId = route.params.id as string
const skuPop = ref({
  show: false,
  mode: '',
  selected: {} as Recordable,
})
const goodsDetail = ref<HTMLElement>()
const detail = ref<SpuTypes.SpuDetail>({
  id: '',
  name: '',
  price: undefined,
  firstImg: '',
  detail: '',
  services: [],
  imgList: [],
  skus: [],
  attrs: [],
})
let goodsDetailImgs: string[] = []

const clickSwipeItem = (idx: number) => {
  showImagePreview({
    images: detail.value.imgList,
    startPosition: idx,
  })
}

const buyNow = () => {
  skuPop.value = {
    show: true,
    mode: 'goods',
    selected: skuPop.value.selected
  }
  console.log("buyNow", skuPop.value)
}

const addCart = () => {
  skuPop.value = {
    show: true,
    mode: 'cart',
    selected: skuPop.value.selected
  }

  console.log("addCart", skuPop.value)
}

const genGoodsDetailImgs = () => {
  goodsDetailImgs = []
  const imgList = goodsDetail.value?.querySelectorAll("img")
  if (imgList) {
    for (let img of imgList) {
      goodsDetailImgs.push(img.src)
    }
  }
}

const clickGoodsDetail = (evt: Event) => {
  if (evt.target instanceof HTMLImageElement) {
    const targetSrc = evt.target.src as string
    const targetIdx = goodsDetailImgs.findIndex(img => img === targetSrc)
    if (targetIdx !== -1) {
      showImagePreview({
        images: goodsDetailImgs,
        startPosition: targetIdx,
      })
    }
  }
}

const getSpu = () => {
  return spuApi
    .getSpu(spuId)
    .then((res) => {
      const data = res.data.data
      detail.value = {
        id: data.id,
        name: data.name,
        price: data.price,
        firstImg: data.firstImg,
        detail: escape2Html(data.detail),
        services: data.services,
        imgList: data.imgList,
        skus: data.skus,
        attrs: data.attrs,
      }
      nextTick(() => {
        genGoodsDetailImgs()
      })
    })
    .catch((error) => {
      return Promise.reject(error)
    })
}

const init = () => {
  appStore.pageSkeleton = true
  getSpu()
    .then(() => {
      appStore.pageSkeleton = false
    })
    .catch((error) => {
      appStore.pageSkeleton = false
      appStore.pageError = error.data.msg
    })
}

init()
</script>

<style lang="less" scoped>
.page {
  .album {
    position: relative;

    .img {
      width: 100vw;
      height: calc(100vw + 30px);
    }

    .indicator {
      display: flex;
      position: absolute;
      right: calc(2 * var(--grid-size));
      bottom: 42px;
      height: 20px;
      //min-width: 36px;
      border-radius: 10px;
      background-color: rgba(0, 0, 0, .4);

      .current {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 20px;
        border-radius: 50%;
        background-color: rgba(0, 0, 0, .4);
        color: #fff;
      }

      .total {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 20px;
        padding: 0 4px 0 0px;
        border-radius: 50%;
        box-sizing: border-box;
        color: #fff;
      }
    }
  }

  .content {
    position: relative;
    z-index: 1;
    padding-top: calc(4 * var(--grid-size));
    margin-top: -30px;
    border-radius: calc(4 * var(--grid-size)) calc(4 * var(--grid-size)) 0 0;
    background-color: var(--grey);

    .top {
      margin-left: var(--page-padding-x);
      margin-right: var(--page-padding-x);

      .name {
        margin-top: calc(2 * var(--grid-size));
        line-height: var(--line-height-default);
      }
    }

    .cell-card {
      margin-top: calc(4 * var(--grid-size));

      .item {
        display: flex;
        align-items: flex-start;
        padding: 12px 0;

        &-title {
          width: 42px;
          color: #666;
          line-height: var(--line-height-default);
        }

        &-value {
          display: flex;
          flex: 1;

          .text {
            flex: 1;
            line-height: var(--line-height-default);
          }

          .services {
            display: flex;
            flex-wrap: wrap;
            flex: 1;
            line-height: var(--line-height-default);
            margin-bottom: calc(-2 * var(--grid-size));

            .service {
              margin-right: calc(2 * var(--grid-size));
              margin-bottom: calc(2 * var(--grid-size));

              &:last-child {
                margin-right: 0;
              }
            }
          }

          .icon {
            margin-left: auto;
          }
        }

        &:first-child {
          padding-top: 0;
        }

        &:last-child {
          padding-bottom: 0;
        }
      }
    }

    .detail-card {
      padding-top: calc(4 * var(--grid-size));
      padding-bottom: calc(4 * var(--grid-size));
      margin-top: 10px;
      background-color: #fff;

      &__title {
        margin-bottom: var(--page-padding-y);
        text-align: center;
        font-size: var(--font-size--large);
      }

      &__content {
        word-break: break-all;
        word-wrap: break-word;

        :deep(img) {
          display: block;
          width: 100% !important;
          height: auto !important;
        }
      }
    }
  }

  :deep(.fix-bar) {
    padding: 0 calc(var(--card-padding-x));

    .bottom-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .icon-box {
        display: flex;

        .item {
          margin-right: calc(6 * var(--grid-size));
          text-align: center;

          .text {
            margin-top: 6px;
            color: #333;
          }

          &:last-child {
            margin-right: 0;
          }
        }
      }

      .btn-box {
        display: flex;

        .btn-cart {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 90px;
          height: var(--action-button-height);
          border-radius: var(--action-button-radius);
          color: #fff;
          background-color: #ffca1e;
        }

        .btn-buy {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 90px;
          height: var(--action-button-height);
          border-radius: var(--action-button-radius);
          margin-left: calc(3 * var(--grid-size));
          color: #fff;
          background-color: #ff0033;
        }
      }
    }
  }
}
</style>
