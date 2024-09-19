import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import home from '@/views/home/index.vue'
import category from '@/views/category/index.vue'
import cart from '@/views/cart/index.vue'
import my from '@/views/my/index.vue'
import search from '@/views/search/index.vue'
import searchResult from '@/views/searchResult/index.vue'
import goods from '@/views/goods/index.vue'
import confirmOrder from '@/views/confirmOrder/index.vue'
import pay from '@/views/pay/index.vue'
import payResult from '@/views/pay/result.vue'
import profile from '@/views/profile/index.vue'
import nickname from '@/views/profile/nickname.vue'
import phone from '@/views/profile/phone.vue'
import order from '@/views/order/index.vue'
import orderDetail from '@/views/order/detail.vue'
import afterSale from '@/views/afterSale/index.vue'
import afterSaleApply from '@/views/afterSale/apply.vue'
import afterSaleDetail from '@/views/afterSale/detail.vue'
import address from '@/views/address/index.vue'
import addressDetail from '@/views/address/detail.vue'
import coupon from '@/views/coupon/index.vue'
import seckill from '@/views/seckill/index.vue'
import activity from '@/views/activity/index.vue'
import login from '@/views/login/index.vue'
import register from '@/views/register/index.vue'
import { installGuard } from "@/router/guard"

const routes = [
  { path: '/', name: 'Home', component: home, meta: { title: import.meta.env.VITE_APP_TITLE } },
  { path: '/category', name: 'Category', component: category, meta: { title: '分类' } },
  { path: '/cart', name: 'Cart', component: cart, meta: { title: '购物车' } },
  { path: '/my', name: 'My', component: my, meta: { title: '我的' } },
  { path: '/search', name: 'Search', component: search, meta: { title: '搜索' } },
  { path: '/searchResult', name: 'SearchResult', component: searchResult, meta: { title: '搜索' } },
  { path: '/goods/:id', name: 'Goods', component: goods, meta: { title: '商品详情' } },
  { path: '/confirmOrder', name: 'ConfirmOrder', component: confirmOrder, meta: { title: '确认订单' } },
  { path: '/pay', name: 'Pay', component: pay, meta: { title: '支付' } },
  { path: '/payResult', name: 'PayResult', component: payResult, meta: { title: '支付结果' } },
  { path: '/profile', name: 'Profile', component: profile, meta: { title: '个人信息' } },
  { path: '/profile/nickname', name: 'Nickname', component: nickname, meta: { title: '昵称' } },
  { path: '/profile/phone', name: 'Phone', component: phone, meta: { title: '设置手机号' } },
  { path: '/order/list', name: 'OrderList', component: order, meta: { title: '订单列表' } },
  { path: '/order/detail/:id', name: 'OrderDetail', component: orderDetail, meta: { title: '订单详情' } },
  { path: '/afterSale/list', name: 'AfterSaleList', component: afterSale, meta: { title: '售后列表' } },
  { path: '/afterSale/apply', name: 'AfterSaleApply', component: afterSaleApply, meta: { title: '申请售后' } },
  { path: '/afterSale/detail/:id', name: 'AfterSaleDetail', component: afterSaleDetail, meta: { title: '售后详情' } },
  { path: '/address/list', name: 'AddressList', component: address, meta: { title: '地址列表' } },
  { path: '/address/add', name: 'AddressAdd', component: addressDetail, meta: { title: '添加地址' } },
  { path: '/address/edit', name: 'AddressEdit', component: addressDetail, meta: { title: '修改地址' } },
  { path: '/coupon/list', name: 'CouponList', component: coupon, meta: { title: '优惠券' } },
  { path: '/seckill/:id', name: 'Seckill', component: seckill, meta: { title: '秒杀活动' } },
  { path: '/activity/:id', name: 'Activity', component: activity, meta: { title: '活动详情' } },
  { path: '/login', name: 'Login', component: login, meta: { title: '登录' } },
  { path: '/register', name: 'Register', component: register, meta: { title: '注册' } },
] as RouteRecordRaw[]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    // 始终滚动到顶部
    return { top: 0 }
  },
})

installGuard(router)

export default router
