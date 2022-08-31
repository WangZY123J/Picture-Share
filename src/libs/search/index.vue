<template>
  <div
    class="group relative p-0.5 rounded-xl border-white duration-500 hover:bg-red-100/40"
    ref="containerTarget"
  >
    <div>
      <!-- 搜索图标 -->
      <m-svg-icon
        class="w-1.5 h-1.5 absolute translate-y-[-50%] top-[50%] left-2"
        name="search"
        color="#707070"
      />
      <!-- 输入框 -->
      <input
        class="block w-full h-[44px] pl-4 text-sm outline-0 bg-zinc-100 dark:bg-zinc-800 caret-zinc-400 rounded-xl text-zinc-900 dark:text-zinc-200 tracking-wide font-semibold border border-zinc-100 dark:border-zinc-700 duration-500 group-hover:bg-white group-hover:border-zinc-200 focus:border-red-300"
        type="text"
        placeholder="搜索"
        v-model="inputValue"
        @keyup.enter="onSearchHandler"
        @focus="onFocusHandler"
        @blur="onBlurHandler"
      />
      <!-- 删除按钮 -->
      <m-svg-icon
        v-show="inputValue"
        name="input-delete"
        class="h-1.5 w-1.5 absolute translate-y-[-50%] top-[50%] right-9 duration-500 cursor-pointer"
        @click="onClearClick"
      ></m-svg-icon>
      <!-- 分割线 -->
      <div
        class="opacity-0 h-1.5 w-[1px] absolute translate-y-[-50%] top-[50%] right-[62px] duration-500 bg-zinc-200 group-hover:opacity-100"
      ></div>
      <!-- TODO: 搜索按钮(通用组件) -->
      <m-button
        class="opacity-0 absolute translate-y-[-50%] top-[50%] right-1 rounded-full duration-600 group-hover:opacity-100"
        icon="search"
        iconColor="#fff"
        @click="onSearchHandler"
      ></m-button>
    </div>
    <!-- 下拉区 -->
    <transition name="slide">
      <div
        v-if="$slots.dropdown"
        v-show="isFocus"
        class="max-h-[368px] w-full text-base overflow-auto bg-white dark:bg-zinc-800 absolute z-20 left-0 top-[56px] p-2 rounded border border-zinc-200 dark:border-zinc-600 duration-200 hover:shadow-3xl scrollbar-thin scrollbar-thumb-transparent xl:scrollbar-thumb-zinc-200 xl:dark:scrollbar-thumb-zinc-900 scrollbar-track-transparent"
      >
        <slot name="dropdown" />
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { onClickOutside, useVModel } from '@vueuse/core'

const props = defineProps({
  modelValue: {
    type: String,
    required: true
  }
})

const emits = defineEmits([
  'update:modelValue',
  'search',
  'clear',
  'input',
  'focus',
  'blur'
])

//更新文本
const inputValue = useVModel(props)

//监听输入行为
watch(inputValue, (val) => {
  emits('input', val)
})

//清空文本
const onClearClick = () => {
  inputValue.value = ''
  emits('clear', '')
}

//触发搜索
const onSearchHandler = () => {
  emits('search', inputValue.value)
}

//监听焦点点击行为
const isFocus = ref(false)
const onFocusHandler = () => {
  isFocus.value = true
  emits('focus')
}

//失去焦点
const onBlurHandler = () => {
  emits('blur')
}

//点击区域外隐藏
const containerTarget = ref(null)
//vueuse 带的
onClickOutside(containerTarget, () => {
  isFocus.value = false
})
</script>

<style lang="scss" scoped>
.slide-enter-active {
  transition: all 0.5s;
}

.slide-leave-active {
  transition: all 0.5s;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateY(40px);
  opacity: 0;
}
</style>
