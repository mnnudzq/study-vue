import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

// vuex data
const state = {
  count: 1
};

// vuex motheds
// 同步方法
// 为什么mutations要做成同步，和actions区分开来
const mutations = {
  add(state, val) {
    state.count += val;
    // return state.count;
  },
  reduce(state) {
    state.count --;
    // return state.count;
  }
};

// vuex 异步队列方法
const actions = {
  addAction(context, val) {
    context.commit('add', val);
  },
  // 写法2
  reduceAction({commit}) {
    // 模拟异步
    setTimeout(() => {
      commit('reduce');
    }, 3000);
    console.log('竟然比reduce先执行');
  }
};

// vuex computed
const getters = {
  count2: (state) => {
    return state.count + 36;
  }
};

export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions
})
