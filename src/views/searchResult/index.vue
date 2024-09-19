<template>
  <div class="page page-grey">
    <div class="header">
      <app-search placeholder="请输入搜索关键词" v-model="params.name" @search="searchHandle" show-search/>
    </div>

    <div class="body">
      <app-list :list-api="spuApi.getSpuPage" :params="params" ref="listRef">
        <template #item="{ item }">
          <goods-card
            :goods="item"
            @click="router.push({ name: 'Goods', params: { id: item.id } })"
          >
            <template #name>
              <van-highlight :keywords="params.name || ''" :source-string="item.name" />
            </template>
          </goods-card>
        </template>
      </app-list>

      <back-top/>
    </div>
  </div>
</template>

<script setup lang="ts" name="SearchResult">
import { onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAppStore } from "@/store/app"
import * as spuApi from '@/api/product/spu'

const route = useRoute()
const router = useRouter()
const appStore = useAppStore()
const search = route.query.search as string
const cateId = route.query.cateId ? parseFloat(route.query.cateId as string) : undefined
const coupId = route.query.coupId ? parseFloat(route.query.coupId as string) : undefined
const listRef = ref()
const params = reactive({
  name: search,
  categoryId: cateId,
  couponId: coupId,
})

const searchHandle = () => {
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
      background-color: var(--page-grey);

      .input {
        background-color: var(--page-grey);
      }
    }
  }

  .body {
    padding-top: calc(2 * var(--grid-size));
    padding-left: calc(2 * var(--grid-size));
    padding-right: calc(2 * var(--grid-size));

    :deep(.van-list) {
      .app-list {
        display: grid;
        grid-column-gap: var(--page-padding-x);
        grid-row-gap: var(--page-padding-x);
        grid-template-columns: 1fr 1fr;
      }
    }
  }
}
</style>
