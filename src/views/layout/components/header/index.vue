<template>
  <div class="w-full bg-white border-b border-b-zinc-200 px-2 py-1 dark:bg-zinc-800 dark:border-b-zinc-700 duration-500">
    <div class="flex items-center">
      <m-svg-icon
        class="guide-home w-4 h-4 p-[0.15rem] cursor-pointer rounded-sm duration-200 outline-none hover:bg-zinc-100/60 dark:hover:bg-zinc-900 group hover:shadow-lg"
        fillClass="fill-zinc-900 dark:fill-zinc-300 group-hover:fill-main"
        name="home"
        @click="onToHome"
      ></m-svg-icon>
      <header-search-vue class="mr-1"></header-search-vue>
      <header-theme-vue class="mr-1"></header-theme-vue>
      <header-my-vue></header-my-vue>
    </div>
  </div>
</template>

<script setup>
import headerSearchVue from './header-search/index.vue'
import headerThemeVue from './header-theme.vue'
import headerMyVue from './header-my.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const onToHome = () => {
  router.push('/')
}
</script>
