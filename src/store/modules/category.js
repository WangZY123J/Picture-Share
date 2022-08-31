import { getCategory } from '@/api/category'
import { ALL_CATEGORY_ITEM, CATEGORY_INITIAL_DATA } from '@/constants'

export default {
  namespaced: true,
  state: () => ({
    categories: CATEGORY_INITIAL_DATA
  }),

  mutations: {
    setCategory(state, category) {
      state.categories = [ALL_CATEGORY_ITEM, ...category]
    }
  },

  actions: {
    async useCategoryData(context) {
      const { categorys } = await getCategory()
      context.commit('setCategory', categorys)
    }
  }
}
