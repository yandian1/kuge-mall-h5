<template>
  <div class="app-search">
    <svg-icon
      icon="search"
      :size="18"
      color="#666"
    />

    <div
      v-if="mode === 'static'"
      class="placeholder"
    >
      {{placeholder}}
    </div>

    <app-input
      v-else
      ref="inputRef"
      v-model="modelValue"
      class="input"
      :placeholder="placeholder"
      @enter="emits('search', modelValue)"
    />

    <div
      v-if="showSearch"
      class="btn"
      @click="mode !== 'static' && emits('search', modelValue)"
    >
      搜索
    </div>
  </div>
</template>

<script setup lang="ts" name="AppSearch">
import { onMounted, ref } from "vue"

const props = defineProps({
  autofocus: {
    type: Boolean,
    default: false,
  },
  showSearch: {
    type: Boolean,
    default: false,
  },
  mode: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
})
const inputRef = ref()
const emits = defineEmits(['search'])
const modelValue = defineModel<string>('modelValue')

onMounted(() => {
  props.autofocus && props.mode !== 'static' && inputRef.value?.focus()
})
</script>

<style lang="less" scoped>
.app-search {
  position: relative;
  display: flex;
  align-items: center;
  height: var(--search-height);
  padding-left: calc(2 * var(--grid-size));
  padding-right: calc(2 * var(--grid-size));
  border-radius: 15px;
  background-color: #fff;

  .input {
    flex: 1;
    padding: 0;
    margin-left: 4px;
    font-size: var(--font-size--default);
    color: var(--font-color-black-l1);

    &::placeholder {
      color: var(--font-color-black-l2);
      font-size: var(--font-size--default);
    }
  }

  .placeholder {
    flex: 1;
    padding: 0;
    margin-left: 4px;
    font-size: var(--font-size--default);
    color: var(--font-color-black-l2);
  }

  .clear {
    position: absolute;
    z-index: 1;
    top: 50%;
    transform: translateY(-50%);
  }

  .btn {
    padding: 6px 10px;
    background-color: var(--red);
    border-radius: calc(4 * var(--grid-size));
    color: #fff;
  }
}
</style>