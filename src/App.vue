<template>
  <div v-show="appStore.pageError" style="padding-top: 200px">
    <app-empty :desc="appStore.pageError" />
  </div>

  <div v-show="!appStore.pageError && appStore.pageSkeleton">
    <component :is="skeletonComponent"/>
  </div>

  <router-view v-slot="{ Component }">
    <keep-alive v-show="!appStore.pageError && !appStore.pageSkeleton" :include="aliveList">
      <component :is="Component"/>
    </keep-alive>

  </router-view>

  <app-tabbar />

  <back-top />

<!--  <go-back />-->

  <safe-area position="bottom" />
</template>

<script setup lang="ts">
import { computed, onBeforeMount, onMounted } from "vue"
import { useRoute } from "vue-router"
import VConsole from 'vconsole'
import { useAppStore } from "@/store/app"
import { useUserStore } from "@/store/user"
import skeletonMap from '@/views/skeleton'


const route = useRoute()
const appStore = useAppStore()
const userStore = useUserStore()
const skeletonComponent = computed(() => skeletonMap[route.name as string])
const aliveList = ['Home', 'Category', 'Cart', 'My']

onMounted(() => {
  setTimeout(() => {
    // if (import.meta.env.DEV || route.query.debug === '1') {
    //   new VConsole()
    // }
  })
})

onBeforeMount(() => {
  userStore.token && userStore.getCartCount()
})
</script>

<style>
</style>
