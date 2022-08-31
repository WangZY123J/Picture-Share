<template>
  <div class="relative">
    <input
      v-if="type === 'text'"
      class="border-gray-200 dark:border-zinc-600 dark:bg-zinc-800 duration-100 dark:text-zinc-400 border-[1px] outline-0 py-0.5 px-1 text-sm rounded-sm focus:border-blue-400 w-[100%]"
      type="text"
      v-model="text"
      :maxlength="max"
    />

    <textarea
      v-if="type === 'textarea'"
      v-model="text"
      :maxlength="max"
      rows="5"
      class="border-gray-200 dark:border-zinc-600 dark:bg-zinc-800 duration-100 dark:text-zinc-400 border-[1px] outline-0 py-0.5 px-1 text-sm rounded-sm focus:border-blue-400 w-[100%]"
    ></textarea>

    <span
      v-if="max"
      class="absolute right-1 bottom-0.5 text-zinc-400 text-xs"
      :class="{ 'text-red-700': currentNumber === parseInt(max) }"
      >{{ currentNumber }} / {{ max }}</span
    >
  </div>
</template>

<script setup>
import { useVModel } from '@vueuse/core'
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'text',
    validator(val) {
      const arr = ['text', 'textarea']
      const result = arr.includes(val)
      if (!result) {
        throw new Error(`type 类型必须在可选范围内 [${arr.join('、')}]`)
      }
      return result
    }
  },
  max: {
    type: [String, Number]
  }
})

const emits = defineEmits(['update:modelValue'])
//输入的字符串
const text = useVModel(props)
//输入的字符数
const currentNumber = computed(()=>{
  return text.value.length
})
</script>
