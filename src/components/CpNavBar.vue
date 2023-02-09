<script setup lang="ts">
// 需求:
// 1.实现点击返回按钮,返回上一个页面(历史记录)
// 2.暴露一个props属性,title设置标题
// 3.暴露一个props属性,rightText 设置标题
// 4.点击右侧的文字按钮,要做的事情是无法确实的.

import router from '@/router'

const props = defineProps<{
  title?: string
  rightText?: string
  back?: () => void
}>()

// 点击左边
const onClickLeft = () => {
  if (props.back) {
    return props.back()
  }
  if (history.state?.back) {
    router.back()
  } else {
    router.push('/')
  }
}
const emit = defineEmits<{
  (e: 'click-right'): void
}>()

// 点击右边
const onClickRight = () => {
  emit('click-right')
}
</script>

<template>
  <van-nav-bar
    :title="title"
    :right-text="rightText"
    left-arrow
    fixed
    @click-left="onClickLeft"
    @click-right="onClickRight"
  />
</template>

<style lang="scss" scoped>
:deep() {
  .van-nav-bar {
    &__arrow {
      font-size: 18px;
      color: var(--cp-text1);
    }
    &__text {
      font-size: 15px;
    }
  }
}
</style>
