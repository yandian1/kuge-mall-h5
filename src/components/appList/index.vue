<template>
  <van-pull-refresh
    ref="refreshRef"
    v-model="refreshing"
    @refresh="onRefresh"
    style="min-height: 100vh;"
  >

    <div ref="refreshInnerRef">
      <template v-if="!initIng">
        <slot v-if="!list?.length" name="empty">
          <app-empty style="padding-top: 150px" />
        </slot>

        <van-list
          v-else
          :loading="moreLoading"
          :finished="finished"
          finished-text="没有更多了"
          :immediate-check="false"
          @load="onLoad"
        >
          <div class="app-list">
            <slot name="item" v-for="(item, index) in list" :key="index" :item="item" :index="index" />
          </div>
        </van-list>
      </template>
    </div>
  </van-pull-refresh>
</template>

<script setup lang="ts" name="AppList" generic="Item">
import { ref, reactive, Ref, onUnmounted } from 'vue'
import { AxiosResponse } from "axios"
import { useLoading } from "@/hooks/loading"

const props = withDefaults(
  defineProps<{
    listApi: (params: Recordable) => Promise<AxiosResponse<R<PageData<Item>>, any>>
    params?: Recordable
  }>(),
  {
    params: () => ({}),
  }
)
const loadingInstance = useLoading()
const pager = reactive({
  pageNum: 1,
  pageSize: 10,
})
const list = ref<Item[]>([]) as Ref<Item[]>
const total = ref(0)
const initIng = ref(false)
const moreLoading = ref(false)
const finished = ref(false)
const refreshing = ref(false)
const refreshRef = ref()
const refreshInnerRef = ref()

const fetchList = (append: boolean = false) => {
  return props.listApi({...props.params, ...pager})
    .then((res) => {
      const data = res.data.data
      total.value = data.total
      if (append) {
        list.value = [...list.value, ...data.list]
      } else {
        list.value = data.list
      }
      finished.value = list.value?.length >= total.value
    })
    .catch(() => {
    })
}

const startOnFirstPage = () => {
  if (loadingInstance.isLoading()) return
  loadingInstance.loading()
  pager.pageNum = 1
  fetchList()
    .then(() => {
      loadingInstance.clear()
    })
}

const onLoad = async () => {
  if (refreshing.value) return
  pager.pageNum++
  moreLoading.value = true
  fetchList(true)
    .then(() => {
      moreLoading.value = false
    })
}

const onRefresh = () => {
  pager.pageNum++
  pager.pageNum = 1
  moreLoading.value = false
  finished.value = false
  fetchList(false)
    .then(() => {
      refreshing.value = false
    })
}

const init = () => {
  initIng.value = true
  loadingInstance.loading()
  fetchList().then(() => {
    initIng.value = false
    loadingInstance.clear()
  })
}

onUnmounted(() => {
  loadingInstance.clear()
})

defineExpose({ init, fetchList, startOnFirstPage })
</script>

<style lang="less" scoped></style>
