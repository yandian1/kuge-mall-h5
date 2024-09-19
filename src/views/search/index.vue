<template>
  <div class="page page-pad page-grey">
    <app-search placeholder="请输入搜索关键词" @search="search" autofocus show-search />

    <div class="history" v-if="userStore.searchHistory?.length">
      <div class="head">
        <span>搜索历史</span>
        <van-icon name="delete-o" size="17" @click="clearHistory" />
      </div>
      <div class="body">
        <div class="item" v-for="(item, index) in userStore.searchHistory" :key="index" @click="clickHistory(item)">{{ item }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="Search">
import { useRouter } from "vue-router"
import { showConfirmDialog } from "vant"
import { useUserStore } from '@/store/user'

const router = useRouter()
const userStore = useUserStore()

const search = (value: string) => {
  if (value) {
    userStore.addSearchHistory(value)
    router.push({ name: 'SearchResult', query: { search: value } })
  }
}

const clearHistory = () => {
  showConfirmDialog({
    message: '删除全部搜索历史？',
  })
    .then(() => {
      userStore.removeSearchHistory()
    })
    .catch(() => {
    })
}

const clickHistory = (item: string) => {
  router.push({ name: 'SearchResult', query: { search: item } })
}
</script>

<style lang="less" scoped>
.page {
  .history {
    margin-top: calc(6 * var(--grid-size));

    .head {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .body {
      display: flex;
      margin-top: calc(4 * var(--grid-size));

      .item {
        padding: 6px 10px;
        border-radius: 10px;
        background-color: #fff;
        margin-right: 10px;
        margin-bottom: 10px;
        color: var(--font-color-black-l2);

        &:last-child {
          margin-right: 0;
        }
      }
    }
  }
}
</style>
