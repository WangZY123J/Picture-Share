import { getProfile, loginUser, registerUser } from '@/api/sys'
import md5 from 'md5'
import { message } from '@/libs'

export default {
  namespaced: true,
  state: () => ({
    token: '',
    userInfo: {}
  }),

  mutations: {
    //保存 token
    setToken(state, newToken) {
      state.token = newToken
    },

    //保存用户信息
    setUserInfo(state, newInfo) {
      state.userInfo = newInfo
    }
  },

  actions: {
    //登录
    async login(context, payload) {
      const { password } = payload
      const data = await loginUser({
        ...payload,
        password: password ? md5(password) : ''
      })
      context.commit('setToken', data.token)
      context.dispatch('profile')
    },

    //获取用户信息
    async profile(context) {
      const data = await getProfile()
      context.commit('setUserInfo', data)
      message(
        'success',
        `欢迎您，${
          data.vipLevel
            ? '尊贵的的VIP-' + data.vipLevel + '用户' + ' ' + data.nickname
            : data.nickname
        } `,
        3000
      )
    },

    //退出登录
    logout(context) {
      context.commit('setToken', '')
      context.commit('setUserInfo', {})
      //重新刷新页面
      location.reload()
    },

    //注册
    async register(context, payload) {
      const { password } = payload
      return await registerUser({
        ...payload,
        password: password ? md5(password) : ''
      })
    }
  }
}
