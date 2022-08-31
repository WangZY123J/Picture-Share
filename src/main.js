import { createApp } from 'vue'
import App from './App.vue'
import './permission'
import './styles/index.scss'
import router from './router'
import store from './store'
import { useREM } from './utils/flexible'
import useTheme from './utils/theme'
import mLibs from './libs'
import mDirectives from './directives'
import 'virtual:svg-icons-register'



useREM()
useTheme()
createApp(App).use(mLibs).use(mDirectives).use(router).use(store).mount('#app')

