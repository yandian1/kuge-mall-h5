<template>
  <div class="app-input" ref="wrapperRef">
    <input
      ref="inputRef"
      class="input"
      v-model="modelValue"
      :placeholder="placeholder"
      @keydown="onKeyDown"
      @focus="focus"
      v-bind="$attrs"
    />

    <van-icon
      v-if="modelValue"
      name="close"
      size="18"
      color="#666"
      class="clear"
      @click="modelValue = ''"
    />
  </div>
</template>

<script setup lang="ts" name="AppInput">
import { ref } from "vue"
import { useClickAway } from '@vant/use'

defineProps({
  placeholder: {
    type: String,
    default: '',
  },
  clearable: {
    type: Boolean,
    default: false,
  }
})
const emits = defineEmits(['enter'])
const modelValue = defineModel<string | number>('modelValue')
const status = ref('')
const wrapperRef = ref<HTMLDivElement>()
const inputRef = ref<HTMLInputElement>()

useClickAway(wrapperRef, () => {
  status.value = 'blur'
});

const onKeyDown = (event: Recordable) => {
  if (event.keyCode === 13) {
    emits('enter', modelValue.value)
  }
}

const focus = () => {
  status.value = 'focus'
  inputRef.value?.focus()
}

defineExpose({ focus })
</script>

<style lang="less" scoped>
.app-input {
  position: relative;
  .input {
    width: 100%;
  }
  .clear {
    position: absolute;
    right: calc(3 * var(--grid-size));
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>