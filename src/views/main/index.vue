<template>
  <div
    class="h-full overflow-auto bg-white dark:bg-zinc-800 duration-500 scrollbar-thin scrollbar-thumb-transparent xl:scrollbar-thumb-zinc-200 xl:dark:scrollbar-thumb-zinc-900 scrollbar-track-transparent"
    ref="containerTarget"
  >
    <navigation-vue></navigation-vue>

    <div class="max-w-screen-xl mx-auto relative m-1 xl:mt-4">
      <list-vue></list-vue>
    </div>

    <!-- 移动端下的导航条 -->
    <m-trigger-menu
      v-if="isMobileTerminal"
      class="fixed bottom-1 m-auto left-0 right-0 w-[220px]"
    >
      <m-trigger-menu-item
        icon="home"
        iconClass="fill-zinc-900 dark:fill-zinc-200"
      >
        首页
      </m-trigger-menu-item>
      <m-trigger-menu-item
        v-if="$store.getters.token"
        icon="vip"
        iconClass="fill-zinc-400 dark:fill-zinc-500"
        textClass="text-zinc-400 dark:text-zinc-500"
        @click="onVipClick"
      >
        VIP
      </m-trigger-menu-item>
      <m-trigger-menu-item
        icon="profile"
        iconClass="fill-zinc-400 dark:fill-zinc-500"
        textClass="text-zinc-400 dark:text-zinc-500"
        @click="onMyClick"
      >
        {{ $store.getters.token ? '我的' : '去登录' }}
      </m-trigger-menu-item>
    </m-trigger-menu>
  </div>
</template>

<script>
export default {
  name: 'home'
}
</script>

<script setup>
import navigationVue from './components/navigation/index.vue'
import listVue from './components/list/index.vue'
import { isMobileTerminal } from '@/utils/flexible'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { onActivated, ref } from 'vue'
import { useScroll } from '@vueuse/core'

const store = useStore()
const router = useRouter()

const onVipClick = () => {
  //移动端下跳转的类型
  store.commit('app/changeRouterType', 'push')
  if (store.getters.token) {
    router.push('/member')
  } else {
    router.push('/login')
  }
}

const onMyClick = () => {
  //移动端下跳转的类型
  store.commit('app/changeRouterType', 'push')
  if (store.getters.token) {
    router.push('/profile')
  } else {
    router.push('/login')
  }
}

//记录滚动位置
const containerTarget = ref(null)
const { y: Y } = useScroll(containerTarget)
onActivated(() => {
  if (!containerTarget.value) {
    return
  }
  containerTarget.value.scrollTop = Y.value
})


</script>
