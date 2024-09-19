<template>
  <div class="page page-grey">
    <div class="header">
      <app-search placeholder="请输入商品名称" v-model="params.goodsName" @search="search"/>

      <div class="tabs">
        <div
          v-for="(status, index) in statusOpts"
          :key="index"
          :class="{
            tab: true,
            'tab-active': activeStatus === status.value
          }"
          @click="changeStatus(status.value)"
        >
          {{ status.label }}
        </div>
      </div>
    </div>

    <div class="body">
      <app-list :list-api="afterSaleApi.getAfterSalePage" :params="params" ref="listRef">
        <template #item="{ item }">
          <order-shop
            class="shop-card"
            :data="item"
          >
            <template #header>
              <div class="shop-card__header">
                <div class="name">{{ item.shopName }}</div>
                <div class="status">{{ item.statusDesc }}</div>
              </div>
            </template>

            <template #orderGoods="{ orderGoods }">
              <order-goods :data="orderGoods" @click="router.push({name: 'AfterSaleDetail', params: {id: item.id}})">
                <template #name>
                  <van-highlight :keywords="params.goodsName" :source-string="orderGoods.name" />
                </template>
              </order-goods>
            </template>

            <template #footer>
              <div
                v-if="AfterSaleStatus.pending.code === item.status"
                class="shop-card__footer"
              >
                <div
                  class="btn"
                  v-if="AfterSaleStatus.pending.code === item.status"
                  @click="cancelAfterSale(item.id)"
                >
                  取消
                </div>
              </div>
            </template>
          </order-shop>
        </template>
      </app-list>

      <back-top/>
    </div>
  </div>
</template>

<script setup lang="ts" name="AfterSaleList">
import { ref, reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { showConfirmDialog, showToast } from "vant"
import { useAppStore } from "@/store/app"
import { AfterSaleStatus } from '@/constant'
import * as afterSaleApi from '@/api/order/afterSale'

const route = useRoute()
const router = useRouter()
const listRef = ref()
const appStore = useAppStore()
const activeStatus = ref(route.query.status as string)
const params = reactive({
  goodsName: '',
  status: activeStatus,
})

const statusOpts = [
  {
    label: '全部',
    value: '',
  },
  {
    label: '待处理',
    value: AfterSaleStatus.pending.code,
  },
  {
    label: '已处理',
    value: 'handled',
  },
  {
    label: '已取消',
    value: AfterSaleStatus.cancelled.code,
  },
]

const search = () => {
  listRef.value.startOnFirstPage()
}

const cancelAfterSale = (id: ID) => {
  showConfirmDialog({
    message: '确认要取消售后吗？',
    cancelButtonText: '我再想想',
    confirmButtonText: '取消售后',
  })
    .then(() => {
      afterSaleApi.cancelAfterSale(id)
        .then(() => {
          showToast('取消成功~')
          listRef.value.startOnFirstPage()
        })
        .catch(() => {
        })
    })
    .catch(() => {
    })
}

const changeStatus = (status: string) => {
  activeStatus.value = status
  params.status = status
  listRef.value.startOnFirstPage()
}


const init = () => {
  appStore.pageSkeleton = true
  listRef.value.fetchList().then(() => {
    appStore.pageSkeleton = false
  })
}

onMounted(() => {
  init()
})
</script>

<style lang="less" scoped>
.page {

  .header {
    position: sticky;
    top: 0;
    z-index: 1;
    padding: var(--page-padding-y);
    background-color: #fff;

    :deep(.app-search) {
      background-color: var(--grey);

      .input {
        background-color: var(--grey);
      }
    }

    .tabs {
      display: flex;
      justify-content: space-between;
      padding: 0 calc(var(--page-padding-y));
      margin-top: calc(var(--page-padding-y) + calc(1.5 * var(--grid-size)));

      .tab {
        display: flex;
        align-items: center;
        color: var(--font-color-black-l2);

        &-active {
          color: var(--font-color-red);
        }
      }
    }
  }

  .body {
    padding: var(--page-padding-x);

    .shop-card {
      margin-bottom: var(--page-padding-x);

      &__header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .status {
          font-size: var(--font-size--small);
          color: var(--font-color-black-l2);
        }
      }

      &__footer {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding-top: calc(2 * var(--grid-size));

        .btn {
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 70px;
          height: 24px;
          margin-right: calc(3 * var(--grid-size));
          color: var(--font-color-black-l2);
          border-radius: 24px;
          border: 1px solid var(--btn-border-color);
          &:last-child {
            margin-right: 0;
          }
        }
      }

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}
</style>
