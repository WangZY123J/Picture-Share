import createPersistedState from 'vuex-persistedstate'
import { createStore } from 'vuex'
import category from './modules/category'
import theme from './modules/theme'
import app from './modules/app'
import search from './modules/search'
import user from './modules/user'
import getters from './getters'

const store = createStore({
  getters,
  modules: {
    category,
    theme,
    app,
    search,
    user
  },
  plugins:[
    createPersistedState({
      key:'data',
      //需要保存的模块
      paths:['category','theme','search','user']
    })
  ]
})

export default store
