import { ALL_CATEGORY_ITEM } from '@/constants'

export default {
  namespaced: true,
  state: () => ({
    // 当前选中的分类
    currentCategory: ALL_CATEGORY_ITEM,
    searchText: '',
    routerType: 'none'
  }),
  mutations: {
    /**
     * 切换选中分类
     */
    changeCurrentCategory(state, newCategory) {
      state.currentCategory = newCategory
    },

    //搜索的文本
    changeSearchText(state, newSearchText) {
      state.searchText = newSearchText
    },

    //修改路由跳转类型
    changeRouterType(state, newType) {
      state.routerType = newType
    }
  }
}
