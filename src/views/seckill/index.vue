<template>
  <div class="page page-grey safe-padding-bottom">
    <div class="banner">
      <app-image :src="seckill.banner" class="img" fit="cover" />
    </div>

    <div class="time-tabs">
      <van-tabs :ellipsis="false" shrink>
        <van-tab v-for="time in seckill.timeList">
          <template #title>
            <template v-if="time.type === 'opening'">
              <van-count-down class="time" :time="time.surplus" format="mm:ss"/>
              <div class="status">进行中</div>
            </template>
            <template v-else-if="time.type === 'notOpen'">
              <div class="time">{{dayjs(time.startTime).format('HH:mm')}}</div>
              <div class="status">即将开抢</div>
            </template>
          </template>

          <div class="goods-list">
            <app-card
              v-for="(goods ,index) in time.spuList"
              :key="index"
            >
              <order-goods
                :data="goods"
                @click="clickGoods(time.type, goods.id)"
              >
                <template #attr>{{goods.intro}}</template>
                <template #num>
                  <div v-if="time.type === 'opening'">抢</div>
                  <div v-if="time.type === 'notOpen'">敬请期待</div>
                </template>
              </order-goods>
            </app-card>
          </div>

        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script setup lang="ts" name="Seckill">
import { ref } from "vue"
import dayjs from 'dayjs'
import { useRoute, useRouter } from "vue-router"
import * as seckillApi from '@/api/product/seckill'
import * as SeckillTypes from '@/api/product/seckill/types'
import { useAppStore } from "@/store/app.ts";
import { showToast } from "vant";

const route = useRoute()
const router = useRouter()
const appStore = useAppStore()
const seckillId = route.params.id as string
const seckill = ref({} as SeckillTypes.Seckill)

const clickGoods = (type: string, id: ID) => {
  if (type === 'notOpen') {
    showToast('敬请期待~')
    return
  }
  router.push({name: 'Goods', params: { id }})
}

const getSeckill = () => {
  return seckillApi
    .getSeckill(seckillId)
    .then((res) => {
      seckill.value = res.data.data
    })
    .catch((error) => {
      appStore.pageError = error.data.msg
    })
}


const init = () => {
  appStore.pageSkeleton = true
  getSeckill().then(() => {
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

  .time-tabs {
    padding: calc(1.5 * var(--page-padding-x)) var(--page-padding-x);
    :deep(.van-tabs) {
      .van-tabs__nav {
        padding: 0;
        margin-left: calc(-3 * var(--grid-size));
        margin-right: calc(-3 * var(--grid-size));
        background-color: transparent;

        .van-tab {
          padding-left: calc(6 * var(--grid-size));
          padding-right: calc(6 * var(--grid-size));
          font-weight: normal;
          .time {
            line-height: 1;
            text-align: left;
            font-size: var(--font-size--large);
          }

          .status {
            margin-top: calc(2 * var(--grid-size));
            text-align: left;
            font-size: var(--font-size--small);
            color: var(--font-color-black-l2);
          }


          &--active {
            .time {
              color: var(--font-color-red);
            }
            .status {
              color: var(--font-color-red);
            }
          }
        }
        .van-tabs__line {
          display: none;
        }
      }
      .van-tabs__content {
        padding-top: calc(1 * var(--card-padding-x));
      }
    }
    .goods-list {
      margin-top: calc(0 * var(--page-padding-x));
      :deep(.card) {
        margin-bottom: var(--page-padding-x);
      }
    }
  }
}
</style>
