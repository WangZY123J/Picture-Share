<template>
  <div class="py-2 h-[80vh] flex flex-col">
    <h2 class="text-xl text-center text-zinc-900 dark:text-zinc-200 font-bold mb-2 px-1">
      选择支付方式
    </h2>
    <!-- 支付宝 -->
    <div
      class="flex items-center px-3 py-2 border-b border-b-zinc-200 dark:border-b-zinc-600 active:bg-zinc-200 dark:active:bg-zinc-900"
       @click="onAliPayClick"
    >
      <img class="w-4 h-4" src="@/assets/images/alipay.png" alt="" />
      <p class="text-xl ml-2 text-zinc-800 dark:text-zinc-200">支付宝</p>
    </div>

    <div
      class="flex items-center px-3 py-2 border-b border-b-zinc-200 dark:border-b-zinc-600 active:bg-zinc-200 dark:active:bg-zinc-900"
    >
      <img class="w-4 h-4" src="@/assets/images/weixin.png" alt="" />
      <p class="text-xl ml-2 text-zinc-800 dark:text-zinc-200">微信</p>
    </div>
  </div>
</template>

<script setup>
import { aliPay } from '@/utils/pay'

const props = defineProps({
  payData:{
    type:Object,
    required:true
  }
})

const onAliPayClick = () => {
  aliPay(props.payData.title, props.payData.desc)
}
</script>
