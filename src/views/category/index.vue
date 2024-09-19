<template>
  <div class="page">
    <div class="head">
      <app-search placeholder="请输入搜索关键词" mode="static" @click="router.push({name: 'Search'})" />
    </div>

    <div class="body">
      <div class="side">
        <div
          v-for="(item, index) in sideList"
          :key="index"
          :class="{
            item: true,
            'item-active': index === sideIdx
          }"
          @click="clickSide(index, item.id)">
          {{ item.name }}
        </div>
      </div>
      <div class="main">
        <div v-for="(item, index) in mainList" :key="index" class="sup-list">
          <div class="title">{{ item.name }}</div>
          <div class="sub-list">
            <div v-for="(child, childIdx) in item.children" :key="childIdx"
                 @click="router.push({name: 'SearchResult', query: {cateId: child.id}})">
              <app-image :src="child.img" :ratio="1" radius="6px" fit="cover" />
              <div class="text">{{ child.name }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="Category">
import { ref } from 'vue'
import { useRouter } from "vue-router"
import * as cateApi from '@/api/product/category'
import * as CateTypes from '@/api/product/category/types'
import { useAppStore } from "@/store/app"

const router = useRouter()
const appStore = useAppStore()
const sideIdx = ref(0)
const sideList = ref<CateTypes.Category[]>([])
const mainList = ref<CateTypes.Category[]>([])

const clickSide = (idx: number, id: ID) => {
  if (idx === sideIdx.value) return
  sideIdx.value = idx
  getMain(id)
}

const getSide = (id?: ID) => {
  return cateApi
    .getCategoryList({ id })
    .then((res) => {
      sideList.value = res.data.data
    })
    .catch(() => {
    })
}

const getMain = (id: ID) => {
  cateApi
    .getCategoryList({ id })
    .then((res) => {
      mainList.value = res.data.data
      mainList.value.forEach(item => {
        cateApi
          .getCategoryList({ id: item.id })
          .then((res) => {
            item.children = res.data.data
          })
          .catch(() => {
          })
      })
    })
    .catch(() => {
    })
}

const init = () => {
  appStore.pageSkeleton = true
  getSide().then(() => {
    appStore.pageSkeleton = false
    if (sideList.value.length) {
      getMain(sideList.value[0].id)
    }
  })
}

init()
</script>

<style lang="less" scoped>
.page {

  --side-width: 100px;
  --body-top: calc(calc(2 * var(--page-padding-y)) + var(--search-height));
  --body-bottom: calc(var(--bottom-bar-height) + env(safe-area-inset-bottom));

  .head {
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    right: 0;
    padding: var(--page-padding-y)  var(--page-padding-x);
    background-color: #fff;
    :deep(.app-search) {
      background-color: var(--grey);
    }
  }

  .body {
    .side {
      position: fixed;
      z-index: 2;
      left: 0;
      top: var(--body-top);
      bottom: var(--body-bottom);
      width: var(--side-width);
      padding: 22px 0;
      overflow-y: auto;
      text-align: center;
      background-color: #f7f8f9;

      .item {
        padding: 0 14px;
        margin-bottom: 32px;
        line-height: var(--line-height-default);
        font-size: var(--font-size--large);

        &-active {
          position: relative;
          color: var(--font-color-red);

          &:before {
            content: '';
            position: absolute;
            z-index: 1;
            left: 11px;
            top: 1px;
            width: 3px;
            height: 14px;
            border-radius: 3px;
            background-color: var(--font-color-red);
          }
        }

        &:last-child {
          margin-bottom: 0;
        }
      }
    }

    .main {

      position: fixed;
      z-index: 1;
      left: var(--side-width);
      right: 0;
      top: var(--body-top);
      bottom: var(--body-bottom);
      padding: 23px calc(5 * var(--grid-size));
      overflow-y: auto;

      .sup-list {
        margin-bottom: calc(9 * var(--grid-size));

        .title {
          margin-bottom: calc(4.5 * var(--grid-size));
          font-size: var(--font-size--large);
        }

        .sub-list {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-column-gap: calc(8 * var(--grid-size));
          grid-row-gap: calc(4 * var(--grid-size));

          .text {
            margin-top: calc(2 * var(--grid-size));
            line-height: var(--line-height-default);
            text-align: center;
            font-size: var(--font-size--small);
            color: var(--font-color-black-l2);
          }
        }

        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
}
</style>
