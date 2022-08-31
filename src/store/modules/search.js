export default {
  namespaced: true,
  state: () => ({
    history: []
  }),
  mutations: {
    /**
     * 1. 新增的历史记录位于头部
     * 2. 不可出现重复的记录
     */
    addHistory(state, newHistory) {
      const isFindIndex = state.history.findIndex(
        (item) => item === newHistory
      )
      // 剔除旧数据
      if (isFindIndex !== -1) {
        state.history.splice(isFindIndex, 1)
      }
      // 新增记录
      state.history.unshift(newHistory)
    },
    /**
     * 删除指定数据
     */
    deleteHistory(state, index) {
      state.history.splice(index, 1)
    },
    /**
     * 删除所有历史记录
     */
    deleteAllHistory(state) {
      state.history = []
    }
  }
}
