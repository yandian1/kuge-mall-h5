<template>
  <div class="card">
    <div v-if="$slots.header || title" class="card-header">
      <div class="card-header__title">
        <slot v-if="$slots.header" name="header" />
        <template v-else-if="title">{{ title }}</template>
      </div>
      <div class="card-header__more" v-if="more || moreText || moreLink" @click="clickMore">
        <span v-if="moreText" class="text">{{moreText}}</span>
        <svg-icon icon="more" color="#666" />
      </div>
    </div>

    <div v-if="$slots.default" class="card-content">
      <slot />
    </div>

    <div v-if="$slots.footer" class="card-footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts" name="AppCard">
import { useRouter } from "vue-router"

const props = defineProps({
  title: {
    type: String,
  },
  more: {
    type: Boolean,
  },
  moreLink: {
    type: String,
  },
  moreText: {
    type: String,
  },
  clickMore: {
    type: Function
  }
})
const router = useRouter()

const clickMore = () => {
  if (props.clickMore) {
    props.clickMore()
  } else {
    if (props.moreLink) {
      router.push(props.moreLink)
    }
  }
}
</script>

<style lang="less" scoped>
.card {
  padding: var(--card-padding-y) var(--card-padding-x);
  border-radius: var(--card-border-radius);
  background-color: #fff;
  .card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: var(--card-padding-y);
    &__title {
      flex: 1;
    }
    &__more {
      display: flex;
      align-items: center;
      color: var(--font-color-black-l2);
      font-size: var(--font-size--small);
      .text {
        margin-left: 8px;
      }
    }
  }
  .card-footer {
    margin-top: var(--card-padding-y);
    &:empty {
      margin-top: 0;
    }
  }
}
</style>