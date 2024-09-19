<template>
  <div class="page page-grey page-pad">

    <div class="shop-list">
      <app-list :list-api="getCartList" ref="listRef">
        <template #empty>
          <app-empty style="padding-top: 200px" >
            <template #img>
              <svg-icon icon="empty-cart" :size="80" color="#666" />
            </template>
            <van-button type="primary" size="small" style="border-radius: 30px; height: 26px; margin-top: 20px" @click="router.push('/')">
              去逛逛~
            </van-button>
          </app-empty>
        </template>

        <template #item="{ item: shopItem }">
          <order-shop :data="shopItem" class="shop-card" row-gap="calc(7 * var(--grid-size))">
            <template #header>
              <div class="flex-aic" @click="shopToggle(shopItem)">
                <span class="radio">
                  <svg-icon
                    :icon="shopItem.selected ? 'selected' : 'circle'"
                    :color="shopItem.selected ? '#ff0033' : '#afafaf'"
                    :size="18"
                  />
                </span>
                <span>{{ shopItem.name }}</span>
              </div>
            </template>

            <template #orderGoods="{ orderGoods }">
              <van-swipe-cell>
                <div class="cart-goods">
                  <div class="radio">
                    <svg-icon
                      :icon="orderGoods.selected ? 'selected' : 'circle'"
                      :color="orderGoods.selected ? '#ff0033' : '#afafaf'"
                      :size="18"
                      @click="goodsToggle(shopItem, orderGoods)"
                    />
                  </div>
                  <order-goods
                    style="flex: 1"
                    :data="orderGoods"
                    @click="router.push({name: 'Goods', params: { id: orderGoods.spuId }})"
                  >
                    <template #num>
                      <div @click.stop>
                        <van-stepper
                          v-model="orderGoods.num"
                          :max="orderGoods.stock"
                          :before-change="(num: number) => changeCartQuantity(shopItem.id, orderGoods.skuId, num)"
                          integer
                        />
                      </div>
                    </template>
                  </order-goods>
                </div>

                <template #right>
                  <div style="height: 100%; margin-left: calc(2 * var(--grid-size)); border-radius: 6px; overflow: hidden">
                    <van-button square type="danger" text="删除" style="height: 100%; border: none;" @click="delCart(shopItem.id, orderGoods.skuId)"/>
                  </div>
                </template>
              </van-swipe-cell>
            </template>
          </order-shop>
        </template>
      </app-list>
    </div>

    <fix-bar
      ref="fixBarRef"
      :bottom="55"
      :class="{
        'fix-bar': true,
        'frosted': true,
        'cloaking': !cartInfo.shopList?.length
      }"
    >
      <div class="settle-bar">
        <div class="flex-sb-c" @click="totalToggle">
          <span class="radio">
            <svg-icon
              :icon="cartInfo.totalSelected ? 'selected' : 'circle'"
              :color="cartInfo.totalSelected ? '#ff0033' : '#afafaf'"
              :size="18"
            />
          </span>
          <span>全选</span>
        </div>
        <div class="flex-sb-c">
          <span v-if="selectedCount" style="margin: 4px 4px 0 0">已选{{selectedCount}}件</span>
          <span style="margin-top: 4px">合计</span>
          <price style="margin: 0 calc(3 * var(--grid-size)) 0 calc(0.6 * var(--grid-size))" :value="cartInfo.totalPrice" :size="20"/>
          <van-button
            class="btn"
            type="primary"
            :disabled="!selectedCount"
            @click="submit"
          >
            去结算
          </van-button>
        </div>
      </div>
    </fix-bar>
  </div>
</template>

<script setup lang="ts" name="Cart">
import { computed, onActivated, onMounted, ref } from 'vue'
import { showToast } from 'vant'
import { useRouter } from 'vue-router'
import { useAppStore } from "@/store/app"
import { useUserStore } from "@/store/user"
import * as cartApi from '@/api/cart'
import * as CartTypes from '@/api/cart/types'
import { useLoading } from "@/hooks/loading"
import { deepCopy } from "@/utils"

