import { Router } from 'vue-router'
// import { useAppStore } from "@/store/app"


export function installGuard(router: Router) {
  router.beforeEach(() => {
    // const appStore = useAppStore()
    // appStore.pageSkeleton = false
    // appStore.pageError = ''

    return true
  })

  router.afterEach((to) => {
    document.title = to.meta.title!
  })
}
