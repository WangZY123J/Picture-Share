<template>
  <m-popover placement="left-bottom">
    <template #reference>
      <m-svg-icon
        :name="svgIconDisplay"
        class="guide-theme w-4 h-4 p-1 cursor-pointer rounded-sm duration-200 outline-none hover:bg-zinc-100/60 dark:hover:bg-zinc-900"
        fillClass="fill-zinc-900 dark:fill-zinc-300"
      ></m-svg-icon>
    </template>

    <div class="w-[105px] overflow-hidden">
      <div
        class="flex items-center p-1 cursor-pointer rounded hover:bg-zinc-100/60 dark:hover:bg-zinc-800"
        v-for="item in themeArr"
        :key="item.id"
        @click="onChangeTheme(item)"
      >
        <m-svg-icon
          :name="item.icon"
          class="w-1.5 h-1.5 mr-1 "
          fillClass="fill-zinc-900 dark:fill-zinc-300"
        ></m-svg-icon>
        <span class="text-zinc-800 text-sm dark:text-zinc-300">{{ item.name }}</span>
      </div>
    </div>
  </m-popover>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const themeArr = [
  {
    id: 0,
    type: 'light',
    icon: 'theme-light',
    name: '极简白'
  },
  {
    id: 1,
    type: 'dark',
    icon: 'theme-dark',
    name: '极夜黑'
  },
  {
    id: 2,
    type: 'system',
    icon: 'theme-system',
    name: '跟随系统'
  }
]

const store = useStore()

const onChangeTheme = (theme)=>{
  store.commit('theme/changeThemeType',theme.type)
}

//控制图标展示
const svgIconDisplay = computed(()=>{
  //根据当前的主题类型返回对应的图标
  const findTheme = themeArr.find((theme)=>{
    return theme.type === store.getters.themeType
  })
  return findTheme.icon
})

</script>
