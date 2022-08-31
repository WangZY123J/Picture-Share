<template>
  <m-popover class="flex items-center" placement="left-bottom">
    <template #reference>
      <div
        v-if="$store.getters.token"
        class="guide-my relative flex items-center p-0.5 rounded-sm cursor-pointer duration-200 outline-none hover:bg-zinc-100 dark:hover:bg-zinc-900"
      >
        <!-- 头像 -->
        <img
          v-lazy
          class="guide-my w-4 h-4 rounded-sm"
          :src="$store.getters.userInfo.avatar"
        />
        <!-- 下箭头 -->
        <m-svg-icon
          class="h-1.5 w-1.5 ml-1"
          name="down-arrow"
          fillClass="fill-zinc-900 dark:fill-zinc-300"
        ></m-svg-icon>
        <!-- vip 标记 -->
        <m-svg-icon
          name="vip"
          class="w-1.5 h-1.5 absolute right-[14px] bottom-0"
          v-if="$store.getters.userInfo.vipLevel"
        ></m-svg-icon>
      </div>

      <div v-else>
        <m-button
          class="guide-my"
          icon="profile"
          iconColor="#fff"
          @click="onToLogin"
        ></m-button>
      </div>
    </template>

    <!-- 气泡 -->
    <div v-if="$store.getters.token" class="w-[105px] overflow-hidden">
      <div
        class="flex items-center p-1 cursor-pointer rounded hover:bg-zinc-100/60 dark:hover:bg-zinc-800"
        v-for="item in menuArr"
        :key="item.id"
        @click="onItemClick(item.path)"
      >
        <m-svg-icon
          :name="item.icon"
          class="w-1.5 h-1.5 mr-1"
          fillClass="fill-zinc-900 dark:fill-zinc-300"
        ></m-svg-icon>
        <span class="text-zinc-800 text-sm dark:text-zinc-300">{{
          item.title
        }}</span>
      </div>
    </div>

    <div v-else class="w-[76px] overflow-hidden" @click="onToLogin">
      <div
        class="flex items-center p-1 cursor-pointer rounded hover:bg-zinc-100/60 dark:hover:bg-zinc-800"
      >
        <span class="text-zinc-800 text-sm dark:text-zinc-300">登录账号</span>
      </div>
    </div>
  </m-popover>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { confirm } from '@/libs'

// 构建 menu 数据源
const menuArr = [
  {
    id: 0,
    title: '个人资料',
    icon: 'profile',
    path: '/profile'
  },
  {
    id: 1,
    title: '升级 VIP',
    icon: 'vip-profile',
    path: '/member'
  },
  {
    id: 2,
    title: '退出登录',
    icon: 'logout',
    path: ''
  }
]

const router = useRouter()
const store = useStore()

//进入登录
const onToLogin = () => {
  //移动端下跳转的类型
  store.commit('app/changeRouterType', 'push')
  router.push('/login')
}

//退出登录
const onItemClick = (path) => {
  if (path) {
    //移动端下跳转的类型
    store.commit('app/changeRouterType', 'push')
    router.push(path)
    return
  }
  confirm('您确定要退出吗？').then(() => {
    store.dispatch('user/logout')
  })
}
</script>