const router = useRouter()
const appStore = useAppStore()
const userStore = useUserStore()
const listRef = ref()
const fixBarRef = ref()
const loadingInstance = useLoading()
const cartInfo = ref<CartTypes.CartInfo>({
  totalPrice: 0,
  totalSelected: false,
  indeterminate: false,
  shopList: [],
})

const getCartList = () => {
  return cartApi
    .getCartInfo()
    .then((res) => {
      cartInfo.value = res.data.data
      const resCopy = deepCopy(res) as Recordable
      resCopy.data.data = {
        list: cartInfo.value.shopList,
        total: cartInfo.value.shopList?.length
      }
      return resCopy
    })
    .catch(() => {
    })
}

const delCart = (shopId: ID, skuId: ID) => {
  if (loadingInstance.isLoading()) return

  loadingInstance.loading()
  cartApi
    .delCart({shopId, skuId})
    .then(() => {
      showToast({
        message: '删除成功',
        type: 'success',
      })
      userStore.getCartCount()
      listRef.value.fetchList().then(() => {
        loadingInstance.clear()
      })
    })
    .catch(() => {
      loadingInstance.clear()
    })
}

const changeCartSelect = (data: Recordable) => {
  if (loadingInstance.isLoading()) return

  loadingInstance.loading()

  cartApi
    .changeCartSelect(data)
    .then(() => {
      listRef.value.fetchList().then(() => {
        loadingInstance.clear()
      })
    })
    .catch(() => {
      loadingInstance.clear()
    })
}

const changeCartQuantity = (shopId: ID, skuId: ID, num: number) => {
  if (typeof num !== 'number' || num <= 0) return Promise.resolve(true)

  if (loadingInstance.isLoading()) return
  loadingInstance.loading()
  
  return cartApi
    .changeCartQuantity({
      shopId,
      skuId,
      quantity: num,
    })
    .then(() => {
      listRef.value.fetchList().then(() => {
        loadingInstance.clear()
      })
      return true
    })
    .catch(() => {
      loadingInstance.clear()
      return false
    })
}

const totalToggle = () => {
  changeCartSelect(cartInfo.value.shopList.map(shopItem => ({
    shopId: shopItem.id,
    goodsList: shopItem.goodsList.map(goods => ({
      skuId: goods.skuId,
      selected: !cartInfo.value.totalSelected,
    }))
  })))
}

const shopToggle = (shopItem: CartTypes.ShopItem) => {
  changeCartSelect([
    {
      shopId: shopItem.id,
      goodsList: shopItem.goodsList.map(goods => ({
        skuId: goods.skuId,
        selected: !shopItem.selected,
      }))
    },
  ])
}

const goodsToggle = (shopItem: CartTypes.ShopItem,goods: CartTypes.CardGoods) => {
  changeCartSelect([
    {
      shopId: shopItem.id,
      goodsList: [
        {
          skuId: goods.skuId,
          selected: !goods.selected,
        }
      ]
    },
  ])
}

const submit = () => {
  if (!selectedCount.value) return

  router.push({
    name: 'ConfirmOrder',
    query: {
      byCart: 1,
    },
  })
}

const selectedCount = computed(() => {
  let count = 0
  cartInfo.value.shopList?.forEach(shop => {
    shop.goodsList?.forEach(goods => {
      if (goods.selected) count++
    })
  })
  return count
})

onMounted(() => {
  appStore.pageSkeleton = true
})

onActivated(() => {
  listRef.value.fetchList().then(() => {
    appStore.pageSkeleton = false
  })
})
</script>

<style lang="less" scoped>
.page {
  padding-bottom: calc(1px + var(--bottom-bar-height) * 2);

  .shop-list {

    .shop-card {
      margin-bottom: calc(3 * var(--grid-size));

      .radio {
        margin: 0 12px 0 2px;
      }

      .cart-goods {
        display: flex;
        align-items: center;
      }

      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  .fix-bar {
    border-top: 1px solid #f7f8f9;

    .settle-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 calc(2 * var(--grid-size) + var(--card-padding-x));

      .radio {
        margin: 0 12px 0 2px;
      }

      .btn {
        width: 80px;
        height: var(--action-button-height);
        border-radius: var(--action-button-radius);
      }
    }

    &.cloaking {
      opacity: 0;
      pointer-events: none;
    }
  }
}
</style>
