<template>
  <div>
    <van-popup v-model:show="show" round closeable position="bottom">
      <div class="header">
        <app-image :src="info.firstImg" class="img" fit="cover" preview/>
        <div class="text">
          <price :value="curSku.price" :size="20"/>
          <price :value="curSku.linePrice" :size="12" class="ml-6" line-through/>
          <div class="selected">已选：{{ Object.values(JSON.parse(curSku.attrs || '{}')).join(',') }}</div>
        </div>
      </div>

      <div class="body">
        <div class="attrs">
          <div class="attr" v-for="(attr, index) in info.attrs" :key="index">
            <div class="attr-type">{{ attr.name }}</div>
            <div class="attr-values">
              <div
                :class="{
                  'attr-values__item': true,
                  'attr-values__item--disabled': !clickable(attr.name, child.name),
                  'attr-values__item--selected': curAttrs[attr.name] === child.name,
                }"
                v-for="(child, childIdx) in attr.children" :key="childIdx"
                @click="clickAttr(attr.name, child.name)"
              >
                {{ child.name }}
              </div>
            </div>
          </div>
        </div>
        <div class="quantity">
          <div class="title">数量</div>
          <div class="stepper">
            <van-stepper v-model="quantity" :max="curSku.stock" integer/>
          </div>
        </div>
      </div>

      <div class="footer safe-padding-bottom">
        <van-button
          class="btn"
          type="primary"
          loading-text="确定"
          :disabled="confirmLoading"
          :loading="confirmLoading"
          @click="submit"
          block
        >
          确定
        </van-button>
      </div>
    </van-popup>
  </div>
</template>

<script setup lang="ts" name="GoodsSku">
import { ref, watch } from 'vue'
import { showToast } from 'vant'
import { useRouter } from 'vue-router'
import { useUserStore } from "@/store/user"
import * as cartApi from '@/api/cart'
import * as SpuTypes from '@/api/product/spu/types'
import { deepCopy } from '@/utils'

const props = withDefaults(
  defineProps<{
    info: SpuTypes.SpuDetail
    mode: string
  }>(),
  {
    info: () => ({
      id: '',
      name: '',
      price: 0,
      firstImg: '',
      detail: '',
      services: [],
      imgList: [],
      skus: [],
      attrs: [],
    }),
    mode: 'buy',
  }
)
const router = useRouter()
const userStore = useUserStore()
const baseSku = {
  id: '',
  name: '',
  price: undefined,
  linePrice: undefined,
  img: '',
  attrs: '',
  stock: 0,
} as SpuTypes.Sku
const show = defineModel<boolean>('show')
const selected = defineModel<Recordable>('selected')
const quantity = ref(1)
const confirmLoading = ref(false)
const curSku = ref(deepCopy(baseSku))
const curAttrs = ref<Recordable>({})

const clickAttr = (spuAttrName: string, subAttrName: string) => {
  // 判断是选中还是取消
  // 取消
  if (curAttrs.value[spuAttrName] === subAttrName) {
    delete curAttrs.value[spuAttrName]
  } else {
    curAttrs.value[spuAttrName] = subAttrName
  }

  // 判断是否所有属性都已经选择
  // 是
  if (Object.keys(curAttrs.value).length === props.info.attrs.length) {
    // 将 curSku 设置为包含当前所有属性值的 sku
    // 寻找匹配值的 sku，将其设置为 curSku
    curSku.value = props.info.skus.find((sku) => {
      const attrs = JSON.parse(sku.attrs)

      for (const key in curAttrs.value) {
        if (attrs[key] !== curAttrs.value[key]) {
          return false
        }
      }

      return true
    })!
  } else {
    // 否
  }
}

