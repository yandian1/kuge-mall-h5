<template>
  <div class="page page-grey">
    <div class="banner">
      <app-image :src="activity.banner" class="img" fit="cover" preview/>
    </div>

    <div class="section-tabs">
      <van-tabs :ellipsis="false" shrink>
        <van-tab v-for="section in activity.sections">
          <template #title>
            {{section.title}}
          </template>
          <div class="goods-list">
            <app-card
              v-for="(goods ,index) in section.goodsList"
              :key="index"
            >
              <order-goods
                :data="goods"
                @click="router.push({name: 'Goods', params: { id: goods.id }})"
              >
                <template #attr>{{goods.intro}}</template>
                <template #num><span></span></template>
              </order-goods>
            </app-card>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script setup lang="ts" name="Activity">
import { ref } from "vue"
import { useRoute, useRouter } from "vue-router"
import * as activityApi from '@/api/product/activity'
import * as ActivityTypes from '@/api/product/activity/types'
import { useAppStore } from "@/store/app"

const route = useRoute()
const router = useRouter()
const appStore = useAppStore()
const activity = ref({} as ActivityTypes.Activity)

const getActivity = () => {
  return activityApi
    .getActivity(route.params.id as string)
    .then((res) => {
      activity.value = res.data.data
    })
    .catch((error) => {
      appStore.pageError = error.data.msg
    })
}


const init = () => {
  appStore.pageSkeleton = true
  getActivity().then(() => {
    appStore.pageSkeleton = false
  })
}

init()
</script>

<style lang="less" scoped>
.page {
  .banner {
    .img {
      width: 100vw;
      height: 225px;
    }
  }
  .section-tabs {
    padding: calc(1.5 * var(--page-padding-x)) var(--page-padding-x);
    :deep(.van-tabs) {
      .van-tabs__nav {
        padding: 0;
        margin-left: calc(-3 * var(--grid-size));
        margin-right: calc(-3 * var(--grid-size));
        background-color: transparent;

        .van-tab {
          padding-left: calc(4 * var(--grid-size));
          padding-right: calc(4 * var(--grid-size));
          font-weight: normal;
          text-align: center;

          &__text {
            color: var(--font-color-black-l2);
          }


          &--active {
            .van-tab__text {
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
      margin-top: calc(0.7 * var(--page-padding-x));
      :deep(.card) {
        margin-bottom: var(--page-padding-x);
      }
    }
  }
}
</style>
