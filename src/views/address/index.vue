<template>
  <div class="page page-pad page-grey">
    <div class="body safe-padding-bottom">
      <app-list :list-api="getAddressList" ref="listRef">
        <template #item="{ item }">
          <van-swipe-cell>
            <app-card
              :class="{
              'address-card': true,
              'address-card--selected': item.id === id
            }"
              @click="id && clickCard(item.id)"
            >
              <div class="address-card__content">
                <div class="user">
                  <div class="name">{{ item.name }}</div>
                  <div class="phone">{{ item.phone }}</div>
                  <div class="tag" v-if="item.isDefault">默认</div>
                </div>
                <div class="address">{{ item.province }}{{ item.city }}{{ item.county }}{{ item.detail }}</div>
              </div>
              <div class="address-card__footer">
                <div class="selected" @click.stop="setDefaultAddress(item)">
                  <svg-icon
                    :icon="item.isDefault ? 'selected' : 'circle'"
                    :color="item.isDefault ? '#ff0033' : '#afafaf'"
                    :size="18"
                  />
                  <span class="text">{{ item.isDefault ? '已设为默认' : '默认收货地址' }}</span>
                </div>
                <div class="btn-group">
                  <div class="btn" @click.stop="onDel(item)">删除</div>
                  <div class="btn" @click.stop="onEdit(item)">修改</div>
                </div>
              </div>
            </app-card>

            <template #right>
              <div style="height: 100%; margin-left: 6px; border-radius: var(--card-border-radius); overflow: hidden">
                <van-button square type="danger" text="删除" style="height: 100%; border: none;" @click.stop="onDel(item)"/>
              </div>
            </template>
          </van-swipe-cell>
        </template>
      </app-list>
    </div>

    <div class="footer safe-padding-bottom">
      <van-button
        class="btn"
        type="primary"
        @click="onAdd"
        block
      >
        新增收货地址
      </van-button>
    </div>
  </div>
</template>

<script setup lang="ts" name="AddressList">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { showConfirmDialog, showToast } from 'vant'
import { useOrderStore } from "@/store/order"
import * as addrApi from '@/api/member/address'
import * as AddrTypes from "@/api/member/address/types"
import { deepCopy } from "@/utils"
import { useLoading } from "@/hooks/loading"

const route = useRoute()
const router = useRouter()
const orderStore = useOrderStore()
const loadingInstance = useLoading()
const id = route.query.id ? parseFloat(route.query.id as string) : undefined
const listRef = ref()

const onAdd = () => {
  router.push({
    name: 'AddressAdd',
  })
}

const onDel = (data: AddrTypes.Address) => {
  showConfirmDialog({
    message: '确认删除该地址',
  })
    .then(() => {
      delAddress(data.id)
    })
    .catch(() => {
    })
}

const onEdit = (data: AddrTypes.Address) => {
  router.push({
    name: 'AddressEdit',
    query: {
      id: data.id,
    },
  })
}

const clickCard = (id: ID) => {
  orderStore.addressId = id
  router.back()
}

const getAddressList = () => {
  return addrApi
    .getAddressList()
    .then((res) => {
      const data = res.data.data
      const resCopy = deepCopy(res) as Recordable
      resCopy.data.data = {
        list: data,
        total: data?.length
      }
      return resCopy
    })
    .catch(() => {
    })
}

const delAddress = (id: ID) => {
  if (loadingInstance.isLoading()) return

  loadingInstance.loading()
  addrApi
    .delAddress(id)
    .then(() => {
      loadingInstance.clear()
      showToast({
        message: '删除地址成功',
        type: 'success',
      })
      listRef.value.fetchList()
    })
    .catch(() => {
      loadingInstance.clear()
    })
}

const setDefaultAddress = (data: Recordable) => {
  if (data.isDefault) return

  if (loadingInstance.isLoading()) return

  loadingInstance.loading()
  addrApi
    .setDefaultAddress(data.id)
    .then(() => {
      loadingInstance.clear()
      showToast({
        message: '设置默认地址成功',
        type: 'success'
      })
      listRef.value.fetchList()
    })
    .catch(() => {
      loadingInstance.clear()
    })
}

const init = () => {
  listRef.value.init()
}

onMounted(() => {
  init()
})
</script>

<style lang="less" scoped>
.page {
  padding-bottom: calc(var(--action-button-height) + var(--bottom-button-offset));
  .body {
    .address-card {
      padding-left: 0;
      padding-right: 0;
      margin-bottom: calc(2 * var(--grid-size));

      &__content {
        padding-left: var(--card-padding-x);
        padding-right: var(--card-padding-x);
        padding-bottom: var(--card-padding-x);

        .user {
          display: flex;
          align-items: center;

          .name {
            font-size: var(--font-size--large);
          }

          .phone {
            font-size: var(--font-size--large);
            margin: 0 calc(2 * var(--grid-size));
          }

          .tag {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 40px;
            height: 20px;
            margin-right: var(--grid-size);
            border-radius: 6px;
            background-color: var(--font-color-red);
            font-size: 12px;
            color: #fff;
          }
        }

        .address {
          margin-top: calc(2.5 * var(--grid-size));
          color: var(--font-color-black-l2);
        }
      }

      &__footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-left: var(--card-padding-x);
        padding-right: var(--card-padding-x);
        padding-top: var(--card-padding-x);
        border-top: 1px solid #f7f8f9;

        .selected {
          display: flex;
          align-items: center;

          .text {
            margin-left: calc(2 * var(--grid-size));
          }
        }

        .btn-group {
          display: flex;

          .btn {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 40px;
            height: 22px;
            border: 1px solid var(--btn-border-color);
            border-radius: 22px;
            margin-right: calc(2 * var(--grid-size));

            &:last-child {
              margin-right: 0;
            }
          }
        }
      }

      &--selected {
        border: 1px solid red;
      }

      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  .footer {
    position: fixed;
    z-index: 1;
    left: var(--page-padding-x);
    right: var(--page-padding-x);
    bottom: var(--bottom-button-offset);

    .btn {
      height: var(--action-button-height);
      border-radius: var(--action-button-radius);
    }
  }
}
</style>
