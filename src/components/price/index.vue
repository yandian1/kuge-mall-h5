<template>
  <span :class="{
    price: true,
    'price-bold': bold,
    'price-line': lineThrough,
    'price-wave': lineThrough ? false : wave
  }">
    <span class="symbol">￥</span>
    <span class="integer">{{ integer }}</span>
    <span class="decimal" v-if="decimal">.{{ decimal }}</span>
  </span>
</template>

<script setup lang="ts" name="Price">
import {computed, ref, watch} from "vue"
import { stylePxToVw } from "@/utils/style2vw"

const props = defineProps({
  value: {
    type: [String, Number],
  },
  decimal: {
    type: Number,
    default: 2,
  },
  lineThrough: {
    type: Boolean,
  },
  wave: {
    type: Boolean,
    default: true,
  },
  size: {
    type: Number,
    default: 16,
  },
  bold: {
    type: Boolean,
    default: false,
  },
})

const integer = ref('0')
const decimal = ref('.00')
const baseSize = computed(() => stylePxToVw(props.size + 'px'))

watch(() => props.value, (newVal) => {
  newVal = String(newVal)

  if (newVal === 'null' || newVal === 'undefined' || newVal.trim() === '') {
    // 空值
    integer.value = '0'
    decimal.value = '0'.repeat(props.decimal)
  } else if (newVal.indexOf(".") === -1) {
    // 无小数点
    integer.value = newVal
    decimal.value = '0'.repeat(props.decimal)
  } else {
    // 有小数点
    let [int, dec] = newVal.split('.')

    // 不保留小数
    if (props.decimal === 0) {
      integer.value = int
      decimal.value = ''
    } else {
      // 保留小数
      if (dec.length > props.decimal) {
        dec = dec.slice(0, props.decimal)
      }
      if (dec.length < props.decimal) {
        dec = dec.padEnd(props.decimal, '0')
      }
      integer.value = int
      decimal.value = dec
    }
  }
}, {
  immediate: true
})
</script>

<style lang="less" scoped>
.price {
  color: var(--font-color-red);
  font-size: v-bind(baseSize);
  &-line {
    text-decoration: line-through;
    color: var(--font-color-black-l3);
    .symbol {
      font-size: 1em;
    }
    .integer {
      font-size: 1em;
    }
    .decimal {
      font-size: 1em;
    }
  }
  &-bold {
    font-weight: bold;
  }
  &-wave {
    .symbol {
      font-size: 0.64em;
    }
    .integer {
      font-size: 1em;
    }
    .decimal {
      font-size: 0.74em;
    }
  }
}
</style>