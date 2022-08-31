import { isMobileTerminal } from '@/utils/flexible'

export default {
  category: (state) => state.category.categories,
  themeType: (state) => state.theme.themeType,
  //category选中项
  currentCategory: (state) => state.app.currentCategory,
  //category选中项下标
  currentCategoryIndex: (state, getters) => {
    return getters.category.findIndex((item) => {
      return item.id === getters.currentCategory.id
    })
  },
  history: (state) => state.search.history,
  searchText: (state) => state.app.searchText,
  token: (state) => state.user.token,
  userInfo: (state) => state.user.userInfo,
  routerType: (state) => {
    if (!isMobileTerminal.value) {
      return 'none'
    }
    return state.app.routerType
  }
}
