import Vue from 'vue'
import Vuex from 'vuex'
import us from '../service/user'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: localStorage.getItem("token") ? true : false
  },
  mutations: {
    setLoginState(state, val) {
      state.isLogin = val;
    }
  },
  actions: {
    login({commit}, user) {
      // 登陆请求
      return us.login(user).then(res => {
        const {code, token} = res.data;
        if (code) {
          // 登陆成功
          commit('setLoginState', true);
          localStorage.setItem("token", token);
        }
        return code;
      });
    },
    logout({ commit }){
      // 清缓存
      localStorage.removeItem('token')
      // 重置状态
      commit("setLoginState", false);
    }
  },
  modules: {
  }
})
