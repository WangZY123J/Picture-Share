export default {
  namespaced:true,
  state:()=>({
    themeType:'light',
  }),

  mutations:{
    //切换主题
    changeThemeType(state,newTheme){
      state.themeType = newTheme
    }
  },

}