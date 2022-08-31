<template>
  <div>
    <slot>
      <p class="text-sm">
        {{ showTime }}
      </p>
    </slot>
  </div>
</template>

<script setup>
import { computed, onUnmounted, ref, watch } from 'vue'
import dayjs from './utils'

const props = defineProps({
  time: {
    type: Number,
    required: true
  },
  format: {
    type: String,
    default: 'HH:mm:ss'
  }
})

const emits = defineEmits(['finish', 'change'])

/**
 * 开始倒计时
 */
const start = () => {
  close()
  interval = setInterval(() => {
    durationFn()
  }, 1000)
}

//倒计时长
const duration = ref(0)
/**
 * 倒计时行为
 */
const durationFn = () => {
  duration.value -= 1000
  emits('change')
  //监听行为结束
  if (duration.value <= 0) {
    duration.value = 0
    emits('finish')
    close()
  }
}
/**
 * 清理倒计时
 */
let interval = null
const close = () => {
  if (interval) {
    clearInterval(interval)
  }
}
/**
 * 监听开始倒计时的动作
 */
watch(
  () => props.time,
  (value) => {
    duration.value = value
    start()
  },
  { immediate: true }
)

/**
 * 处理显示时间
 */
const showTime = computed(() => {
  return dayjs.duration(duration.value).format(props.format)
})
/**
 * 组件销毁时清理倒计时
 */
onUnmounted(() => {
  close()
})
</script>