// 该方法保证可点击的属性都能找到有存库的 sku
const clickable = (spuAttrName: string, subAttrName: string) => {
  // 所有 sku 都没有库存时，所有属性都禁用
  if (curSku.value.stock < 1) {
    return false
  }

  // 如果存在包含当前属性，且有库存的 sku，则允许选中，否则不允许
  const newAttrs = deepCopy(curAttrs.value)
  newAttrs[spuAttrName] = subAttrName

  return props.info.skus.some((sku) => {
    const attrs = JSON.parse(sku.attrs)

    for (const key in newAttrs) {
      if (attrs[key] !== newAttrs[key]) {
        return false
      }
    }

    if (sku.stock < 1) return false

    return true
  })
}

const addCart = () => {
  if (confirmLoading.value) return
  confirmLoading.value = true
  cartApi
    .addCart({
      skuId: curSku.value.id,
      quantity: quantity.value,
    })
    .then(() => {
      confirmLoading.value = false
      userStore.getCartCount()
      showToast({
        message: '加入购物车成功',
        type: 'text',
      })
      show.value = false
    })
    .catch(() => {
      confirmLoading.value = false
    })
}

const submit = () => {
  console.log("submit-mode", props.mode)
  // 有属性没有选择，进行提示
  const curAttrsKeys = Object.keys(curAttrs.value)
  if (curAttrsKeys.length !== props.info.attrs.length) {
    for (const attr of props.info.attrs) {
      if (curAttrsKeys.every((key) => key !== attr.name)) {
        showToast({
          message: '请选择' + attr.name,
          type: 'text',
        })
        return
      }
    }
  }

  if (props.mode === 'cart') {
    addCart()
  } else {
    router.push({
      name: 'ConfirmOrder',
      query: {
        id: curSku.value.id,
        num: quantity.value,
      },
    })
  }
}

watch(
  () => props.info,
  () => {
    // 1. 所有 sku 都没有库存，所有属性都不可点击
    // 2. 存在有库存的 sku，选中一个有库存的 sku，在选择属性时，判断对应的 sku 是否有库存，有的话可以点击，否则不能点击
    curSku.value = props.info.skus.find((sku) => sku.stock > 0) || deepCopy(baseSku)
    if (curSku.value.stock > 0) {
      curAttrs.value = JSON.parse(curSku.value.attrs || '{}')
    }
  },
  {
    immediate: true,
  }
)

watch(curSku, () => {
  selected.value = curSku.value
}, { immediate: true })
</script>

<style lang="less" scoped>
:deep(.van-popup) {
  display: flex;
  flex-direction: column;
  min-height: 70%;
  max-height: 80%;
  padding: var(--bottom-button-offset) calc(5 * var(--grid-size));

  .header {
    display: flex;
    align-items: center;

    .img {
      width: 90px;
      height: 90px;
      border-radius: 6px;
      overflow: hidden;
    }

    .text {
      flex: 1;
      margin-left: calc(3 * var(--grid-size));

      .selected {
        margin-top: calc(3 * var(--grid-size));
        color: var(--font-color-black-l2);
        font-size: var(--font-size--small);
      }
    }
  }

  .body {
    flex: 1;
    overflow-y: auto;
    margin: 28px 0 20px;

    .attrs {
      .attr {
        margin-bottom: calc(6 * var(--grid-size));

        &-type {
          margin-bottom: calc(3.5 * var(--grid-size));
          color: var(--font-color-black-l1);
          font-size: var(--font-size--large);
        }

        &-values {
          display: flex;
          flex-wrap: wrap;

          &__item {
            padding: 5px 8px;
            margin-right: 8px;
            margin-bottom: 8px;
            border: 1px solid #cdcdcd;
            border-radius: 30px;
            font-size: var(--font-size--small);
            color: #666;

            &--disabled {
              pointer-events: none;
              filter: grayscale(1);
              background-color: rgba(0, 0, 0, .05);
            }

            &--selected {
              border-color: var(--font-color-red);
              color: var(--font-color-red);
              font-size: var(--font-size--small);
            }

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

    .quantity {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: calc(5 * var(--grid-size));
      .title {
        font-size: var(--font-size--large);
        color: var(--font-color-black-l1);
      }
    }
  }

  .footer {
    .btn {
      height: var(--action-button-height);
      border-radius: var(--action-button-radius);
    }
  }
}
</style>
