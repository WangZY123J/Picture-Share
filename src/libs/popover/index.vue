<template>
  <div class="relative" @mouseenter="onMouseenter" @mouseleave="onMouseleave">
    <div ref="referenceTarget">
      <slot name="reference" />
    </div>

    <!-- 气泡展示动画 -->
    <transition name="slide">
      <div
        ref="contentTarget"
        v-show="isVisible"
        class="absolute p-1 z-20 bg-white dark:bg-zinc-900 border dark:border-zinc-700 rounded-md"
        :style="contentStyle"
      >
        <slot />
      </div>
    </transition>
  </div>
</template>

<script>
const placementEnum = ['left-top', 'left-bottom', 'right-top', 'right-bottom']
</script>

<script setup>
import { nextTick, ref, watch } from 'vue'

const props = defineProps({
  placement: {
    type: String,
    default: 'left-bottom',
    validator(val) {
      const result = placementEnum.includes(val)
      if (!result) {
        throw new Error(`所选位置不是${placementEnum.join('、')}中的一个。`)
      }
      return result
    }
  }
})

//计算元素尺寸
const referenceTarget = ref(null)
const contentTarget = ref(null)
const getElementSize = (target) => {
  if (!target) return {}
  return {
    width: target.offsetWidth,
    height: target.offsetHeight
  }
}

//计算弹层位置
const contentStyle = ref({
  top: 0,
  left: 0
})

//控制menu展示
const isVisible = ref(false)

//监听展示的变化，在展示时计算气泡位置
watch(isVisible, (val) => {
  if (!val) return
  //渲染成功之后
  nextTick(() => {
    switch (props.placement) {
      //左上
      case 'left-top':
        contentStyle.value.top = 0
        contentStyle.value.left =
          -getElementSize(contentTarget.value).width + 'px'
        break

      //右上
      case 'right-top':
        contentStyle.value.top = 0
        contentStyle.value.left =
          getElementSize(referenceTarget.value).width + 'px'
        break

      //左下
      case 'left-bottom':
        contentStyle.value.top =
          getElementSize(referenceTarget.value).height + 'px'
        contentStyle.value.left =
          -getElementSize(contentTarget.value).width + 'px'
        break

      //右下
      case 'right-bottom':
        contentStyle.value.top =
          getElementSize(referenceTarget.value).height + 'px'
        contentStyle.value.left =
          getElementSize(referenceTarget.value).width + 'px'
        break
    }
  })
})

//控制延迟关闭
let timeout = null

//鼠标移入触发事件
const onMouseenter = () => {
  isVisible.value = true
  //鼠标移出弹层还没消失，鼠标再次移入，清理延时装置
  if (timeout) {
    clearTimeout(timeout)
  }
}

//鼠标移出触发事件
const onMouseleave = () => {
  //延时装置
  timeout = setTimeout(() => {
    isVisible.value = false
    timeout = null
  }, 100)
}
</script>

<style lang="scss" scoped>
.slide-enter-active {
  transition: opacity 0.3s, transform 0.3s;
}

.slide-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>
