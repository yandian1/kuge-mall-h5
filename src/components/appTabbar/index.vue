<template>
  <fix-bar
    v-if="showTabbar"
    :class="{
      tabbar: true,
      tabbar_no_border: route.path === '/cart',
      frosted: true,
    } "
  >
    <div class="tabs">
      <div class="tabs-item" v-for="(tab, index) in tabs" :key="index" @click="clickTab(index)">
        <van-badge :content="userStore.cartCount" v-if="tab.icon === 'cart' && userStore.cartCount">
          <svg-icon
            :icon="tab.icon"
            :size="18"
            :color="activeIdx === index ? '#ff0033' : '#333'"
          />
        </van-badge>
        <svg-icon
          v-else
          :icon="tab.icon"
          :size="18"
          :color="activeIdx === index ? '#ff0033' : '#333'"
        />

        <div
          class="text"
          :style="{
            color: activeIdx === index ? '#ff0033' : '#333'
          }"
        >
          {{ tab.text }}
        </div>
      </div>
    </div>
  </fix-bar>
</template>

<script setup lang="ts" name="AppTabbar">
import { computed, ref, watchEffect } from "vue"
import { useRoute, useRouter } from "vue-router"
import { useUserStore } from "@/store/user"

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

const tabs = [
  {
    icon: 'home',
    text: '首页',
    url: '/',
  },
  {
    icon: 'category',
    text: '分类',
    url: '/category',
  },
  {
    icon: 'cart',
    text: '购物车',
    url: '/cart',
  },
  {
    icon: 'my',
    text: '我的',
    url: '/my',
  },
]
const activeIdx = ref(-1)
const showTabbar = computed(() => ['/', '/category', '/cart', '/my'].includes(route.path))

const clickTab = (idx: number) => {
  if (idx === activeIdx.value) return
  activeIdx.value = idx
  const tab = tabs[idx]
  router.replace(tab.url)
}

watchEffect(() => {
  const idx = tabs.findIndex(tab => tab.url === route.path)
  if (idx !== -1) {
    activeIdx.value = tabs.findIndex(tab => tab.url === route.path)
  }
})
</script>

<style lang="less" scoped>
.tabbar {
  padding: 0 calc(var(--page-padding-x) + calc(4 * var(--grid-size)));
  border-top: 1px solid #f7f8f9;

  .tabs {
    display: flex;
    justify-content: space-between;
    text-align: center;

    .icon {
      color: var(--font-color-red);
    }

    .text {
      margin-top: 6px;
    }
  }

  &_no_border {
    border-top: none;
  }
}
</style>