<template>
  <div
    class="fixed left-0 top-0 w-screen h-screen z-20 backdrop-blur-4xl bg-transparent pb-2 overflow-y-auto xl:p-2"
  >
    <!-- 移动端下展示 navbar -->
    <m-navbar v-if="isMobileTerminal" @clickLeft="onPop" @clickRight="onPop">
      ✨前程似锦🎉
      <template #right>
        <m-svg-icon
          name="share"
          class="w-3 h-3"
          fillClass="fill-zinc-900 dark:fill-zinc-200"
        ></m-svg-icon>
      </template>
    </m-navbar>

    <!-- pc 端下展示关闭图标 -->
    <m-svg-icon
      v-else
      name="close"
      class="w-3 h-3 ml-1 p-0.5 cursor-pointer duration-200 rounded-sm hover:bg-zinc-100 absolute right-2 top-2"
      fillClass="fill-zinc-400"
      @click="onPop"
    ></m-svg-icon>

    <div class="xl:w-[80%] xl:h-full xl:mx-auto xl:rounded-lg xl:flex">
      <img
        class="w-screen mb-2 xl:w-3/5 xl:h-full xl:rounded-tl-lg xl:rounded-bl-lg"
        :src="pexelData.photo"
      />
      <div
        class="xl:w-2/5 xl:h-full xl:bg-white xl:dark:bg-zinc-900 xl:rounded-tr-lg xl:rounded-br-lg xl:p-3"
      >
        <div v-if="!isMobileTerminal" class="flex justify-between mb-2 group">
          <m-svg-icon
            name="share"
            class="w-4 h-4 p-[0.15rem] cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-800 duration-300 rounded"
            fillClass="fill-zinc-900 dark:fill-zinc-200 group-hover:fill-main"
          ></m-svg-icon>

          <m-button
            type="info"
            icon="heart"
            iconClass="fill-zinc-900 dark:fill-zinc-200"
          />
        </div>
        <!-- 标题 -->
        <p
          class="text-base text-zinc-900 dark:text-zinc-200 ml-1 font-bold xl:text-xl xl:mb-5"
        >
          ✨🎆🎇✨🎊🎡🎨🎐🍟🌯🍝🎉
        </p>
        <!-- 作者 -->
        <div class="flex items-center mt-1 px-1">
          <img
            v-lazy
            class="h-3 w-3 rounded-full"
            :src="pexelData.avatar"
            alt=""
          />
          <span class="text-base text-zinc-900 dark:text-zinc-200 ml-1">{{
            pexelData.author
          }}</span>
        </div>
        <p
          class="text-base ml-2 mt-2 font-you-yuan font-semibold text-zinc-900 dark:text-zinc-200 xl:ml-3 xl:mt-[10rem] xl:text-lg"
        >
          {{ poetry }}📚
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { getPexelsFromId } from '@/api/pexel'
import { getPoetry } from '@/api/poetry'
import { useRouter } from 'vue-router'
import { isMobileTerminal } from '@/utils/flexible'
import { useStore } from 'vuex'

const store = useStore()
const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const pexelData = ref({})

const getPexelsData = async () => {
  const data = await getPexelsFromId(props.id)
  pexelData.value = data
}
getPexelsData()

const router = useRouter()

const onPop = () => {
  //移动端下跳转的类型
  store.commit('app/changeRouterType', 'back')
  router.back()
}

const poetry = ref('')

//诗句
onMounted(async () => {
  poetry.value = await getPoetry()
  console.log(poetry.value)
})
</script>
