import store from '@/store'
import { watch } from 'vue'

let matchMedia
const watchSystemThemeChange = () => {
  //仅需一次初始化
  if (matchMedia) return
  matchMedia = window.matchMedia('(prefers-color-scheme: dark)')
  //监听主题变化
  matchMedia.onchange = () => {
    changeTheme('system')
  }
}

//变更主题
const changeTheme = (theme) => {
  // html 的 class
  let themeClassName = ''
  switch (theme) {
    case 'light':
      themeClassName = 'light'
      break
    case 'dark':
      themeClassName = 'dark'
      break
    case 'system':
      watchSystemThemeChange()
      themeClassName = matchMedia.matches ? 'dark' : 'light'
      break
  }
  // 修改 html 的 class
  document.querySelector('html').className = themeClassName
}

/**
 * 初始化主题
 */
export default () => {
  watch(() => store.getters.themeType, changeTheme, {
    // 初始执行一次
    immediate: true
  })
}
